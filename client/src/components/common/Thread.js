import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as messagesActions from '../../redux/messages';
import femaleLogo from '../../assets/female.svg';
import maleLogo from '../../assets/male.svg';
import { formatTime } from '../../utils/timestamp';
import { onlyFirstLetters } from '../../utils/string-operations';

class Thread extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.messages[0]._id !== this.props.messages[0]._id ||
      nextProps.location.pathname.split('/')[2] === nextProps._id ||
      this.props.location.pathname.split('/')[2] === this.props._id;
  }

  onClick() {
    const {
      selectConversation,
      changeSearchterm,
      customOnClickhandler,
      readMessages,
      _id: id,
      messages,
      selectedConversation,
      user: { _id: userID }
    } = this.props;

    const lastMessage = messages[0];

    if (customOnClickhandler !== undefined) {
      customOnClickhandler();
    }

    changeSearchterm('');
    if (selectedConversation === null || selectedConversation._id !== id) {
      selectConversation(id);
    }

    if (userID !== lastMessage.sender && lastMessage.unread === true) {
      readMessages(id);
    }
  }

  render() {
    const {
      subject,
      participants,
      messages,
      user: { _id: userID },
      _id: id,
      isNotification = false
    } = this.props;

    const partner = participants.find(p => p._id !== userID);
    const { firstname, lastname, gender } = partner;

    const lastMessage = messages[0];
    let { unread } = lastMessage;
    const { timestamp } = lastMessage;

    if (unread === true && lastMessage.sender !== partner._id) {
      unread = false;
    }

    return (
      <StyledNavLink
        to={`/messages/${id}`}
        activeClassName={isNotification ? '' : 'active'}
      >
        <Wrapper unread={unread} onClick={this.onClick}>
          <GenderLogo gender={gender} isNotification={isNotification} />
          <InfoWrapper isNotification={isNotification}>
            <PartnerAndTimestampWrapper>
              <Partner unread={unread}>
                {`${firstname} ${lastname}`}
              </Partner>
              <Timestamp>{formatTime(timestamp)}</Timestamp>
            </PartnerAndTimestampWrapper>
            <Subject>{subject}</Subject>
          </InfoWrapper>
          {!isNotification &&
            <MobilePartner>
              <Partner unread={unread}>
                {onlyFirstLetters(`${firstname} ${lastname}`)}
              </Partner>
            </MobilePartner>}
        </Wrapper>
      </StyledNavLink>
    );
  }
}

const { func, string, shape, arrayOf, bool } = PropTypes;
Thread.propTypes = {
  customOnClickhandler: func,
  selectConversation: func.isRequired,
  changeSearchterm: func.isRequired,
  readMessages: func.isRequired,
  _id: string.isRequired,
  subject: string.isRequired,
  selectedConversation: shape({ _id: string.isRequired }),
  user: shape({ username: string.isRequired }).isRequired,
  participants: arrayOf(
    shape({ _id: string.isRequired }).isRequired
  ).isRequired,
  messages: arrayOf(
    shape({ unread: bool.isRequired, timestamp: string.isRequired })
  ),
  isNotification: bool,
  location: shape({ pathname: string.isRequired })
};

const StyledNavLink = styled(NavLink)`
	border-bottom: 1px solid ${props => props.theme.lightGray};

	&:hover {
		background-color: ${props => props.theme.selected};
		cursor: pointer;
	}

	&.active {
		background-color: ${props => props.theme.selected};
	}

	@media screen and (max-width: 768px) {
		height: min-content;
		border-bottom: 0px;
	}

`;

const Wrapper = styled.div`
	display: flex;
	padding: 12px 16px;
	background-color: ${props => props.unread === true && props.theme.newNotification};
	font-size: 14px;

	@media screen and (max-width: 768px) {
		font-size: 13px;
	}

	@media screen and (max-width: 378px) {
		font-size: 12px;
	}
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-between;

	@media screen and (max-width: 768px) {
		display: ${props => !props.isNotification && 'none'};
	}
`;

const MobilePartner = styled.div`
	display: none;

	@media screen and (max-width: 768px) {
		display: flex;
		color: ${props => props.theme.black};
	}
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

	@media screen and (max-width: 768px) {
		font-size: 12px;
	}

	@media screen and (max-width: 768px) {
		font-size: 11px;
	}
`;

const Partner = styled.span`
	display: inline-block;
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

	@media screen and (max-width: 768px) {
		font-size: 11px;
	}

	@media screen and (max-width: 768px) {
		font-size: 10px;
	}
`;

const GenderLogo = styled.img`
	width: 30px;
	height: 30px;
	margin: 5px;

	content: url(${props => props.gender === 'male' ? maleLogo : femaleLogo});

	@media screen and (max-width: 768px) {
		width: 25px;
		height: 25px;
	}

	@media screen and (max-width: 378px) {
		width: 20px;
		height: 20px;
	}

	@media screen and (max-width: 350px) {
		display: ${props => !props.isNotification && 'none'};
	}
`;

const mapStateToProps = state => ({
  user: state.account.auth.user,
  selectedConversation: state.messages.selectedConversation
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...messagesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
