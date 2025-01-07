import React from 'react';
import { Container } from './styles';

function Button({ children, span, disabled }) {
   return (
      <Container disabled={disabled}>
         {children}

         <span>{span}</span>
      </Container>
   );
}

export default Button;