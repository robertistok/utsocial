import { createStore, applyMiddleware, compose } from 'redux';
import immutableCheckMiddleware from 'redux-immutable-state-invariant';
import reduxThunk from 'redux-thunk';

import rootReducer from './index';

const middleware = [];

// Immutability check
if (process.env.NODE_ENV === 'development') {
  middleware.push(immutableCheckMiddleware());
}

middleware.push(reduxThunk);

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  )
);

export default store;
