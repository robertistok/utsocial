import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { onlyFirstLetters } from '../../../../utils/string-operations';
import { formatTime } from '../../../../utils/timestamp';
import calendarLogo from '../../../../assets/calendar.svg';
import documentErrorLogo from '../../../../assets/document-error.svg';
import taskDoneLogo from '../../../../assets/task-done.svg';

function formatNotification(type, teacherName, target, info) {
  const { course } = target;
  if (type === 'attendanceAdd') {
    const { enteredFor } = info;
    return `You've been marked as present by ${teacherName} for the ${onlyFirstLetters(course.id.name)} ${course.type} at ${formatTime(enteredFor)} `;
  }

  if (type === 'attendanceRemove') {
    const { enteredFor } = info;
    return `${teacherName} removed your attendance for the ${onlyFirstLetters(course.id.name)} ${course.type} at ${formatTime(enteredFor)} `;
  }

  if (type === 'gradeAdd') {
    const { gradeNumber } = info;
    return `${teacherName} added your ${gradeNumber}. grade for the ${onlyFirstLetters(course.id.name)} ${course.type}`;
  }

  if (type === 'gradeDelete') {
    const { gradeNumber } = info;
    return `${teacherName} removed your ${gradeNumber}. grade for the ${onlyFirstLetters(course.id.name)} ${course.type}`;
  }
}

const NotificationItem = (props) => {
  const {
    type,
    triggeredBy: { name: teacherName },
    timestamp,
    target,
    seenBy,
    info,
    user: { _id: userID, profile }
  } = props;

  const lang = profile.group !== undefined ? profile.group.lang : 'ro';

  return (
    <StyledLink to={`/courses/${target.course.id._id}/${lang}`}>
      <Wrapper unSeen={seenBy.find(user => user === userID) === undefined}>
        <InfoWrapper>
          <Icon type={type} />
          <span>
            {formatNotification(type, teacherName, target, info)}
          </span>
        </InfoWrapper>
        <Timestamp>{formatTime(timestamp, true)}</Timestamp>
      </Wrapper>
    </StyledLink>
  );
};

const { shape, string, arrayOf, object } = PropTypes;
NotificationItem.propTypes = {
  type: string.isRequired,
  timestamp: string.isRequired,
  user: shape({
    _id: string.isRequired,
    profile: shape({ name: string.isRequired })
  }),
  seenBy: arrayOf(string),
  triggeredBy: shape({ name: string.isRequired }).isRequired,
  target: shape({ course: shape({ id: shape({ name: string.isRequired }) }) }),
  info: object
};

const StyledLink = styled(Link)`
	border-bottom: 1px solid ${props => props.theme.lightGray};
	color: ${props => props.theme.black} !important;

	&:hover {
		background-color: rgba(0, 0, 0, .05)
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		height: min-content;
		border-bottom: 0px;
	}

`;

const Wrapper = styled.div`
	display: flex;
	padding: 12px 16px;
	background-color: ${props => props.unSeen === true && props.theme.newNotification};
	font-size: 14px;

	@media screen and (max-width: 768px) {
		font-size: 13px;
	}

	@media screen and (max-width: 378px) {
		font-size: 12px;
	}
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

const InfoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-right: 15px;
`;

const Icon = styled.img`
	width: 30px;
	margin-right: 15px;

	content: url(${(props) => {
  const { type } = props;
  if (type === 'attendanceAdd') {
    return calendarLogo;
  } else if (type === 'attendanceRemove' || type === 'gradeDelete') {
    return documentErrorLogo;
  } else if (type === 'gradeAdd') {
    return taskDoneLogo;
  }
}});

	@media screen and (max-width: 768px) {
		width: 25px;
		height: 25px;
	}

	@media screen and (max-width: 378px) {
		width: 20px;
		height: 20px;
	}
`;

export default NotificationItem;
