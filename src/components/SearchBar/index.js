import React from 'react';

import { Container, LabelSearch, SearchIcon } from './styles';

function SearchBar({ children }) {
   return (
      <Container>
         <LabelSearch>
            {children}
            
            <SearchIcon />
         </LabelSearch>
      </Container>
   );
}

export default SearchBar;