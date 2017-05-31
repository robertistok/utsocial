// Code splitting
/* eslint import/prefer-default-export: 0*/

import React from 'react'; import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from '../../components/Header/';
import ModalSwitcher from '../../components/Modals/ModalSwitcher';
import Schedule from './Schedule';
import Messages from '../../components/Messages/index';
import Courses from './Courses';
import Settings from '../../components/Settings';
import { Wrapper, Content } from '../wrappers';

const ForOhFor = () => <h1>No match found</h1>;

const links = ['home', 'courses', 'messages', 'schedules', 'preferences'];

const Teacher = () => (
  <Wrapper id="mainWrapper">
    <HeaderContainer links={links} />
    <ModalSwitcher />
    <Content>
      <Switch>
        <Route path="/home" render={() => <h1>TeacherHome page</h1>} />
        <Route path="/courses" component={Courses} />
        <Route path="/messages" component={Messages} />
        <Route path="/schedules" component={Schedule} />
        <Route path="/preferences" component={Settings} />
        <Route component={ForOhFor} />
      </Switch>
    </Content>
  </Wrapper>
);
export { Teacher };
