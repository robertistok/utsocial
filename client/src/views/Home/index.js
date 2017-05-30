import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { withToggle } from '../../components/hocs';

const Home = (props) => {
  const {
    toggle: toggleForgotPassword,
    toggledOn: forgotPassword,
    location: { pathname }
  } = props;

  return (
    <Wrapper>
      <Title>Welcome to UTSocial!</Title>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Login showForgotPassword={toggleForgotPassword} />}
        />
        <Route
          path="/forgot"
          render={() => (
            <ForgotPassword
              toggleForgotPassword={toggleForgotPassword}
              forgotPassword={forgotPassword}
            />
          )}
        />
        <Route path="/reset/:token" component={ResetPassword} />
        <Route render={() => <h1>Not found</h1>} />
      </Switch>
    </Wrapper>
  );
};

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

const Description = styled.div`
	font-size: 15px;
	color: ${props => props.theme.white};
	margin-bottom: 20px;
	width: 90%;
	text-align: center;
`;

export default withToggle(Home);
