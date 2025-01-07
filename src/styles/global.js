import { createGlobalStyle } from 'styled-components';
import imgMap from '../assets/logo-mobile.svg'

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      -webkit-transition: background-color .3s;
      -moz-transition: background-color .3s;
      -o-transition: background-color .3s;
      -ms-transition: background-color .3s;
      transition: background-color .3s, box-shadow .3s;

      h1, p, span, small, svg, img, input, label, button, ::placeholder, textarea  {
         transition: .3s;
      }
   }

   html, body, #root {
      max-width: 100%;
      width: 100%;
      max-height: 100%;
      height: 100%;
      color: ${props => props.theme.colors.primary_font};
      background-color: ${props => props.theme.colors.secondary};


      //Autocomplete
      .pac-container.pac-logo {
         position: absolute !important;
         right: 70px !important;
         left: unset !important;
         width: 320px !important;
         margin-top: 10px;
         padding: 10px 0;
         background: ${props => props.theme.colors.primary};
         border: none;
         border-radius: 0 0 15px 15px;
      }

      .pac-item-query {
         font-size: 1rem;
         color: ${props => props.theme.colors.primary_font};
      }

      .pac-item {
         margin-bottom: 10px;
         padding: 14px 20px;
         font-size: 0.9rem;
         color: ${props => props.theme.colors.secondary_font};
         border: none;
         transition: .2s;
         cursor: pointer;

      }
      
      .pac-item:hover, .pac-item-selected:hover, .pac-item-selected {
         padding-left: 23px;
         background: ${props => props.theme.colors.primary_item};
      }

      .pac-matched { transition: 0s; }

      .pac-icon, .pac-marker, .pac-item-selected .pac-icon-marker {
         background: url(${imgMap}) no-repeat 0;
         background-size: cover;
         width: 20px;
      }

      .pac-logo:after {
         content: "";
         display: none;
      }

      .hdpi.pac-logo:after {
         display: none;
      }
      

      //Toastify msg
      .toast-success, .toast-edit, .toast-fail {
         font-weight: 500;
         color: ${props => props.theme.colors.primary_font};
         background: ${props => props.theme.colors.primary_item};
      }

      .toast-success  {border-left: 4px #33DFA1 solid; }
      .toast-edit    { border-left: 4px #9784ff solid; }
      .toast-fail    { border-left: 4px #DE3333 solid; }


      //Scrollbar
      ::-webkit-scrollbar {
         width: 11px;
         transition: background-color .8s;
      }

      ::-webkit-scrollbar-thumb {
         background: ${props => props.theme.colors.scrollbar};
      }
      
      ::-webkit-scrollbar-thumb:hover {
         background: ${props => props.theme.colors.scrollbar_hover};
      }
   }

   #root {
      display: flex;
      justify-content: center;
   }

   *, button, input {
      background: none;
      border: 0;
      font-family: -apple-system, system-ui, sans-serif;
      outline: none;
   }

   button {
      cursor: pointer;
   }

   a {
      text-decoration: none;
   }

   small {
      color: ${props => props.theme.colors.secondary_font};
   }

   textarea, div {
      &::-webkit-scrollbar {
         width: 7px;
         transition: background-color .8s;
      }

      &::-webkit-scrollbar-thumb {
         background: ${props => props.theme.colors.scrollbar};
      }
   
      &::-webkit-scrollbar-thumb:hover {
         background: ${props => props.theme.colors.scrollbar_hover};
      }
   }
`;