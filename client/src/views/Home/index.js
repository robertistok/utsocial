import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Home = () => (
  <Wrapper>
    <Title>Welcome to UTSocial!</Title>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/reset/:token" component={ResetPassword} />
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  </Wrapper>
);

const Wrapper = styled.div`
	background-color: ${props => props.theme.primary}
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const Title = styled.h1`
	font-size: 26px;
	font-weight: bolder;
	color: ${props => props.theme.white};
	position: absolute;
	top: 30px;
	margin-bottom: 20px;
`;

export default Home;
