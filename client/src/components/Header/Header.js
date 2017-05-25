import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '../../utils/string-operations';
import { media } from '../../utils/style-utils';

const Header = (props) => {
  const { links, history, logOutUser } = props;

  return (
    <Wrapper>
      <ActionBar>
        <LogOutButton
          onClick={() => {
            logOutUser();
            history.push('/');
          }}
        >
          Log out
        </LogOutButton>
      </ActionBar>

      <HeaderWrapper>
        <Title>UTSocial</Title>
      </HeaderWrapper>

      <Menu>
        {links.map(link => (
          <MenuItem to={`/${link}`} key={link}>
            {capitalizeFirstLetter(link)}
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  );
};

const { string, func, arrayOf, shape } = React.PropTypes;
Header.propTypes = {
  history: shape({ push: func.isRequired }).isRequired,
  logOutUser: func.isRequired,
  links: arrayOf(string).isRequired
};

const Wrapper = styled.header`
	top: 0px;
	left: 0px;
	background: #51D1B9;
`;

const ActionBar = styled.div`
	height: 50px;
	display: flex;
	justify-content: flex-end;
	padding-top: 10px;

	&:first-child {
		padding-right: 25px;
	}
`;

const LogOutButton = styled(Button)`
	color: #FFFFFF !important;
	box-shadow: none !important;
	background-color: #51D1B9 !important;
	font-family: 'Roboto' !important
	height: min-content;

	&:hover {
		box-shadow: none !important;
		color: #e1e8f0 !important;
	}
`;

const HeaderWrapper = styled.div`
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;

const Title = styled.h5`
	color: #FFFFFF;
	text-align: left;
	padding: 10px 0px 20px 25px;
	margin-top: 0px;
	margin-bottom: 0px;
	font-size: 3em;
	height: min-content;

	${media.tablet`margin-left: initial`}
`;

const Menu = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const MenuItem = styled(NavLink)`
	color: #FFFFFF;
	text-align: center;
	height: 50px;
	padding: 10px 20px 25px 10px;
	transform: perspective(1px) translateZ(0);


	&:before {
		content: "";
		position: absolute;
		z-index: -1;
		left: 50%;
		right: 50%;
		bottom: 0;
		background: #E9EAE8;
		height: 2px;
		-webkit-transition-property: left, right;
		transition-property: left, right;
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transition-timing-function: ease-out;
		transition-timing-function: ease-out;
	}

	&:hover:before, &.active:before {
		left: 0;
		right: 0;
	}

	&:hover {
		color: #e1e8f0;
	}
`;

export default withRouter(Header);
