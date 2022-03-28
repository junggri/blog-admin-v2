import {changeState, InitialState, makeAction, makeActionFunction, TypeofActions} from "../lib/actionMaker";
import {Visit} from "../core/schema";
import {ApolloQueryResult} from "@apollo/client";
import client from "../core/client";
import {GET_VISIT} from "../graphql/query";
import {createReducer} from "typesafe-actions";
import produce from "immer";
import {call, put, takeLatest} from "redux-saga/effects";
import createAsyncAction from "../core/createAsyncAction";
import {handleActions} from "redux-actions";
import reducerMap from "../core/reducerMap";


const initialState = {
  data: null,
  loading: false,
  error: false
}

export interface DashBoardInitialState {
  data: null | Visit[]
  loading: boolean,
  error: Error | boolean
}

enum DashBoardType {
  GET_DASHBOARD = "@data/dashboard"
}

export const DashBoardActions = {
  GET_DASHBOARD: createAsyncAction(DashBoardType.GET_DASHBOARD, (frequency: string) => {
    return client.query({
      query: GET_VISIT,
      variables: {
        data: {
          frequency: frequency
        }
      },
      errorPolicy: "all",
    })
  })
}

const dashBoardReducer = handleActions<DashBoardInitialState, any>({
  ...reducerMap<DashBoardInitialState, any, { data: { getVisitDashboard: Visit[] } }>(DashBoardType.GET_DASHBOARD, {
    onRequest: (state, action) => {
      return produce(state, draft => {
        draft.data = null
        draft.error = false
        draft.loading = true
      })
    },
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.data = action.payload.data.getVisitDashboard
        draft.error = false
        draft.loading = false
      })
    },
    onFailure: (state, action) => {
      return produce(state, draft => {
        draft.data = state.data
        draft.loading = false
        draft.error = action.payload
      })
    }
  })
}, initialState)

export default dashBoardReducer
