import styled from 'styled-components';

export const Container = styled.button`
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   margin: 47px 0 20px;
   padding: 19px 0;
   font-size: 1.3rem;
   font-weight: bold;
   letter-spacing: 0.03rem;
   color: #f8f8f8;
   background: linear-gradient(90deg, #5311B9 0%, #762FE3 35%, #9C5AD9 100%);
   border: none;
   border-radius: 11px;
   cursor: pointer;

   > span {
      display: inline-block;
      margin-bottom: 2px;

      svg {
         margin-top: 3px;
         color: #fff;
         font-size: 1.6rem;
      }
   }

   &:hover {
      filter: brightness(1.2);
   }

   &:disabled {
      opacity: .3;

      &:hover {
         filter: none;
      }
   }
`;