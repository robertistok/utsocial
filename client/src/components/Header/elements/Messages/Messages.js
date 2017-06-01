import React, { Component } from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';

import { NavIcon } from '../../../common/Icons';
import Thread from './elements/Thread';

class Messages extends Component {
  handleClickOutside() {
    const {
      toggledOn: shown,
      toggle: toggleDropdown
    } = this.props;

    if (shown === true) {
      toggleDropdown();
    }
  }

  render() {
    const {
      conversations,
      toggledOn: shown,
      toggle: toggleDropdown,
      user: { username }
    } = this.props;

    return (
      <Dropdown>
        <NavIcon
          size="large"
          name="envelope"
          inverted={shown}
          onClick={toggleDropdown}
        >
          <Number>
            {conversations &&
              conversations.filter(
                conv =>
                  conv.messages[0].unread === true &&
                  conv.messages[0].sender !== username
              ).length}
          </Number>
        </NavIcon>
        {shown &&
          <Content>
            {conversations !== null &&
              conversations.map(conversation => (
                <Thread
                  key={conversation._id}
                  {...conversation}
                  current={username}
                />
              ))}
          </Content>}
      </Dropdown>
    );
  }
}

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
	}
`;

const Number = styled.span`
	position: absolute;
	right: 14px;
	top: -3px;
	color: ${props => props.theme.white};
	font-size: 11px;
	z-index: 10;
	font-weight: bolder;
	border: 1px solid #FF0000
	border-radius: 50%;
	width: 16px;
	background-color: #FF0000
`;

export default enhanceWithClickOutside(Messages);
