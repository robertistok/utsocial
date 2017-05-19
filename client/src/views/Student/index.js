import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from '../../components/Header/';
import Messages from '../../components/Messages/index';
import StudentsCourses from '../../components/Courses/Students';
import ModalSwitcher from '../../components/Modals/ModalSwitcher';
import Schedule from '../../components/Schedule/index';
import { Wrapper, Content } from '../wrappers';

const ForOhFor = () => <h1>No match found</h1>;

const links = [
  'home',
  'courses',
  'messages',
  'schedules',
  'performance',
  'settings'
];

const Student = () => (
  <Wrapper id="mainWrapper">
    <HeaderContainer links={links} />
    <ModalSwitcher />
    <Content>
      <Switch>
        <Route path="/home" render={() => <h1>StudentHome page</h1>} />
        <Route path="/courses" component={StudentsCourses} />
        <Route path="/messages" component={Messages} />
        <Route path="/schedules" component={Schedule} />
        <Route path="/performance" render={() => <h1>StudentPerformance</h1>} />
        <Route path="/settings" render={() => <h1>StudentSettings</h1>} />
        <Route component={ForOhFor} />
      </Switch>
    </Content>
  </Wrapper>
);

export default Student;
