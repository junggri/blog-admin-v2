import {all, takeEvery, call, put} from 'redux-saga/effects'
import {PayloadAction} from "@reduxjs/toolkit";

export default function* () {
  yield all([
    watchActions()
  ])
}

function* watchActions() {
  yield takeEvery("*", function* (action: PayloadAction<[() => void, string, string]>) {
    if (!action.type.endsWith("REQUEST")) {
      return
    }

    try {
      const response: any = yield call(action.payload[0])
      if (response.errors) {
        throw new Error(response.errors[0].message)
      }
      yield put({type: action.payload[1], payload: response})
    } catch (e) {
      yield put({type: action.payload[2], payload: e})

    }
  })
}


