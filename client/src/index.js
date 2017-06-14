import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css';

import App from './views/App';
import { meFromToken } from './redux/account/auth';
import './index.css';
import './assets/semantic/dist/semantic.min.css';
import store from './redux/store';
import { getToken } from './utils/sessionOperations';

const token = getToken();
if (token !== null) {
  store.dispatch(meFromToken(token));
}

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
