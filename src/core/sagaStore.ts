import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "reducer";
import rootSaga from "../saga"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware()
const isDev = process.env.NODE_ENV === "development";
const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose

export default function configure() {
  const store = createStore(
    rootReducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  sagaMiddleware.run(rootSaga)
  return store
}
