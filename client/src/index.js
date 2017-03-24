import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './views/App';
import { meFromToken } from './redux/auth';
import './index.css';
import '../public/background.jpg';
import '../semantic/dist/semantic.min.css';
import makeStore from './redux/store';

const store = makeStore();

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
