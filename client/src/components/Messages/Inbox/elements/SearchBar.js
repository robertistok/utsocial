import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 30px;
	order:-1;
`;

const SearchBar = props => (
  <Wrapper>
    <input type="text" placeholder="search" />
  </Wrapper>
);

export default SearchBar;
