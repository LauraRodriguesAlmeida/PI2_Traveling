import styled from 'styled-components';
import { BsPlusLg, IoMdClose, TbMapPinOff, HiOutlineTrash } from '../../styles/icons';
import { motion } from 'framer-motion';

export const Container = styled.div`
   width: 100%;
`;

export const SearchForm = styled.form`
   display: flex;
   flex-direction: row;
   align-items: center;
   margin-bottom: 27px;

   button {
      margin: 0 0 0 13px;
      padding: 0 19px;
      height: 50px;
      font-size: 1.1rem;
      border-radius: 30px;
   }
`;

export const LoadWrapper = styled.div`
   position: absolute;
   right: 0;
   left: 0;
   display: flex;
   justify-content: center;
   padding: 30px 0;
   font-size: 2rem;
`;

export const RoadMList = styled(motion.div)`
   column-count: 1;
   column-gap: 2rem;
   
   a {
      min-height: 310px;
      color:  ${props => props.theme.colors.primary_font};
   }

   @media (min-width: 805px) {
      column-count: 2;
   }
   
   @media (min-width: 1024px) {
      column-count: 1;
   }

   @media (min-width: 1143px) {
      column-count: 2;
   }
`;

export const Roadmap = styled(motion.div)`
   position: relative;
   background: ${props => props.theme.colors.primary};
   border-radius: 30px;
   break-inside: avoid-column;

   &:hover {
      -webkit-box-shadow: -2px 9px 11px -8px ${props => props.theme.colors.shadow};
      box-shadow: -2px 9px 11px -8px ${props => props.theme.colors.shadow};
   }
`;

export const RoadmapContent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   margin-bottom: 18px;
   padding: 40px 30px 30px;
   min-height: 225px;

   p {
      margin-bottom: 10px;
      font-size: 1.55rem;
      font-weight: 500;
   }
   
   span {
      font-size: 1.05rem;
      color: ${props => props.theme.colors.secondary_font};
      word-wrap: break-word;
   }

   @media (min-width: 425px) {
      margin-bottom: 1.6rem;
   }
`;

export const RoadmapFooter = styled.div`
   display: flex;
   justify-content: flex-end;
   margin-top: 10px;
   margin-right: 33px;

   span {
      margin-right: 15px;
      font-size: 0.96rem;
   }
`;

export const RoadmapForm = styled.form`
   p {
      padding-bottom: 15px;
      font-size: 1.1rem;
   }
   
   input, textarea {
      margin-bottom: 40px;
      padding: 10px 13px 12px;
      width: 100%;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.secondary_font};
      border: 1px ${props => props.theme.colors.input_border} solid;
      border-radius: 7px;
      resize: none;

      &::placeholder {
         color: ${props => props.theme.colors.secondary_font};
      }

      &:focus {
         border-color: #762FE3;
      }
   }

   textarea {
      margin-bottom: 0;
      height: 150px;
   }
`;

export const PlusIcon = styled(BsPlusLg)`
   margin-right: 6px;
   flex-shrink: 0;
   cursor: pointer;
`;

export const MapsOffIcon = styled(TbMapPinOff)`
   width: 100%;
   height: 100%;
   color: ${props => props.theme.colors.primary};
`;

export const CloseIcon = styled(IoMdClose)`
   position: absolute;
   top: 25px;
   right: 30px;
   padding: 5px;
   width: 35px;
   height: 35px;
   background: rgb(109, 119, 155, 0.34);
   border-radius: 50px;
   flex-shrink: 0;
   cursor: pointer;

   &:hover {
      background: rgb(109, 119, 155, 0.54);
   }
`;

export const TrashIcon = styled(HiOutlineTrash)`
   position: absolute;
   right: 37px;
   bottom: 25px;
   padding: 4px;
   width: 30px;
   height: 30px;
   color: ${props => props.theme.colors.secondary_font};
   border-radius: 50px;
   flex-shrink: 0;
   cursor: pointer;

   &:hover {
      background: rgb(109, 119, 155, 0.24);
   }
`;