import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Sticky } from 'react-sticky';

import { capitalizeFirstLetter } from '../../utils/string-operations';
import { media } from '../../utils/style-utils';

import ActionBar from './elements/ActionBar';
import MobileNavigation from './elements/MobileNavigation';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth ||
      documentElement.clientWidth ||
      body.clientWidth;
    const height = w.innerHeight ||
      documentElement.clientHeight ||
      body.clientHeight;

    this.setState({ width, height });
  }

  render() {
    const { links, history, logOutUser, user } = this.props;
    const { width } = this.state;

    if (width <= 768) {
      return (
        <div>
          <Sticky>
            {({ style }) => (
              <Wrapper style={style}>
                <Title>UTSocial</Title>
                <ActionBar
                  logOut={() => {
                    logOutUser();
                    history.push('/');
                  }}
                  user={user.profile.firstname}
                />
              </Wrapper>
            )}
          </Sticky>
          <MobileNavigation links={links} />
        </div>
      );
    }

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

const { string, func, arrayOf, shape } = PropTypes;
Header.propTypes = {
  history: shape({ push: func.isRequired }).isRequired,
  logOutUser: func.isRequired,
  links: arrayOf(string).isRequired,
  user: shape({
    profile: shape({ firstname: string.isRequired }).isRequired
  }).isRequired
};

const Wrapper = styled.header`
	top: 0px;
	left: 0px;
	height: 100px;
	background: #51D1B9;
	overflow: auto;
	z-index: 1;
	padding: 0px 20px;


	${media.tablet`
		height: 50px;
		padding: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		`}
`;

const Title = styled.span`
	color: ${props => props.theme.white};
	font-size: 22px;
	margin: auto;

	@media screen and (max-width: 550px) {
		display: none;
	}
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
	height: 100px;
	padding: 10px 15px 5px 15px;
	font-size: 16px;
	transform: perspective(1px) translateZ(0);


	&:before {
		content: "";
		position: absolute;
		z-index: -1;
		left: 50%;
		right: 50%;
		bottom: 0;
		background: #f5f8fa;
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
		color: #f5f8fa;
	}

	&.active {
		color: #f5f8fa;
	}
`;

export default withRouter(Header);
