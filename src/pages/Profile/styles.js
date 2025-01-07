import styled from 'styled-components';
import { TbCameraPlus } from '../../styles/icons';

export const Container = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
   
   @media (min-width: 425px) {
      display: block;
   }
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 30px;
   background: ${props => props.theme.colors.primary};
   border-radius: 30px;

   @media (min-width: 638px) {
      padding: 35px 70px;
   }
`;

export const ProfileForm = styled.form`
   display: flex;
   flex-direction: column;
   width: 100%;

   button {
      margin-top: 25px;
      margin-bottom: 0;
      padding: 0 19px;
      height: 50px;
      font-size: 1.1rem;
   }

   @media (min-width: 1200px) {
      width: 430px;
   }
`;

export const User = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding-bottom: 45px;
`;

export const LabelImage = styled.label`
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-bottom: 25px;
   width: 210px;
   height: 210px;
   border-radius: 100%;
   cursor: pointer;

   > svg {
      position: absolute;
      right: 10px;
      bottom: 5px;
      padding: 7px;
      width: 45px;
      height: 45px;
      color: ${props => props.theme.colors.text};
      background: ${props => props.theme.colors.primary_item};
      border-radius: 50px;
      transition: background-color .3s;
      z-index: 10;
   }

   > input {
      display: none;
   }

   > img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
   }

   &:hover img {
      box-shadow: 0px 12px 10px -8px rgba(0,0,0,0.45);
   }

   &:hover svg {
      background: ${props => props.theme.colors.secondary_item};
   }
`;

export const InfoUser = styled.div`
   text-align: center;

   p {
      margin-bottom: 4px;
      font-size: 1.5rem;
      font-weight: 500;
   }

   span {
      font-size: 1.2rem;
      color: ${props => props.theme.colors.secondary_font};
   }
`;

export const UpLoadIcon = styled(TbCameraPlus)`
   &:hover {
      background: ${props => props.theme.colors.secondary_item};
   }
`;