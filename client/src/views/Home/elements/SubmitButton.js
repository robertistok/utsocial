import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const SubmitButton = styled(Button)`
	margin: 20px auto !important;
	width: 90%;
	height: 40px;
	background-color: ${props => props.theme.primary} !important;
	color: ${props => props.theme.white} !important;
`;

export default SubmitButton;
