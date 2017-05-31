import React from 'react';
import styled from 'styled-components';

const AuthError = (props) => {
  const { error } = props;

  return (
    <Wrapper>
      <Header>{error}</Header><Instruction>Try again</Instruction>
    </Wrapper>
  );
};

const { string } = React.PropTypes;
AuthError.propTypes = {
  error: string.isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: column;
	justify-content: center;
	margin: 10px 20px;
	color: ${props => props.theme.error}
`;

const Header = styled.span`
	font-weight: bolder;
	text-align: center;
`;

const Instruction = styled.span`
	font-weight: lighter;
	text-align: center;
`;

export default AuthError;
