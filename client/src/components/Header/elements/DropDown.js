import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';

import { NavIcon } from '../../common/Icons';

class DropDown extends Component {
  handleClickOutside() {
    const {
      shown,
      toggleDropdown
    } = this.props;

    if (shown === true) {
      toggleDropdown();
    }
  }

  render() {
    const {
      items,
      shown,
      toggleDropdown,
      newAlertCount,
      title,
      icon,
      Item,
      customItemProps
    } = this.props;

    return (
      <Dropdown>
        <NavIcon
          size="large"
          name={icon}
          inverted={shown}
          onClick={toggleDropdown}
        >
          {newAlertCount !== 0 &&
            <Number>
              {newAlertCount}
            </Number>}
        </NavIcon>
        {shown &&
          <Content>
            <Title>{title}</Title>
            <ItemsContainer>
              {items !== null &&
                items.map(item => (
                  <Item
                    key={item._id}
                    {...item}
                    {...this.props}
                    {...customItemProps}
                  />
                ))}
            </ItemsContainer>

          </Content>}
      </Dropdown>
    );
  }
}

const { func, bool, string, number, object, arrayOf } = PropTypes;
DropDown.propTypes = {
  toggleDropdown: func.isRequired,
  shown: bool.isRequired,
  icon: string.isRequired,
  title: string.isRequired,
  newAlertCount: number.isRequired,
  customItemProps: object,
  Item: func.isRequired,
  items: arrayOf(object) // Implement properly..
};

const Dropdown = styled.div`
	position: relative;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	background-color: ${props => props.theme.white};
  min-width: 300px;
	max-height: 450px;
	height: min-content;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
	right: -60px;
	top: 60px;

	@media screen and (max-width: 768px) {
		top: 35px;
		right: -150px;
	}

	@media screen and (max-width: 400px) {
		right: -86px;
		width: 100vw;
	}
`;

const Title = styled.span`
	font-size: 14px;
	color: ${props => props.theme.secondary};
	font-weight: bolder;
	padding: 10px 15px;
	border-bottom: 1px solid ${props => props.theme.lightGray} !important;
`;

const ItemsContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

const Number = styled.span`
	position: absolute;
	right: 14px;
	top: -3px;
	color: ${props => props.theme.white};
	font-size: 10px;
	z-index: 10;
	font-weight: bolder;
	border: 1px solid #FF0000
	border-radius: 50%;
	width: 18px;
	height: 16px;
	padding: 2px;
	background-color: #FF0000
`;

export default enhanceWithClickOutside(DropDown);
