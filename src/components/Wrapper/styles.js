import styled from 'styled-components';

export const Container = styled.div`
   position: relative;
   padding: 20px 8px 65px;
   
   @media (min-width: 425px) {
      margin-left: 73px;
      padding: 60px 30px;
   }

   @media (min-width: 1024px) {
      margin-left: 290px;
      padding: 60px 120px;
   }

   @media (min-width: 1440px) {
      margin-left: 420px;
      padding: 60px 150px;
   }

   @media (min-width: 1722px) {
      margin-left: 420px;
      padding: 60px 187px;
   }
`;

export const Content = styled.div`
   width: 100%; 
`;