import React from 'react';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import {
  decorator as reduxBurgerMenu,
  action as toggleMenu
} from 'redux-burger-menu';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import { capitalizeFirstLetter } from '../../../utils/string-operations';

import './menu.css';

const MobileNavigation = (props) => {
  const { links, toggleMenu, isOpen: { isOpen } } = props;

  return (
    <Menu width={200} isOpen={isOpen}>
      <LinksWrapper>
        {links.map(link => (
          <MenuItem
            to={`/${link}`}
            key={link}
            onClick={() => toggleMenu({ isOpen: false })}
          >
            {capitalizeFirstLetter(link)}
          </MenuItem>
        ))}
      </LinksWrapper>

    </Menu>
  );
};

const { arrayOf, shape, bool, func, string, oneOfType } = PropTypes;
MobileNavigation.propTypes = {
  toggleMenu: func.isRequired,
  isOpen: oneOfType([shape({ isOpen: bool }), bool]),
  links: arrayOf(string).isRequired
};

const MenuItem = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	height: 50px;
	padding: 10px 15px 5px 15px;
	font-size: 13px;

	&:hover {
		color: #f5f8fa;
	}

	&.active {
		color: ${props => props.theme.secondary};
	}
`;

const LinksWrapper = styled.div`
	margin: 40px 25px;
`;

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleMenu }, dispatch);

const enhance = compose(reduxBurgerMenu, connect(null, mapDispatchToProps));

export default enhance(MobileNavigation);
