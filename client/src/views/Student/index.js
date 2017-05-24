import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from '../../components/Header/';
import Messages from '../../components/Messages/index';
import Courses from './Courses';
import ModalSwitcher from '../../components/Modals/ModalSwitcher';
import Schedule from './Schedule';
import Home from './Home';
import { Wrapper, Content } from '../wrappers';

const ForOhFor = () => <h1>No match found</h1>;

const links = [
  'home',
  'courses',
  'messages',
  'schedules',
  'grades',
  'settings'
];

const Student = () => (
  <Wrapper id="mainWrapper">
    <ModalSwitcher />
    <HeaderContainer links={links} />
    <Content>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/messages" component={Messages} />
        <Route path="/schedules" component={Schedule} />
        <Route path="/grades" render={() => <h1>StudentPerformance</h1>} />
        <Route path="/settings" render={() => <h1>StudentSettings</h1>} />
        <Route component={ForOhFor} />
      </Switch>
    </Content>
  </Wrapper>
);

export default Student;
