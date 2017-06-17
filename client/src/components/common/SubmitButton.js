import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const SubmitButton = styled(Button)`
	margin: 10px !important;
	height: 40px;

		width: ${(props) => {
  if (props.width !== undefined) {
    return props.width;
  }

  return '150px';
}};

	&.confirmation {
		background-color: ${props => props.theme.primary} !important;
		color: ${props => props.theme.white} !important;
	}

	@media screen and (max-width: 768px) {
		font-size: 13px;
	}

	@media screen and (max-width: 378px) {
		font-size: 12px;
	}
`;

export default SubmitButton;
