import React from 'react'; import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './views/App';
import { meFromToken } from './redux/account/auth';
import './index.css';
import './semantic/dist/semantic.min.css';
import store from './redux/store';

const token = sessionStorage.getItem('token');
if (token) {
  store.dispatch(meFromToken(token));
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
