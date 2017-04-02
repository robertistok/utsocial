import React from 'react';

import Header from './Header/index';

const Home = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

export default Home;
