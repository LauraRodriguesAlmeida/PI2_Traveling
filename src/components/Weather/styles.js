import styled, { css } from 'styled-components';
import { IoCloudOffline, HiArrowNarrowUp, HiArrowNarrowDown, ImDroplet, FaWind, MdWaves } from '../../styles/icons';

const iconCSS = css`
   margin-right: 19px;
   width: 20px;
   height: 20px;
`;


export const Container = styled.div`
   width: 100%;
`;

export const SearchForm = styled.form`
   margin-bottom: 37px;

   label {
      background: ${props => props.theme.colors.primary_item};
   }
`;

export const WeatherDiv = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 0 60px;
   
   @media (min-width: 690px) {
      flex-direction: row;
      margin-bottom: 60px;
   }
`;

export const WeatherData1 = styled.div`
   margin-bottom: 20px;
   color: ${props => props.theme.colors.secondary_font};

   p {
      margin-left: 10px;
      font-size: 8rem;
   }

   span {
      margin-left: 7px;
      font-size: 1.4rem;
      font-weight: 500;
   }

   @media (min-width: 690px) {
      margin-bottom: 0;
   }
`;

export const City = styled.div`
   font-size: 1.9rem; 
   color: ${props => props.theme.colors.tertiary_font};
`;

export const WeatherData2 = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 20px;
   color: ${props => props.theme.colors.secondary_font};
   
   .teste {
      font-weight: 600;
   }
`;

export const Sense = styled.div`
   margin-bottom: 10px;
   font-size: 1.5rem;
`;

export const MaxMin = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 25px;

   span {
      margin-right: 20px;
      font-size: 1.9rem;
      font-weight: 600;
   }
`;

export const Humidity = styled.div`
   margin-bottom: 19px;
   font-size: 1.3rem;
`;

export const Wind = styled.div`
   margin-bottom: 19px;
   font-size: 1.3rem;
`;

export const Pressure = styled.div`
   margin-bottom: 19px;
   font-size: 1.3rem;
`;

export const WeatherError = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   text-align: center;
   background: ${props => props.theme.colors.primary};
   z-index: 2;

   p {
      font-size: 1.5rem;
      color: ${props => props.theme.colors.secondary_font};
   }
`;

export const CloudErrIcon = styled(IoCloudOffline)`
   padding: 10px;
   width: 130px;
   height: 130px;
   color: ${props => props.theme.colors.secondary_font};
   border-radius: 100px;
`;

export const MaxIcon = styled(HiArrowNarrowUp)`
   margin-right: 7px;
   width: 31px;
   height: 31px;
`;

export const MinIcon = styled(HiArrowNarrowDown)`
   margin-right: 7px;
   width: 31px;
   height: 31px;
`;

export const HumIcon = styled(ImDroplet)`
   ${iconCSS};
`;

export const WinIcon = styled(FaWind)`
   ${iconCSS};
`;

export const PressIcon = styled(MdWaves)`
   margin-right: 19px;
   width: 20px;
   height: 20px;
   transform: rotate(90deg);
   z-index: 1;
`;