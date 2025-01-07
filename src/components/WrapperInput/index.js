import React from 'react';

import { Container } from './styles';

function WrapperInput({children}) {
   return (
      <Container>
         {children}
      </Container>
   );
}

export default WrapperInput;