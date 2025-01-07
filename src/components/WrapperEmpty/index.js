import React from 'react';

import { Container } from './styles';

function WrapperEmpty({children}) {
   return (
      <Container>
         {children}
      </Container>
   );
}

export default WrapperEmpty;