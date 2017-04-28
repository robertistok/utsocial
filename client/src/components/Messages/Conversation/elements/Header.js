import React from 'react';
import styled from 'styled-components';

import starFilled from '../../../../../public/star_filled.svg';
import starEmpty from '../../../../../public/star_empty.svg';

const Wrapper = styled.div`
	height: 50px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, .10);
`;

const Subject = styled.div`
	font-size: 25px;
`;

const Logo = styled.img`
	width: 20px;
	height: 20px;
	margin-left: 50px;
	margin-right: 10px;

	content: url(${props => props.filled ? starFilled : starEmpty});
`;

const Header = (props) => {
  const { selectedConversation } = props;
  const { loggedInUser } = props;
  const filled = selectedConversation.starred.indexOf(loggedInUser.username) >
    -1;
  return (
    <Wrapper>
      <Logo filled={filled} />
      <Subject>{selectedConversation.subject}</Subject>
    </Wrapper>
  );
};

export default Header;
