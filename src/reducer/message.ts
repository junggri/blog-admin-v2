import {Message} from "core/schema";
import {changeState, InitialState, makeAction, makeActionFunction, TypeofActions} from "../lib/actionMaker";
import {ApolloQueryResult} from "@apollo/client/core/types";
import client from "../core/client";
import {GET_MESSAGE} from "../graphql/query";
import {createReducer} from "typesafe-actions";
import produce from "immer";
import {call, put, takeLatest} from "redux-saga/effects";
import {getDataFromTree} from "@apollo/client/react/ssr";
import createAsyncAction from "../core/createAsyncAction";
import {handleActions} from "redux-actions";
import reducerMap from "../core/reducerMap";


const initialState = {
  data: null,
  error: false,
  loading: false
}

export interface MessageInitialState {
  data: Message[] | null,
  error: boolean | null | Error
  loading: boolean
}

enum MessageType {
  GET_MESSAGE = '@data/message'
}

export const messageActions = {
  GET_MESSAGE: createAsyncAction(MessageType.GET_MESSAGE, () => {
    return client.query({
      query: GET_MESSAGE,
      errorPolicy: "all",
    });
  })
};

const messageReducer = handleActions<MessageInitialState, any>({
  ...reducerMap<MessageInitialState, any, { data: { getMessage: Message[] } }>(MessageType.GET_MESSAGE, {
    onRequest: (state, action) => {
      return produce(state, draft => {
        draft.data = null
        draft.loading = true
        draft.error = false
      })
    },
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.data = action.payload.data.getMessage
        draft.loading = false
        draft.error = false
      })
    },
    onFailure: (state, action) => {
      return produce(state, draft => {
        draft.loading = false
        draft.data = state.data
        draft.error = action.payload
      })
    }
  })
}, initialState)

export default messageReducer

