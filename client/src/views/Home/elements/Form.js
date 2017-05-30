import styled from 'styled-components';
import { media } from '../../../utils/style-utils';

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	width: 450px;
	height: min-content;
	box-shadow: 3px 5px 5px #888888;

	padding: 30px;

	@media screen and (max-width: 600px) {
		width: 350px;
	}

	${media.phone`
		width: 100%
		font-size: 12px;
		padding: 15px;
	`}
`;

export default StyledForm;
