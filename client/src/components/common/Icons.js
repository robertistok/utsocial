import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export const NavIcon = styled(Icon)`
	position: relative !important;
	color: ${props => props.inverted ? '#000000 !important' : '#FFFFFF'};

	&:hover {
		color: #000000 !important;
		cursor: pointer;
	}
`;
