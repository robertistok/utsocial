import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import styled from 'styled-components';

import logo from '../../../public/utcnlogo.png';
import { capitalizeFirstLetter } from '../../utils/string-operations';
import BreadcrumbsWithRouter from './elements/Breadcrumb';
import media from '../../utils/media';

const HeaderWrapper = styled.header`
	top: 0px;
	left: 0px;
	background: #ffffff;

	.ui.small.secondary.stackable.menu {
		margin: 0px;
		background-color: #303F9F;
		border-radius: 0px;
		min-height: 50px;
	}

	.ui.small.secondary.stackable.menu {
		.active {
			border-bottom: 1px solid #FF5722;
			color: #eeeeee !important;
		}

		.active:hover {
			color: #eeeeee !important;
			border-bottom: 1px solid #FF5722;
		}
	}
`;

const Title = styled.h5`
	color: #FFEBEE;
	background-color: #1A237E;
	text-align: left;
	padding: 5px 0px;
	padding-left: 15px;
	margin-left: 80px;
	margin-top: 0px;
	height: 30px;
	margin-bottom: 0px;
	font-size: 1em;

	${media.tablet`margin-left: initial`}
`;

const Logo = styled(Image)`
	float: left;
	position: relative;
	margin: 10px;
	width: 60px;
	height: 60px;

	${media.tablet`display: none !important`}

`;

const MenuItem = styled(Menu.Item)`
	color: #bdbdbd !important;
	padding: 15px 35px;
	border-bottom: 1px solid grey;
	text-align: center;
	height: 50px;

	${media.tablet`height: initial;`}

	&:hover {
		border-bottom: 1px solid #FF5722;
		color: #e0e0e0;
	}
`;

const Header = props => (
  <HeaderWrapper className="header">
    <Logo src={logo} />
    <Title>
      Automation and Computer Science Department
    </Title>
    <Menu stackable secondary size="small">
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
    </Menu>
    <BreadcrumbsWithRouter />
  </HeaderWrapper>
);

export default Header;
