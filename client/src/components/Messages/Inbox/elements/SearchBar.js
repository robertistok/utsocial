import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const SearchBar = (props) => {
  const { searchTerm, changeSearchterm } = props;

  return (
    <Wrapper>
      <StyledInput
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e, data) => changeSearchterm(data.value)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
	height: 30px;
	order:-1;
`;

const StyledInput = styled(Input)`
	height: 30px;
	width: 100%;

	input {
		font-family: Roboto !important;
		border-radius: 0 !important;
	}
`;

export default SearchBar;
