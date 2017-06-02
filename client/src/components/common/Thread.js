import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as messagesActions from '../../redux/messages';
import femaleLogo from '../../assets/female.svg';
import maleLogo from '../../assets/male.svg';
import { truncate } from '../../utils/style-utils';
import { formatTime } from '../../utils/timestamp';

class Thread extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {
      selectConversation,
      changeSearchterm,
      customOnClickhandler,
      _id: id
    } = this.props;

    if (customOnClickhandler !== undefined) {
      customOnClickhandler();
    }
    changeSearchterm('');
    selectConversation(id);
  }

  render() {
    const {
      subject,
      participants,
      messages,
      user,
      _id: id
    } = this.props;

    const partner = participants.find(p => p.username !== user.username);
    const { firstname, lastname, gender } = partner;

    const lastMessage = messages[0];
    let { unread } = lastMessage;
    const { timestamp } = lastMessage;

    if (unread && lastMessage.sender !== partner.username) {
      unread = false;
    }

    return (
      <StyledNavLink to={`/messages/${id}`}>
        <Wrapper unread={unread} onClick={this.onClick}>
          <GenderLogo gender={gender} />
          <InfoWrapper>
            <PartnerAndTimestampWrapper>
              <Partner unread={unread}>
                {`${firstname} ${lastname}`}
              </Partner>
              <Timestamp>{formatTime(timestamp)}</Timestamp>
            </PartnerAndTimestampWrapper>
            <div><Subject>{subject}</Subject></div>
          </InfoWrapper>

        </Wrapper>
      </StyledNavLink>
    );
  }
}

const StyledNavLink = styled(NavLink)`
	&:hover {
		background-color: rgba(0, 0, 0, .05)
		cursor: pointer;
	}

	&.active {
		background-color: rgba(0, 0, 0, .05)
	}

	border-bottom: 1px solid ${props => props.theme.lightGray}
`;

const Wrapper = styled.div`
	display: flex;
	padding: 12px 16px;
	background-color: ${props => props.unread === true && props.theme.newNotification};
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-between;
`;

const PartnerAndTimestampWrapper = styled.div`
	display: flex;
	align-items: space-around;
	margin-left: 10px;
	color: ${props => props.theme.black};
`;

const Subject = styled.span`
	display: inline-block;
	margin: 0px;
	height: 20px;
	font-size: 13px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 13rem;
	color: ${props => props.theme.black};
	margin: 0px 10px;
`;

const Partner = styled.span`
	display: inline-block;
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: ${props => props.unread ? 'bold' : 'normal'};
	margin: auto 0px;
	max-width: 13rem;
`;

const Timestamp = styled.span`
	font-size: 12px;
	color: ${props => props.theme.secondary};
	font-weight: normal;
	margin-left: auto;
	width: 50px;
	text-align: right;
`;

const GenderLogo = styled.img`
	width: 30px;
	height: 30px;
	margin: 5px;

	content: url(${props => props.gender === 'male' ? maleLogo : femaleLogo});

	&.compose {
		margin: 0px;
	}
`;

const mapStateToProps = state => ({
  user: state.account.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...messagesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
