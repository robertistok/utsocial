import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';

const Checkbox = ({ input, label }) => (
  <div className="field">
    <Wrapper className="ui checkbox">
      <StyledCheckbox
        {...input}
        type="checkbox"
        value={input.value}
        checked={input.value}
      />
      <label htmlFor={input.name}>{label}</label>
    </Wrapper>
  </div>
);

const { shape, string, any } = PropTypes;
Checkbox.propTypes = {
  input: shape({ value: any, name: string }).isRequired,
  label: string.isRequired
};

const Wrapper = styled.div`
	label {
		color: ${props => props.theme.secondary} !important;
		font-size: 12px !important;
	}
`;

const StyledCheckbox = styled.input`
	&:focus {
		border: 1px solid ${props => props.theme.secondary} !important;
	}
`;

export default Checkbox;
