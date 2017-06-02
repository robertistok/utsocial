import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const SubmitButton = styled(Button)`
	margin: 10px auto !important;

	width: ${(props) => {
  if (props.width !== undefined) {
    return props.width;
  }

  return '150px';
}};

	height: 40px;
	background-color: ${props => props.theme.primary} !important;
	color: ${props => props.theme.white} !important;
`;

export default SubmitButton;
