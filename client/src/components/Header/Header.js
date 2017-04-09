import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import BreadcrumbsWithRouter from './Breadcrumb/Breadcrumb';

import logo from '../../../public/utcnlogo.png';
import { capitalizeFirstLetter } from '../../utils/string-operations';

const HeaderWrapper = styled.header`
	position: fixed;
	overflow: hidden;
	width: 100%;
	top: 0px;
	left: 0px;
	background: #ffffff;
	z-index: 2;

	.title {
		color: #FFEBEE;
		background-color: #1A237E;
		text-align: left;
		padding: 13px 0px;
		padding-left: 15px;
		margin-left: 150px;
		margin-top: 0px;
		height: 50px;
		margin-bottom: 0px;
	}

	.logo {
		float: left;
		position: relative;
		margin: 10px;
	}

	 .breadcrumb {
		height: 50px;
		width: 100%;
		background-color: #3F51B5;
		color: #FFFFFF;
		padding: 15px 10px;
	}

	.ui.stackable.menu {
		margin: 0px;
		background-color: #303F9F;
		border-radius: 0px;
		min-height: 80px;
	}

	.ui.stackable.menu > .item {
		color: #bdbdbd;
		padding: 15px 35px;
	}

	.ui.stackable.menu > .item:hover {
		border-bottom: 1px solid #FF5722;
		color: #e0e0e0 !important;

	}

	.ui.stackable.menu > .active {
		border-bottom: 1px solid #FF5722;
		color: #eeeeee !important;
	}

	.ui.stackable.menu > .active:hover {
		color: #eeeeee !important;
		border-bottom: 1px solid #FF5722;
	}
`;

const Header = props => (
  <HeaderWrapper className="header">
    <Image src={logo} width={130} height={110} className="logo" />
    <h5 className="title">
      Automation and Computer Science Department
    </h5>
    <Menu stackable size="large">
      {props.links.map(link => (
        <Menu.Item
          as={NavLink}
          to={`/${link}`}
          activeClassName="active"
          key={link}
        >
          {capitalizeFirstLetter(link)}
        </Menu.Item>
      ))}
    </Menu>
    <BreadcrumbsWithRouter />
  </HeaderWrapper>
);

export default Header;
