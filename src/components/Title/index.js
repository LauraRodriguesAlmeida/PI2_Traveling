import React from 'react';

import { Container } from './styles';

function Title({ title }) {
   return (
      <Container>
         <h1>{title}</h1>
      </Container>
   );
}

export default Title;