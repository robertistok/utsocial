import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header/Header';
import ModalSwitcher from '../../components/Modals/ModalSwitcher';
import Schedule from '../../components/Schedule/index';

const Content = styled.div`
	padding-top: 180px;
	left: 0px;
	right: 0px;
	overflow: auto;
`;

const ForOhFor = () => <h1>No match found</h1>;

const links = ['home', 'schedules', 'courses', 'teachers'];

const Admin = () => (
  <div>
    <Header links={links} />
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
  </div>
);

export default Admin;
