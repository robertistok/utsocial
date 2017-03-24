import React from 'react';
import Header from './components/Header/index';

const Admin = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

export default Admin;
