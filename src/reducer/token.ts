import produce from "immer";
import client from "core/client";
import {LOGIN} from "graphql/mutation";
import {handleActions} from "redux-actions";
import createAsyncAction from "../core/createAsyncAction";
import reducerMap from "../core/reducerMap";


interface Result {
  data: { login: { access_token: string } }
}

export interface ILogin {
  user: string
  pwd: string
}

const initialState: TokenInitialState = {
  data: null,
  error: false,
  loading: false
}

export interface TokenInitialState {
  data: string | null
  error: Error | boolean
  loading: boolean
}

enum TokenType {
  GET_TOKEN = "@data/token"
}


export const TokenAction = {
  GET_TOKEN: createAsyncAction(TokenType.GET_TOKEN, (user: string, pwd: string) => {
    return client.mutate({
      mutation: LOGIN,
      variables: {
        data: {
          username: user,
          password: pwd
        }
      }
    })
  })
}


const tokenReducer = handleActions<TokenInitialState, any>({
  ...reducerMap<TokenInitialState, any, Result>(TokenType.GET_TOKEN, {
    onRequest: (state, action) => {
      return produce(state, draft => {
        draft.data = null
        draft.error = false
        draft.loading = true
      })
    },
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.data = action.payload.data.login.access_token
        localStorage.setItem("token", action.payload.data.login.access_token)
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

export default tokenReducer
