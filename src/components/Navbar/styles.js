import styled, { css } from 'styled-components';
import { IoMapOutline, BsJournalText, MdLogout, RiArrowDownSFill, RiArrowDropUpLine } from '../../styles/icons';
import { motion } from 'framer-motion';

const flexColumnCSS = css`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const flexRowCSS = css`
   display: flex;
   flex-direction: row;
   align-items: center;
`;

const avatarCSS = css`
   display: flex;
   align-items: center;
   flex-shrink: 0;
   border-radius: 50px;
`;


export const Container = styled.div`
   position: fixed;
   bottom: 0;
   width: 100%;
   background: ${propps => propps.theme.colors.primary};
   z-index: 50;
   
   @media (min-width: 425px) {
      left: 0;
      width: auto;
      height: 100%;
   }
   
   @media (min-width: 1024px) {
      width: 290px;
   }

   @media (min-width: 1440px) {
      width: 420px;
   }
`;

export const Wrapper = styled.div`
   padding: 10px;
   width: 100%;

   @media (min-width: 425px) {
      padding: 45px 5px 25px;
      width: auto;
      height: 100%;
   }

   @media (min-width: 1440px) {
      padding: 45px 20px 25px;
   }
`;

export const Header = styled.header`
   display: flex;
   flex-direction: row-reverse;
   justify-content: space-between;
   
   @media (min-width: 425px) {
      flex-direction: column;
      height: 100%;
   }
`;

export const ContentTop = styled.div`
   ${flexRowCSS};
   width: 100%;

   @media (min-width: 425px) {
      ${flexColumnCSS};
   }
`;

export const Logo = styled.div`
   display: none;
   justify-content: center;
   align-items: center;
   margin-bottom: 25px;
   width: 80%;

   img:nth-child(1) {
      width: 33px;
   
      @media (min-width: 1024px) {
         margin-right: 7px;
         width: 42px;
      }

      @media (min-width: 1440px) {
         margin-right: 7px;
         width: 48px;
      }
   }

   img:nth-child(2) {
      display: none;
      margin-bottom: 7px;
      width: 104px;

      @media (min-width: 1024px) {
         display: inline;
      }

      @media (min-width: 1440px) {
         width: 118px;
      }
   }

   @media (min-width: 425px) {
      display: flex;
   }

   @media (min-width: 1024px) {
      justify-content: flex-start;
      margin-bottom: 30px;
      padding: 0 22px;
      width: 80%;
   }
`;

export const NavMenu = styled.nav`
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   width: 100%;

   a {
      display: inline-flex;
      align-items: center;
      color: ${props => props.theme.colors.primary_font};
      border-radius: 50px;

      &:hover {
         background: ${props => props.theme.colors.primary_item};
      }
   }

   a.is-active {
      color: ${props => props.theme.colors.active_font};
   }
   
   @media (min-width: 425px) {
      flex-direction: column;

      a {
         display: block;
         margin: 0 0 7px;
         padding: 15px;
      }

      a.is-active {
         font-weight: 500;
         color: ${props => props.theme.colors.active_font};
         background: ${props => props.theme.colors.primary_item};
      }
   }

   @media (min-width: 1024px) {
      width: 80%;
      
      a {
         padding: 8px 23px;
      }
   }
`;

export const NavItem = styled.div`
   display: flex;
   align-items: center;
   flex-shrink: 0;
   
   > span {
      display: none;
   }
   
   @media (min-width: 1024px) {
      padding: 9px 10px;
      
      > span {
         display: inline;
         margin: 0 18px 2px;
         font-size: 1.5rem;
      }
   }
`;

export const ContentBottom = styled.div`
   ${flexColumnCSS};
`;

export const DropUpMenu = styled(motion.div)`
   position: absolute;
   bottom: 83px;
   left: 7px;
   padding: 13px;
   width: 225px;
   background: ${props => props.theme.colors.primary_item};
   border-radius: 25px;
   box-shadow: 0px 12px 10px -8px rgba(0,0,0,0.15);
   
   @media (min-width: 425px) {
      bottom: 115px;
   }
   
   @media (min-width: 1024px) {
      position: inherit;
      margin-bottom: 30px;
      left: 20px;
      width: 80%;
   }
`;

export const ProfileDropUp = styled.div`
   ${flexRowCSS};
   margin-bottom: 16px;
   padding: 7px;
   border-radius: 15px;
   cursor: pointer;

   &:hover {
      background: ${props => props.theme.colors.secondary_item};
   }
`;

export const AvatarDropUp = styled.div`
   ${avatarCSS};
   margin-right: 8px;
   width: 52px;
   border-radius: 100%;
   overflow: hidden;

   @media (min-width: 1440px) {
      width: 62px;
   }
`;

export const User = styled.div`
   display: flex;
   flex-direction: column;

   > p {
      font-size: 1.1rem;
      color: ${props => props.theme.colors.primary_font};
   }

   > span {
      font-size: 1rem;
      color: ${props => props.theme.colors.secondary_font};
   }
`;

export const DropUpItem = styled.label`
   ${flexRowCSS};
   margin-bottom: 2px;
   padding: 6px 17px;
   border-radius: 15px;
   cursor: pointer;

   > div {
      margin-right: 14px;
   }

   > svg {
      margin-left: 4px;
      margin-right: 18px;
      transition: .0s;
   }

   > span {
      margin-bottom: 3px;
      font-size: 1.2rem;
      transition: .0s;
   }

   &:hover {
      background: ${props => props.theme.colors.secondary_item};
   }
`;

export const SpanDot = styled.div`
   position: relative;
   display: flex;
   justify-content: flex-start;
   width: 100%;

   @media (min-width: 1024px) {
      justify-content: center;
   }
`;

export const NavProfile = styled.button`
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 1.28rem;
   color: ${props => props.theme.colors.primary_font};
   background: ${props => props.theme.colors.primary};
   border-radius: 50px;

   span {
      display: none;
   }

   @media (min-width: 1024px) {
      padding: 15px 13px;
      width: 80%;
      background: ${props => props.theme.colors.primary_item};

      span {
         display: inline;
         margin-left: 0;
         font-size: 1.1rem;
      }
   }
`;

export const ProfileItem = styled.div`
   ${flexRowCSS};

   span {
      transition: .0s;
   }
`;

export const Avatar = styled.div`
   ${avatarCSS};
   width: 45px;
   height: 45px;
   border-radius: 100%;
   overflow: hidden;

   @media (min-width: 1024px) {
      margin-right: 8px;
   }
`;

export const AvatarImage = styled.img`
   width: 100%;
   border-radius: 100%;
   object-fit: cover;
`;

export const RoadMapIcon = styled(IoMapOutline)`
   flex-shrink: 0;
   width: 29px;
   height: 28px;
`;

export const NotesIcon = styled(BsJournalText)`
   flex-shrink: 0;
   width: 28px;
   height: 25px;
`;

export const ExitIcon = styled(MdLogout)`
   width: 25px;
   height: 25px;
`;

export const Dot = styled(RiArrowDownSFill)`
   position: absolute;
   bottom: -39px;
   width: 45px;
   height: 45px;
   fill: ${props => props.theme.colors.primary_item};
`;

export const ArrowMenu = styled(RiArrowDropUpLine)`
   display: none;
   width: 33px;
   height: 33px;
   flex-shrink: 0;
   transition: .0s;

   @media (min-width: 1024px) {
      display: inline;
   }
`;