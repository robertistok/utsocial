import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const Wrapper = styled.div`
	height: 30px;
	order:-1;
`;

const SearchBar = (props) => {
  const { searchTerm, changeSearchterm } = props;

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e, data) => changeSearchterm(data.value)}
      />
    </Wrapper>
  );
};

export default SearchBar;
