import React from 'react';

import { Container, Content } from './styles';

function Wrapper({ children }) {
   return (
      <Container>
         <Content>
            {children}
         </Content>
      </Container>
   );
}

export default Wrapper;