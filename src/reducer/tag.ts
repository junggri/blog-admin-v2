import {changeState, InitialState, makeAction, makeActionFunction, TypeofActions} from "../lib/actionMaker";
import {Tag} from "core/schema";
import {ApolloQueryResult} from "@apollo/client";
import client from "core/client";
import {GET_TAG_RELATION} from "graphql/query";
import {createReducer} from "typesafe-actions";
import produce from "immer";
import {call, put, takeLatest} from "redux-saga/effects";
import {UPSERT_TAG} from "graphql/mutation";
import {FetchResult} from "@apollo/client/link/core";
import createAsyncAction from "../core/createAsyncAction";
import reducerMap from "../core/reducerMap";
import {handleAction, handleActions} from "redux-actions";


export const InitialValue: TagInitialValue = {
  data: null,
  loading: true,
  error: false
};

export interface TagInitialValue {
  data: null | Tag[]
  loading: boolean
  error: boolean | undefined | Error;
}


export enum TagType {
  GET_TAG = "@data/GET_TAG",
  CREATE_TAG = "@create/CREATE_TAG"
}

export const TagActions = {
  GET_TAGS: createAsyncAction(TagType.GET_TAG, () => {
    return client.query({
      query: GET_TAG_RELATION,
      errorPolicy: "all"
    })
  }),
  CREATE_TAG: createAsyncAction(TagType.CREATE_TAG, (tagName: string) => {
    return client.mutate({
      mutation: UPSERT_TAG,
      variables: {
        data: {
          tagName: tagName
        }
      },
      errorPolicy: 'all'
    })
  })

}

const TagReducer = handleActions<TagInitialValue, any>({
  ...reducerMap<TagInitialValue, null, { data: { getTags: Tag[] } }>(TagType.GET_TAG, {
    onRequest: (state, action) => {
      return produce(state, draft => {
        draft.data = state.data
        draft.error = false
        draft.loading = true
      })
    },
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.data = action.payload.data.getTags
        draft.error = false
        draft.loading = false
      })
    },
    onFailure: (state, action) => {
      return produce(state, draft => {
        draft.data = state.data
        draft.error = action.payload
        draft.loading = false
      })
    }
  }),
  ...reducerMap<TagInitialValue, any, { data: { upsertTag: Tag } }>(TagType.CREATE_TAG, {
    onRequest: (state, action) => {
      return produce(state, (draft: TagInitialValue) => {
        draft.data = state.data
        draft.error = false
        draft.loading = true
      })
    },
    onSuccess: (state, action) => {
      return produce(state, (draft: TagInitialValue) => {
        if (state.data) {
          draft.data = [...state.data, action.payload.data.upsertTag];
        }

        draft.error = false
        draft.loading = false
      })
    },
    onFailure: (state, action) => {
      return produce(state, (draft: TagInitialValue) => {
        draft.data = state.data
        draft.error = action.payload
        draft.loading = false
      })
    }
  })
}, InitialValue)

export default TagReducer;
