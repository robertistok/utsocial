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

const links = [
  'home',
  'courses',
  'messages',
  'schedules',
  'performance',
  'settings'
];

const Admin = () => (
  <div>
    <Header links={links} />
    <ModalSwitcher />
    <Content>
      <Switch>
        <Route path="/home" render={() => <h1>TeacherHome page</h1>} />
        <Route path="/courses" render={() => <h1>TeacherCourses</h1>} />
        <Route path="/messages" render={() => <h1>TeacherMessages</h1>} />
        <Route path="/schedules" component={Schedule} />
        <Route path="/performance" render={() => <h1>TeacherPerformance</h1>} />
        <Route path="/settings" render={() => <h1>TeacherSettings</h1>} />
        <Route component={ForOhFor} />
      </Switch>
    </Content>
  </div>
);

export default Admin;
