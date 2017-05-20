import styled from 'styled-components';
import { Accordion } from 'semantic-ui-react';

export const StyledAccordionTitle = styled(Accordion.Title)`
	text-align: center;
`;

export const StyledAccordionContent = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
