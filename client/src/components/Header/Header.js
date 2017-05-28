import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Sticky } from 'react-sticky';

import { capitalizeFirstLetter } from '../../utils/string-operations';
import ActionBar from './elements/ActionBar';

class Header extends PureComponent {
  render() {
    const { links, history, logOutUser, user } = this.props;

    return (
      <Sticky>
        {({ style }) => (
          <Wrapper style={style}>
            <Menu>
              {links.map(link => (
                <MenuItem to={`/${link}`} key={link}>
                  {capitalizeFirstLetter(link)}
                </MenuItem>
              ))}
              <ActionBar
                logOut={() => {
                  logOutUser();
                  history.push('/');
                }}
                user={user.profile.firstname}
              />
            </Menu>
          </Wrapper>
        )}
      </Sticky>
    );
  }
}

const { string, func, arrayOf, shape } = React.PropTypes;
Header.propTypes = {
  history: shape({ push: func.isRequired }).isRequired,
  logOutUser: func.isRequired,
  links: arrayOf(string).isRequired
};

const Wrapper = styled.header`
	top: 0px;
	left: 0px;
	height: 75px;
	background: #51D1B9;
	overflow: auto;
	z-index: 10;
`;

const Menu = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const MenuItem = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	height: 75px;
	padding: 10px 20px 5px 10px;
	font-size: 14px;
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
