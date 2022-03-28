import createActionType from "./createActionType";
import {ReducerMapValue} from "redux-actions";

interface IReducer<State, Request, Success, Failure = Error> {
  onRequest?: ReducerMapValue<State, Request>
  onSuccess?: ReducerMapValue<State, Success>,
  onFailure?: ReducerMapValue<State, Failure>
}

export default function ReducerMap<State, Request = any, Success = any, Failure = Error>(
  type: string,
  reducer: IReducer<State, Request, Success, Failure>
) {

  const {REQUEST, SUCCESS, FAILURE} = createActionType(type);
  const reducerMap: { [key: string]: ReducerMapValue<State, Request> | ReducerMapValue<State, Success> | ReducerMapValue<State, Failure> } = {}

  if (reducer.onRequest) {
    reducerMap[REQUEST] = reducer.onRequest
  }

  if (reducer.onSuccess) {
    reducerMap[SUCCESS] = reducer.onSuccess
  }

  if (reducer.onFailure) {
    reducerMap[FAILURE] = reducer.onFailure
  }
  return reducerMap
}
