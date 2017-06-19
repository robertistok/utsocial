import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spinner from 'react-spinkit';

const Loader = (props) => {
  const { loadingText } = props;

  return (
    <Wrapper>
      <StyledSpinner name="ball-grid-pulse" />
      <LoadingText>{loadingText}</LoadingText>
    </Wrapper>
  );
};

const { string } = PropTypes;
Loader.propTypes = {
  loadingText: string
};

Loader.defaultProps = {
  loadingText: 'Loading...'
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;

const StyledSpinner = styled(Spinner)`
	color: ${props => props.theme.primary};
	margin-bottom: 15px;
`;

const LoadingText = styled.span`
	font-size: 16px;
	color: ${props => props.theme.secondary};
`;

export default Loader;
