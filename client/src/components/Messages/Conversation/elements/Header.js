import React from 'react';
import styled from 'styled-components';

import starFilled from '../../../../../public/star_filled.svg';

const Wrapper = styled.div`
	height: 49px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const Subject = styled.div`
	font-size: 25px;
`;

const Logo = styled.img`
	width: 20px;
	height: 20px;
	margin-left: 50px;
	margin-right: 10px;
`;

const Header = (props) => {
  const { selectedConversation } = props;
  return (
    <Wrapper>
      <Logo src={starFilled} />
      <Subject>{selectedConversation.subject}</Subject>
    </Wrapper>
  );
};

export default Header;
