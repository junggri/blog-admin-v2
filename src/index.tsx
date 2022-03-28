import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from '@apollo/client';
import client from "core/client";
import "styles/index.scss";
import {Provider} from "react-redux";
import configure from "core/sagaStore";

const store = configure()

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App/>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


reportWebVitals();
