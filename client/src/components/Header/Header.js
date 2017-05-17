import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '../../utils/string-operations';
// import BreadcrumbsWithRouter from './elements/Breadcrumb';
import { media } from '../../utils/style-utils';

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

	.active {
		border-bottom: 2px solid #E9EAE8;
		color: #E9EAE8;
	}
`;

const MenuItem = styled(NavLink)`
	color: #FFFFFF;
	text-align: center;
	height: 50px;
	padding: 10px 20px 25px 10px;

	&:hover {
		color: #e1e8f0;
	}
`;

const Header = props => (
  <Wrapper>
    <ActionBar>
      <LogOutButton onClick={props.logOutUser}>Log out</LogOutButton>
    </ActionBar>

    <HeaderWrapper>
      <Title>UTSocial</Title>
    </HeaderWrapper>

    <Menu>
      {props.links.map(link => (
        <MenuItem to={`/${link}`} key={link}>
          {capitalizeFirstLetter(link)}
        </MenuItem>
      ))}
    </Menu>
    {/* <Menu secondary size="small">
      {props.links.map(link => (
        <MenuItem as={NavLink} to={`/${link}`} key={link}>
          {capitalizeFirstLetter(link)}
        </MenuItem>
      ))}
      <Menu.Menu position="right">
        <MenuItem as="button" onClick={props.logOutUser}>
          Log out
        </MenuItem>
      </Menu.Menu>
    </Menu> */}
    {/* <BreadcrumbsWithRouter /> */}
  </Wrapper>
);

export default Header;
