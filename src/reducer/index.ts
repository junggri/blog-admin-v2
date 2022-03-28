import {combineReducers} from "redux";
import token, {TokenInitialState} from "./token";
import post, {PostInitialState} from "./post";
import tag, {TagInitialValue} from "./tag";
import message, {MessageInitialState} from "./message";
import visit, {DashBoardInitialState} from "./visit"
import upsertPost, {PostItemInitialState} from "./postItem"


export interface AppState {
  tag: TagInitialValue
  post: PostInitialState
  token: TokenInitialState
  upsertPost: PostItemInitialState
  message: MessageInitialState
  visit: DashBoardInitialState
}

const rootReducer = combineReducers({
  token,
  post,
  upsertPost,
  tag,
  message,
  visit
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
