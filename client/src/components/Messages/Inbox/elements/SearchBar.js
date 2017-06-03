import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const SearchBar = (props) => {
  const { searchTerm, changeSearchterm } = props;

  return (
    <Wrapper>
      <StyledInput
        type="text"
        placeholder="search"
        icon="search"
        iconPosition="left"
        value={searchTerm}
        onChange={(e, data) => changeSearchterm(data.value)}
      />
    </Wrapper>
  );
};

const { string, func } = PropTypes;
SearchBar.propTypes = {
  changeSearchterm: func.isRequired,
  searchTerm: string.isRequired
};

const Wrapper = styled.div`
	height: 40px;
	order: -1;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const StyledInput = styled(Input)`
	width: 100%;
	height: 100%;
	border-bottom: 1px solid ${props => props.theme.lightGray} !important;


	input {
		font-family: Roboto !important;
		border-radius: 0 !important;
		border-color: ${props => props.theme.white} !important;

		&:focus {
			border-color: ${props => props.theme.primary} !important;
		}
	}
`;

export default SearchBar;
