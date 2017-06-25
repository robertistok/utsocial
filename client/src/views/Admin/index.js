// Code splitting
/* eslint import/prefer-default-export: 0*/

import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// import HeaderContainer from '../../components/Header/index';
import ModalSwitcher from '../../components/Modals/ModalSwitcher';
import Schedule from './Schedule';
import { Wrapper, Content } from '../wrappers';

const ForOhFor = () => <h1>No match found</h1>;

const Admin = () => (
  <Wrapper>
    <ModalSwitcher />
    <Link to="/schedules">Schedules</Link>
    <Content>
      <Switch>
        <Route path="/schedules" component={Schedule} />
        <Route component={ForOhFor} />
      </Switch>
    </Content>
  </Wrapper>
);

export { Admin };
