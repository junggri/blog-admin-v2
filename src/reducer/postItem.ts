import {handleActions} from "redux-actions";
import {Post} from "../core/schema";
import createAsyncAction from "../core/createAsyncAction";
import client from "../core/client";
import {GET_POST} from "../graphql/query";
import reducerMap from "../core/reducerMap";
import produce from "immer";

export interface PostItemInitialState {
  data: null | Post
  loading: boolean
  error: Error | boolean
}

const initialState = {
  data: null,
  loading: false,
  error: false
}

enum PostItemType {
  GET_POST = "@data/GET_POST"
}

export const PostItemActions = {
  GET_POST: createAsyncAction(PostItemType.GET_POST, (hashId: string) => {
    return client.query({
      query: GET_POST,
      variables: {
        data: {
          hashId: hashId
        }
      }
    })
  }),
}

const PostItemReducer = handleActions<PostItemInitialState, any>({
  ...reducerMap<PostItemInitialState, any, any>(PostItemType.GET_POST, {
    onRequest: (state, action) => {
      return produce(state, draft => {
        draft.data = null
        draft.error = false
        draft.loading = true
      })
    },
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.data = action.payload.data.post
        draft.error = false
        draft.loading = false
      })
    },
    onFailure: (state, action) => {
      return produce(state, draft => {
        draft.data = null
        draft.error = action.payload
        draft.loading = false
      })
    }
  })
}, initialState)

export default PostItemReducer;
