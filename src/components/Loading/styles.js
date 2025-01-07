import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from '../../styles/icons';

export const LoadIcon = styled(AiOutlineLoading3Quarters)`
   color: ${props => props.theme.colors.active_font};
   animation: rotation 1.1s ease infinite;

   @keyframes rotation {
      from {
         transform: rotate(0deg);
      }
      to {
         transform: rotate(359deg);
      }
   }
`;
