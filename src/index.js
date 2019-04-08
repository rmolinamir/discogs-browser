import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// JSX/Redux/Redux-Sagas
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// Store/Sagas
import reducers from './store/reducers'
import * as sagas from './store/sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers ? composeEnhancers(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas.watchSearches)
sagaMiddleware.run(sagas.watchCollection)

ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
