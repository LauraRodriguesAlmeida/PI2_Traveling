import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background: rgb(0, 0, 0, 0.4);
   backdrop-filter: blur(3px);
   z-index: 100;

`;

export const ContainerModal = styled(motion.div)`
   position: fixed;
   padding: 25px 30px 35px;
   width: 95%;
   background: ${props => props.theme.colors.primary};
   border-radius: 30px;

   button {
      margin: 45px 0 0;
      padding: 11px 29px;
      font-size: 1.1rem;
      border-radius: 30px;
      
      &:disabled {
         cursor: not-allowed;
      }
   }

   @media (min-width: 425px) {
      margin-bottom: 0;
   }
   
   @media (min-width: 820px) {
      width: 700px;
      min-height: 500px;
   }
`;

export const Header = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 47px;
`;

export const Title = styled.span`
   margin-bottom: 3px;
   font-size: 1.6rem;
`;