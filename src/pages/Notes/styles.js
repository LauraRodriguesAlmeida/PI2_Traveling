import styled, { css } from 'styled-components';
import { BsPlusLg, TbNoteOff, IoMdClose, RiPencilFill, HiOutlineTrash } from '../../styles/icons';
import { motion } from 'framer-motion';

const iconCSS = css`
   padding: 4px;
   border-radius: 50px;
   flex-shrink: 0;
   cursor: pointer;

   &:hover {
      background: rgb(109, 119, 155, 0.24);
   }
`;


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

export const NoteList = styled(motion.div)`
   column-count: 1;
   
   @media (min-width: 805px) {
      column-count: 2;
      column-gap: 2rem;
   }
   
   @media (min-width: 1024px) {
      column-count: 1;
   }

   @media (min-width: 1143px) {
      column-count: 2;
      column-gap: 1.2rem;
   }

   @media (min-width: 1440px) {
      column-count: 2;
      column-gap: 2rem;
   }
`;

export const Note = styled(motion.div)`
   background: ${props => props.theme.colors.primary};
   border-radius: 30px;
   break-inside: avoid-column;
`;

export const NoteContent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   margin-bottom: 18px;
   padding: 40px;
   min-height: 300px;

   p {
      margin-bottom: 10px;
      font-size: 1.68rem;
      font-weight: 500; 
   }

   span {
      font-size: 1.2rem;
      color: ${props => props.theme.colors.secondary_font};
      white-space: pre-wrap;
      word-wrap: break-word;
   }

   @media (min-width: 425px) {
      margin-bottom: 2rem;
   }
`;

export const NoteFooter = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: center;
   margin-top: 35px;
   color: ${props => props.theme.colors.secondary_font};

   span {
      margin-right: 15px;
      font-size: 1rem;
   }
`;

export const NoteForm = styled.form`
   hr {
      margin: 25px 10px;
      height: 0.7px;
      background: ${props => props.theme.colors.input_border};
   }
   
   input {
      padding: 0 10px;
      width: 100%;
      font-size: 1.5rem;
      color: ${props => props.theme.colors.primary_font};
      
      &::placeholder {
         color: ${props => props.theme.colors.secondary_font};
      }
   }

   textarea {
      padding: 0 15px;
      width: 100%;
      height: 280px;
      font-size: 1.2rem;
      color: ${props => props.theme.colors.primary_font};
      resize: none;

      &::placeholder {
         color: ${props => props.theme.colors.secondary_font};
      }

      @media (min-width: 425px) {
         height: 330px;
      }
   }

   input:focus, textarea:focus {

      &::placeholder {
         color: ${props => props.theme.colors.active_font};
      }
   }

   @media (min-width: 425px) {
      margin-top: 0;
   }
   
`;

export const PlusIcon = styled(BsPlusLg)`
   margin-right: 6px;
   flex-shrink: 0;
   cursor: pointer;
`;

export const NotesOffIcon = styled(TbNoteOff)`
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

export const EditIcon = styled(RiPencilFill)`
   ${iconCSS};
   margin-right: 4px;
   width: 28px;
   height: 28px;
`;

export const TrashIcon = styled(HiOutlineTrash)`
   ${iconCSS};
   width: 30px;
   height: 30px;
`;