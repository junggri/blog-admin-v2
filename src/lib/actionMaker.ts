import {ActionType, createAction, PayloadAction} from "typesafe-actions";
import {WritableDraft} from "immer/dist/types/types-external";

export interface InitialState<T> {
  data: T,
  error: Error | null,
  loading: boolean
}

export function makeAction(prefix: string) {
  const GET_DATA = prefix;
  const GET_DATA_SUCCESS = prefix + "_SUCCESS";
  const GET_DATA_LOADING = prefix + "_LOADING";
  const GET_DATA_FAILURE = prefix + "_FAILURE";

  const CREATE_DATA = prefix + "CREATE";
  const CREATE_DATA_LOADING = prefix + "CREATE_LOADING";
  const CREATE_DATA_SUCCESS = prefix + "CREATE_SUCCESS";
  const CREATE_DATA_FAILURE = prefix + "CREATE_FAILURE";

  const DELETE_DATA = prefix + "DELETE";
  const DELETED_DATA_LOADING = prefix + "DELETE_LOADING";
  const DELETED_DATA_SUCCESS = prefix + "DELETE_SUCCESS";
  const DELETED_DATA_FAILURE = prefix + "DELETE_FAILURE";


  return {
    GET_DATA,
    GET_DATA_LOADING,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    CREATE_DATA,
    CREATE_DATA_LOADING,
    CREATE_DATA_SUCCESS,
    CREATE_DATA_FAILURE,
    DELETE_DATA,
    DELETED_DATA_LOADING,
    DELETED_DATA_SUCCESS,
    DELETED_DATA_FAILURE
  };

}

export function makeActionFunction<T, F = any, R = any>(prefix: string) {
  const getData = createAction(makeAction(prefix).GET_DATA, (payLoad: T) => payLoad)();
  const getDataSuccess = createAction(makeAction(prefix).GET_DATA_SUCCESS)();
  const getDataFailure = createAction(makeAction(prefix).GET_DATA_FAILURE, (payload: Error) => payload)();

  const createData = createAction(makeAction(prefix).CREATE_DATA, (payload: F) => payload)();
  const createDataSuccess = createAction(makeAction(prefix).CREATE_DATA_SUCCESS)();
  const createDateFailure = createAction(makeAction(prefix).CREATE_DATA_FAILURE, (payload: Error) => payload)();

  const deleteData = createAction(makeAction(prefix).DELETE_DATA, (payload: R) => payload)();
  const deleteDataSuccess = createAction(makeAction(prefix).DELETED_DATA_SUCCESS)();
  const deleteDataFailure = createAction(makeAction(prefix).DELETED_DATA_FAILURE, (payload: Error) => payload)();

  return {
    getData,
    getDataSuccess,
    getDataFailure,
    createData,
    createDataSuccess,
    createDateFailure,
    deleteData,
    deleteDataSuccess,
    deleteDataFailure
  };
}


export function changeState<T>(draft: WritableDraft<InitialState<T>>, loading: boolean, data: any, error: Error | null) {
  if (draft) {
    draft.data = data;
  }
  draft.error = error;
  draft.loading = loading;

}

type error = { error: Error }
export type TypeofActions<T> =
  ActionType<ReturnType<typeof makeActionFunction>> & PayloadAction<string, T> & error


