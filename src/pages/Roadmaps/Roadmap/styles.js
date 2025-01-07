import styled, { css } from 'styled-components';
import { RiArrowDownSFill, IoMdClose, BsThreeDots, RiPencilFill, BsJournalText, BsCloudFill, MdOutlineMyLocation, HiOutlineTrash } from '../../../styles/icons';
import { motion } from 'framer-motion'

const icon = css`
   margin-right: 7px;
   width: 22px;
   height: 22px;
   color: ${props => props.theme.colors.secondary_font};
`;


export const Container = styled.div`
   width: 100%;
`;

export const Wrapper = styled.div`
   position: relative;
   height: 100vh;
   padding: 20px 8px 85px;

   @media (min-width: 425px) {
      margin-left: 73px;
      padding: 30px 60px;
   }

   @media (min-width: 1024px) {
      margin-left: 290px;
   }

   @media (min-width: 1440px) {
      margin-left: 420px;
   }

   @media (min-width: 1722px) {
      margin-left: 420px;
   }
`;

export const Content = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   height: 100%;
   background: ${props => props.theme.colors.primary};
   border-radius: 30px;
`;

export const RoadmapWrapper = styled.div`
   width: 35%;
   padding: 27px 9px;
   overflow-y: scroll;

   &::-webkit-scrollbar {
      width: 5px;
   }

   @media (min-width: 620px) {
      padding: 40px 26px;
   }
`;

export const Header = styled.div`
   margin-bottom: 49px;
   padding: 0 27px;
`;

export const TitleOpt = styled.div`
   position: relative;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 26px;
`;

export const MenuOptions = styled(motion.div)`
   position: absolute;
   top: 54px;
   right: -15px;
   display: flex;
   flex-direction: column;
   padding: 14px 10px;
   width: 245px;
   background: ${props => props.theme.colors.primary_item};
   border-radius: 15px;
   box-shadow: 0px 3px 13px -5px rgba(0,0,0,0.45);

   ${props => props.place && css`
      top: 42px;
      right: -10px;
      background: ${props => props.theme.colors.secondary_item};
   `}
`;

export const SpanDot = styled.div`
   position: relative;
   display: flex;
   justify-content: flex-start;
   width: 100%;
`;

export const Options = styled.div`
   display: flex;
   align-items: center;
   padding: 8px 12px;
   border-radius: 10px;
   cursor: pointer;

   &:hover {
      background: rgb(109, 119, 155, 0.24);
   }

   a {
      display: flex;
      align-items: center;
      color: inherit;

   
   }
   
   span {
      margin-bottom: 1px;
   }
`;

export const Title = styled.p`
   font-size: 1.6rem;
   font-weight: 500;
`;

export const Desc = styled.p`
   margin: 5px 0;
   font-size: 1.15rem;
   word-wrap: break-word;
`;

export const Created = styled.small`
   font-size: .9rem;
   color: ${props => props.theme.colors.secondary_font};
`;

export const Section = styled.div`
   margin-bottom: 10px;
   padding: 25px;
   background: ${props => props.theme.colors.primary_item};
   border-radius: 20px;
`;

export const TitleEmpty = styled.p`
   margin-bottom: 16px;
   font-size: 1.5rem;
   font-weight: 500;
   text-align: center;
   color: ${props => props.theme.colors.secondary_font};
`;

export const DescEmpty = styled.p`
   margin: 5px 0;
   font-size: 1.1rem;
   text-align: center;
   color: ${props => props.theme.colors.secondary_font};
`;

export const PlaceList = styled.div``;

export const Place = styled.div`
   margin-bottom: 18px;

   > div {
      min-height: 230px;
   }
`;

export const HeaderPlace = styled.div`
   position: relative;
   display: flex;
   justify-content: space-between;
`;

export const InfoPlace = styled.div`
   margin-bottom: 16px;
   
   span {
      font-size: .9rem;
      color: ${props => props.theme.colors.secondary_font};
   }
`;

export const TitlePlace = styled.p`
   font-size: 1.3rem;
   font-weight: 500;
`;

export const Obs = styled.p`
   margin: 15px 5px 5px;
   color: ${props => props.theme.colors.secondary_font};
   white-space: pre-wrap;
   word-wrap: break-word;
   line-height: 1.5rem;
`;

export const MapWrapper = styled.div`
   width: 65%;
   height: 100%;
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
   }
`;

export const OptionIcon = styled(BsThreeDots)`
   padding: 2px;
   width: 40px;
   height: 40px;
   color: ${props => props.theme.colors.secondary_font};
   border-radius: 50px;
   cursor: pointer;
   
   &:hover {
      background: rgb(109, 119, 155, 0.24);
   }

   ${props => props.place && css`
      width: 33px;
      height: 33px;
   `}
`;

export const Dot = styled(RiArrowDownSFill)`
   position: absolute;
   top: -34px;
   right: 0;
   width: 35px;
   height: 35px;
   fill: ${props => props.theme.colors.primary_item};
   transform: rotate(180deg);

   ${props => props.place && css`
      fill: ${props => props.theme.colors.secondary_item};
   `}
`;

export const NotesIcon = styled(BsJournalText)`
   margin-right: 10px;
   width: 19px;
   height: 19px;
   color: ${props => props.theme.colors.secondary_font};
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
   cursor: pointer;

   &:hover {
      background: rgb(109, 119, 155, 0.54);
   }
`;

export const EditIcon = styled(RiPencilFill)`
   ${icon};
`;

export const LocalIcon = styled(MdOutlineMyLocation)`
   ${icon};
`;

export const TrashIcon = styled(HiOutlineTrash)`
   ${icon};
`;

export const CloudIcon = styled(BsCloudFill)`
   ${icon};
`;