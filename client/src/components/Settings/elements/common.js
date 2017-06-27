import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const Status = props => (
  <StatusWrapper error={props.error}>
    <Icon name={props.error ? 'remove' : 'checkmark'} />
    {props.status}
  </StatusWrapper>
);

const { string, bool } = PropTypes;
Status.propTypes = {
  error: bool.isRequired,
  status: string
};

export const SettingTitle = styled.span`
	font-size: 16px;
	height: 80px;
	text-align: center;
	margin: 20px 10px;
	padding: 20px;
	font-weight: bold;
	width: 100%;
	border-bottom: ${props => props.theme.separator};
`;

export const StyledForm = styled.form`
	display: flex;
	margin: 0px auto 30px auto;
	width: 768px;
	flex-direction: column;
	background-color: #FFFFFF;
	justify-content: space-around;
	align-items: center;
	font-size: 13px;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

export const StyledLabel = styled.label`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 30px;
	padding: 5px 10px;
	width: 150px;
	margin: 0px 15px;

	@media screen and (max-width: 500px) {
		margin: 5px 0px;
	}
`;

export const FieldGroup = styled.div`
	display: flex;
	flex-direction: row;
	margin: 15px 0px;
	align-items: baseline;

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const SaveButton = styled.button`
	outline: none
	margin: 0px 10px 0px 10px;
	height: 30px;
	width: 150px;

	@media screen and (max-width: 600px) {
		margin-left: 50px;
	}

	@media screen and (max-width: 376px) {
		margin-left: 25px;
	}
`;

export const StatusWrapper = styled.div`
	${''}
	margin-left: 10px;
	color: ${props => props.error ? props.theme.error : props.theme.primary}
	font-size: 11px;
	font-weight: lighter;
	top: 40px;
	left: 0px;
`;
