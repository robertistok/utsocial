import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CustomCheckbox = ({ input, label }) => (
  <Wrapper className="field">
    <div className="ui checkbox">
      <input
        {...input}
        type="checkbox"
        value={input.value}
        checked={input.value}
      />
      <label htmlFor={input.name}>{label}</label>
    </div>
  </Wrapper>
);

const { shape, string, any } = PropTypes;
CustomCheckbox.propTypes = {
  input: shape({ value: any, name: string }).isRequired,
  label: string.isRequired
};

const Wrapper = styled.div`
	margin: auto;

	@media screen and (max-width: 768px) {
		margin: auto 10px;
	}

	input {
		outline-color: ${props => props.theme.primary} !important;
	}
`;

export default CustomCheckbox;
