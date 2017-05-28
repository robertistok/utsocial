import styled from 'styled-components';
import { media } from '../../../utils/style-utils';

export const SettingTitle = styled.span`
	font-size: 16px;
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 50px;
`;

export const StyledForm = styled.form`
	display: flex;
	width: 768px;
	flex-direction: column;
	background-color: #FFFFFF;
	justify-content: space-around;
	margin: 15px auto;
	font-size: 13px;

	@media screen and (max-width: 768px) {
		width: 100%;
	}


`;

export const StyledLabel = styled.label`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 40px;
	padding: 5px 10px;
	width: 200px;
	margin-right: 15px;
`;

export const FieldGroup = styled.div`
	display: flex;
	flex-direction: row;
	margin: 15px 0px;

	@media screen and (max-width: 600px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const SaveButton = styled.button`
	outline: none
	margin-left: 100px;
	height: 40px;
	width: 120px;

	@media screen and (max-width: 600px) {
		margin-left: 50px;
	}

	@media screen and (max-width: 376px) {
		margin-left: 25px;
	}
`;
