import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from '../../components/Header/';
import ModalSwitcher from '../../components/Modals/ModalSwitcher';
import Schedule from '../../components/Schedule/index';
import Messages from '../../components/Messages/index';
import TeachersCourses from '../../components/Courses/Teachers';
import { Wrapper, Content } from '../wrappers';

const ForOhFor = () => <h1>No match found</h1>;

const links = ['home', 'courses', 'messages', 'schedules', 'settings'];

const Teacher = () => (
  <Wrapper id="mainWrapper">
    <HeaderContainer links={links} />
    <ModalSwitcher />
    <Content>
      <Switch>
        <Route path="/home" render={() => <h1>TeacherHome page</h1>} />
        <Route path="/courses" component={TeachersCourses} />
        <Route path="/messages" component={Messages} />
        <Route path="/schedules" component={Schedule} />
        <Route path="/settings" render={() => <h1>TeacherSettings</h1>} />
        <Route component={ForOhFor} />
      </Switch>
    </Content>
  </Wrapper>
);

export default Teacher;
