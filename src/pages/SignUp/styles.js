import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
	display: flex;
   justify-content: center;
	align-items: center;
   width: 600px;
	height: 100vh;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
   justify-content: center;
	align-items: center;
	padding: 40px;
	width: 100%;
   height: 100vh;
	background: ${props => props.theme.colors.primary};
	border-radius: 0;

	> a {
		font-size: 1.1rem;
      color: #762FE3;
      
      &:hover {
         text-decoration: underline;
      }
	}

   @media (min-width: 600px) {
	   padding: 0 77px;
      height: 700px;
   	border-radius: 25px;
   }
`;

export const Logo = styled.div`
   margin-bottom: 48px;
   width: 85%;

   @media (min-width: 590px) {
      width: 73%;
   }
`;

export const ImageLogo = styled.img`
   padding-right: 36px;
   width: 100%;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const LoadWrapper = styled(motion.div)`
   position: absolute;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   font-size: 4.5rem;
   background: ${props => props.theme.colors.secondary};
   z-index: 2;
   
   span {
      margin-top: 15px;
      font-size: 1.4rem;
      color: ${props => props.theme.colors.active_font};
   }
`;