import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const StyledButton = styled(Button)`
	height: 20px;
	width: 100px;
	padding: 0px !important;
	margin-right: 0px !important;
`;

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-self: ${props => props.edit ? 'flex-end' : 'auto'}
`;
