import React from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import styled from 'styled-components';
// import ContentEditableDiv from '../../../../../elements/ContentEditableDiv';

const DescriptionArea = (props) => {
  const { input, label, placeholder, meta: { touched, error, active } } = props;

  return (
    <Form.Field error={touched && error} {...input}>
      <label htmlFor={input.name}>{label}</label>
      <ContentWrapper active={active}>
        {/* <ContentEditableDiv
          onContentChange={e => input.onChange(e.target.innerText)}
          text={input.value}
        /> */}
        <StyledTextArea {...input} placeholder={placeholder} />
        <SubmitButton type="submit" content="Post" />
      </ContentWrapper>

    </Form.Field>
  );
};

const { string, bool, shape } = React.PropTypes;
DescriptionArea.propTypes = {
  label: string,
  meta: shape({
    touched: bool.isRequired,
    error: bool,
    active: bool.isRequired
  }).isRequired,
  placeholder: string,
  input: shape({ name: string })
};

const ContentWrapper = styled.div`
	background-color: #FFFFFF;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid;

	border-color: ${props => props.active ? '#96c8da' : '#dddddd'};
`;

const StyledTextArea = styled(TextArea)`
	width: 450px !important;
	padding: 10px 10px 10px !important;
	resize: none !important;
	min-height: 150px !important;
	border: 0 !important;
	background-color: #FFFFFF !important;

	&:focus {
		outline: none !important;
	}
`;

const SubmitButton = styled(Button)`
	position: relative;
	align-self: flex-end;
	margin: 10px !important;
	width: 90px;
	height: 25px;
	padding: 5px !important;
`;

export default DescriptionArea;
