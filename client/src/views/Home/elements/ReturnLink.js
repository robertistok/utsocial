import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ReturnLink = props => (
  <Wrapper to="/">
    <Icon name="angle left" />
    {props.content}
  </Wrapper>
);

ReturnLink.propTypes = {
  content: PropTypes.string.isRequired
};

const Wrapper = styled(Link)`
	color: ${props => props.theme.white}
`;

export default ReturnLink;
