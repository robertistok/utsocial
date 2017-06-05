import styled from 'styled-components';

export const SettingTitle = styled.span`
	font-size: 16px;
	height: 30px;
	display: flex;
	align-items: center;
	margin: 20px auto;
`;

export const StyledForm = styled.form`
	display: flex;
	width: 768px;
	flex-direction: column;
	background-color: #FFFFFF;
	justify-content: space-around;
	align-items: center;
	margin: 15px auto;
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
