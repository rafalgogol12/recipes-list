import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from 'redux-thunk';

import { rootReducers } from './reducers';
import App from './app/App';

export const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
