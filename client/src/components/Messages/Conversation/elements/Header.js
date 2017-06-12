import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import starFilled from '../../../../assets/star_filled.svg';
import starEmpty from '../../../../assets/star_empty.svg';

const Header = (props) => {
  const { selectedConversation, loggedInUser, onStarClick } = props;
  const filled = selectedConversation.starred.indexOf(loggedInUser._id) > -1;

  return (
    <Wrapper>
      <StarLogo filled={filled} onClick={onStarClick} />
      <Subject>{selectedConversation.subject}</Subject>
    </Wrapper>
  );
};

const { arrayOf, shape, string, bool, func } = PropTypes;
Header.propTypes = {
  selectedConversation: shape({
    participants: arrayOf(shape({ _id: string.isRequired })),
    messages: arrayOf(
      shape({ _id: string.isRequired, unread: bool.isRequired })
    )
  }),
  loggedInUser: shape({
    username: string.isRequired,
    _id: string.isRequired
  }).isRequired,
  onStarClick: func.isRequired
};

const Wrapper = styled.div`
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, .10);
	padding: 5px 40px;
`;

const Subject = styled.span`
	font-size: 20px;
	color: ${props => props.theme.secondary};
`;

const StarLogo = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 10px;

	&:hover {
		cursor: pointer;
	}

	content: url(${props => props.filled ? starFilled : starEmpty});
`;

export default Header;
