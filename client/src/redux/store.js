import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import immutableCheckMiddleware from 'redux-immutable-state-invariant';
import reduxThunk from 'redux-thunk';

import rootReducer from './index';

const middleware = [];

// Immutability check
if (process.env.NODE_ENV === 'development') {
	middleware.push(immutableCheckMiddleware());
}

middleware.push(reduxThunk);

// Logger middlware, it has to be the last
const loggerMiddleware = createLogger({
	predicate: () => process.env.NODE_ENV === 'development',
});
middleware.push(loggerMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function makeStore() {
	return createStoreWithMiddleware(rootReducer);
}
