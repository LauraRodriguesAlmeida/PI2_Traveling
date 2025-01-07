import styled from 'styled-components';
import { RiSearchLine } from '../../styles/icons';

export const Container = styled.div`
   width: 100%;
`;

export const LabelSearch = styled.label`
   display: flex;
   flex-direction: row-reverse;
   align-items: center;
   padding: 0 25px;
   background: ${props => props.theme.colors.primary};
   border-radius: 50px;
   outline: 0;

   input {
      margin-bottom: 4px;
      width: 100%;
      height: 50px;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.primary_font};

      &::placeholder {
         color: ${props => props.theme.colors.secondary_font};
      }

      &:focus, &:focus + svg {
         fill: ${props => props.theme.colors.active_font};

         &::placeholder {
            color: ${props => props.theme.colors.active_font};
         }
      }
   }
`;

export const SearchIcon = styled(RiSearchLine)`
   margin-right: 13px;
   width: 23px;
   height: 23px;
   fill: ${props => props.theme.colors.secondary_font};
`;