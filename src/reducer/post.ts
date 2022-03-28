import {PageEdge, PaginatedPost, Post} from "core/schema";
import client from "core/client";
import produce from "immer";
import {GET_POST, GET_POSTS} from "graphql/query";
import {DELETE_POST, UPSERT_POST} from "graphql/mutation";
import createAsyncAction from "core/createAsyncAction";
import {WriteFormik} from "../pages/write";
import {handleAction, handleActions} from "redux-actions";
import reducerMap from "../core/reducerMap";


export interface PostParams {
  hashId: string | null
  content: string
  originalContent: string
  title: string
  desc: string
  open: boolean
  tagIds: number[]
  thumbnail: string | null
  is_published: boolean
  file?: File | null
}


enum PostType {
  GET_POSTS = "@data/GET_POSTS",
  UPSERT_POST = "@data/UPSERT_POST",
  DELETE_POST = "@data/DELETE_POST",
  UPDATE_POST = "@data/UPDATE_POST"
}

export interface PostInitialState {
  data: null | PaginatedPost
  error: Error | boolean
  loading: boolean
}

const initialState: PostInitialState = {
  data: null,
  error: false,
  loading: false
}

export const PostActions = {
  GET_POSTS: createAsyncAction(PostType.GET_POSTS, (first: number, after: number, filter: "open" | "close") => {
    return client.query({
      query: GET_POSTS,
      variables: {
        data: {
          first: first,
          after: after,
          filter: filter,
        }
      },
      fetchPolicy: 'no-cache'
    })
  }),
  UPSERT_POST: createAsyncAction(PostType.UPSERT_POST, (params: WriteFormik) => {
    return client.mutate({
      mutation: UPSERT_POST,
      variables: {
        data: {
          content: params.content,
          desc: params.desc,
          hashId: params.hashId,
          open: params.open,
          tagIds: params.tagIds,
          thumbnail: params.thumbnail,
          is_published: params.is_published,
          title: params.title
        },
        file: params.file
      },
      errorPolicy: 'all'
    })
  }),
  DELETE_POST: createAsyncAction(PostType.DELETE_POST, (hashId: string) => {
    return client.mutate({
      mutation: DELETE_POST,
      variables: {
        data: {
          hashId: hashId
        }
      }
    })
  }),
  UPDATE_POST: createAsyncAction(PostType.UPDATE_POST, (data: PageEdge) => {
    return data
  })
}

const PostReducer = handleActions<PostInitialState, any>({
  ...reducerMap<PostInitialState, any, { data: { posts: PaginatedPost } }>(PostType.GET_POSTS, {
    onRequest: (state, action) => {
      return produce(state, draft => {
        draft.data = null
        draft.loading = true
        draft.error = false
      })
    },
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.data = action.payload.data.posts
        draft.loading = false
        draft.error = false
      })
    },
    onFailure: (state, action) => {
      return produce(state, draft => {
        draft.data = null
        draft.loading = false
        draft.error = action.payload
      })
    }
  }),
  ...reducerMap(PostType.UPSERT_POST, {
    onRequest: (state, action) => {
      return produce(state, draft => {
        draft.loading = true
        draft.error = false
      })
    },
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.error = false
        draft.loading = false
      })
    },
    onFailure: (state, action) => {
      return produce(state, draft => {
        draft.loading = false
        draft.error = action.payload
      })
    }
  }),
  ...reducerMap(PostType.DELETE_POST, {}),
  ...reducerMap(PostType.UPDATE_POST, {
    onSuccess: (state, action) => {
      return produce(state, draft => {
        if (state.data && draft.data) {
          const index = state.data.edges.indexOf(action.payload);
          const copy = [...state.data.edges];
          copy.splice(index, 1);
          draft.data.edges = copy
        }
      })
    },
    onFailure: (state, action) => {
      return produce(state, draft => {
      })
    }
  })
}, initialState)

export default PostReducer
