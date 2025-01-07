import styled from 'styled-components';

export const Container = styled.div`
   position: relative;
   width: 100%;
   height: 100%;
   border-radius: 0 30px 30px 0;
   overflow: hidden;
   z-index: 1;
`;

export const SearchWrapper = styled.div`
   position: absolute;
   top: 10px;
   right: 10px;
   padding: 20px;
   background: ${props => props.theme.colors.primary};
   border-radius: 10px;
   z-index: 2;

   span {
      font-weight: 500;
      color: ${props => props.theme.colors.primary_font};
   }

   label {
      margin-top: 10px;
      padding: 0 30px 0 15px;
      background: ${props => props.theme.colors.primary_item};
      border-radius: 10px;
   }

   input {
      height: 45px;
      font-size: 1.1rem;
   }
`;
