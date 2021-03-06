import styled from 'styled-components';
import { Button, Accordion } from 'semantic-ui-react';

export const StyledButton = styled(Button)`
	height: 20px;
	width: 100px;
	padding: 0px !important;
	margin-right: 0px !important;
	border-radius: 0 !important;
`;

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-self: ${props => props.edit ? 'flex-end' : 'auto'}
`;

export const StyledAccordion = styled(Accordion)`
	background-color: ${props => props.theme.background} !important;
	border: 0 !important;
  border-bottom-width: 0px !important;
  border-top-width: 0px !important;
  border-radius: 0px !important;
	box-shadow: 0 3px 5px rgba(0,0,0,.23) !important;
`;

export const StyledAccordionTitle = styled(Accordion.Title)`
	text-align: center;
	font-size: 17px !important;

	@media screen and (max-width: 420px) {
		font-size: 15px !important;
	}
`;

export const StyledAccordionContent = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const Title = styled.span`
	display: inline-block;
	width: 100%;
	font-size: 20px;
	font-weight: bolder;
	margin: 30px 0px;
	text-align: center;
	text-decoration: underline;
`;
