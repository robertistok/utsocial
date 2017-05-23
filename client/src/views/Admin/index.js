import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from '../../components/Header/index';
import ModalSwitcher from '../../components/Modals/ModalSwitcher';
import Schedule from './Schedule';
import { Wrapper, Content } from '../wrappers';

const ForOhFor = () => <h1>No match found</h1>;

const links = ['home', 'schedules', 'courses', 'teachers'];

const Admin = () => (
  <Wrapper>
    <HeaderContainer links={links} />
    <ModalSwitcher />
    <Content>
      <Switch>
        <Route path="/home" render={() => <h1>Home page</h1>} />
        <Route path="/schedules" component={Schedule} />
        <Route path="/teachers" render={() => <h1>Teachers</h1>} />
        <Route path="/courses" render={() => <h1>Courses</h1>} />
        <Route component={ForOhFor} />
      </Switch>
    </Content>
  </Wrapper>
);

export default Admin;
