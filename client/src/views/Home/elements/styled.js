import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
	position: relative;
	top: -10px;
	right: -14px;
	align-self: flex-end;
`;

export const StyledIcon = styled(Icon)`
	color: ${props => props.theme.secondary};
	transition-duration: 0.3s;
	transition-timing-function: ease-out;

	&:hover {
		cursor: pointer;
		transform: translateY(-4px);
	}
`;

export const Description = styled.div`
	font-size: 15px;
	color: ${props => props.theme.white};
	margin-bottom: 20px;
	width: 100%;
	text-align: center;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 260px;
`;
