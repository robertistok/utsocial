import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const SubmitButton = styled(Button)`
	margin: 20px auto !important;
	width: 90%;
	height: 40px;
	background-color: ${props => props.theme.primary} !important;
	color: ${props => props.theme.white} !important;

	@media screen and (max-width: 768px) {
		font-size: 13px;
	}

	@media screen and (max-width: 378px) {
		font-size: 12px;
		height: 30px;
		margin: 10px auto !important;
	}

	@media screen and (max-height: 420px) {
		margin: 10px auto !important;
	}
`;

export default SubmitButton;
