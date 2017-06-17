import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const StyledButton = styled(Button)`
	align-self: flex-end;
	margin: 7px !important;
	width: 120px;
	height: 30px;
	padding: 5px !important;
	bottom: 0;
	right: 0;

	&.confirmation {
		background-color: ${props => props.theme.confirmation} !important;
		color: ${props => props.theme.white} !important;
	}
`;

export const ButtonGroup = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	align-self: ${props => props.edit ? 'flex-end' : 'auto'}
`;
