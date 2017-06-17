import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const DescriptionArea = (props) => {
  const { input, label, placeholder, meta: { touched, error, active } } = props;

  return (
    <Wrapper error={touched && error} {...input}>
      <label htmlFor={input.name}>{label}</label>
      <ContentWrapper active={active}>
        <StyledTextArea {...input} placeholder={placeholder} />
        <SubmitButton type="submit" content="Post" />
      </ContentWrapper>

    </Wrapper>
  );
};

const { string, bool, shape } = PropTypes;
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

const Wrapper = styled.div`
	width: 100%;
	max-width: 600px;
	display: flex;
	flex-direction: column;
`;

const ContentWrapper = styled.div`
	position: relative;
	width: 600px;
	background-color: #FFFFFF;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid;
	margin-top: 10px;

	border-color: ${props => props.active ? props.theme.primary : '#dddddd'};

	&:hover {
		border-color: ${props => props.theme.inputBorderHover}
	}

	@media screen and (max-width: 768px) {
		width: 100% !important;
	}
`;

const StyledTextArea = styled(TextArea)`
	width: 100% !important;
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
	position: absolute;
	align-self: flex-end;
	margin: 7px !important;
	width: 80px;
	height: 25px;
	padding: 5px !important;
	bottom: 0;
	right: 0;
	background-color: ${props => props.theme.confirmation} !important;
	color: ${props => props.theme.white} !important;
`;

export default DescriptionArea;
