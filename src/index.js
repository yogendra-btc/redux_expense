import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { reducer } from './user';
import Root from './Root'
import {persistStore, autoRehydrate} from 'redux-persist'

// const store = createStore(reducer)
const store = createStore(reducer, undefined, autoRehydrate())
// persistStore(store)
console.log("data in store",store.getState());
// render(<App store={store} />, document.querySelector('#root'))
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
render(
    <Root store={store} />,
    document.getElementById('root')
  )