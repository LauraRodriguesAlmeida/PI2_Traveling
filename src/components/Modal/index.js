import React from 'react';

import { Container, ContainerModal, Header, Title } from './styles';
// import { AnimatePresence } from 'framer-motion';

const shadow = {
   from: {opacity: 0},
   to: {opacity: 1, transition: { duration: .16}}
}

const modal = {
   from: {opacity: 0, scale: .89},
   to: {opacity: 1, scale: 1, transition: { duration: .16}}
}

function Modal({ title, children }) {
   return (
      <Container
         variants={shadow}
         initial='from'
         animate='to'
         exit={{opacity: 0, transition: { duration: .16}}}
      >
         <ContainerModal
            variants={modal}
            initial='from'
            animate='to'
            exit={{opacity: 0, scale: .89, transition: { duration: .16}}}
         >
            <Header>
               <Title>{title}</Title>
            </Header>

            {children}
         </ContainerModal>
      </Container>
   );
}

export default Modal;