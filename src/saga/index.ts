import {all} from "redux-saga/effects"
import watchSaga from "./watch-actions"

export default function* () {
  yield all([
    watchSaga()
  ])
}
