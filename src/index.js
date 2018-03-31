import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import reducers from './Redux/reducer.js';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {BrowserRouter as Router} from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(
      promiseMiddleware()
    )
  ))

  ReactDOM.render(
    <Provider store={store}>
      <Router>
    <App />
  </Router>
  </Provider>, document.getElementById('root'));