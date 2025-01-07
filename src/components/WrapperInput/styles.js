import styled from 'styled-components';

export const Container = styled.div`
   position: relative;
   margin: 21px 0;
   width: 100%;
   color: ${props => props.theme.colors.secondary_font};

   input {
      padding: 15px 13px;
      width: 100%;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.primary_font};
      border: 1px ${props => props.theme.colors.input_border} solid;
      border-radius: 7px;
      user-select: none;

      ::placeholder {
         color: ${props => props.theme.colors.primary};
      }

      :focus {
         border-color: #762FE3;
      }

      :focus + label {
         top: -13px;
         font-size: 1.03rem;
         color: #762FE3;
      }

      :not(:placeholder-shown) + label {
         top: -13px;
         font-size: 1.03rem;
      }
   }

   label {
      position: absolute;
      top: 14px;
      left: 15px;
      padding: 0 2px;
      font-size: 1.2rem;
      border-radius: 20px;
      user-select: none;
      z-index: 1;
   }

   label::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 100%;
      height: 16px;
      background: ${props => props.theme.colors.primary};
      transition: background-color .3s;
      z-index: -1;
   }

   span {
      display: block;
      margin-top: 5px;
      font-size: 1rem;
      color: ${props => props.theme.colors.error};
   }

   input.classErr, input.classErr:focus {
      border-color: ${props => props.theme.colors.error};

      :focus + label {
         color: ${props => props.theme.colors.error};
      }
   }

   input, label {
      &:disabled {
         opacity: .4;
      }
   }
`;
