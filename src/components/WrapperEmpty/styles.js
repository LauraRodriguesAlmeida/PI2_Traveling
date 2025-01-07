import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 55px 30px;
   width: 100%;
   background: ${props => props.theme.colors.primary};
   border-radius: 30px;

   div {
      margin-bottom: 23px;
      padding: 12px;
      width: 80px;
      height: 80px;
      background: ${props => props.theme.colors.secondary_font};
      border-radius: 50px;
   }

   p {
      font-size: 1.6rem;
      font-weight: 500;
      color: ${props => props.theme.colors.secondary_font};
   }

   span {
      font-size: 1.4rem;
      color: ${props => props.theme.colors.secondary_font};
   }
`;