import { useState, useEffect, createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

export const ThemesContext = createContext({});

export const AppTheme = ({children}) => {
   const [theme, setTheme] = usePersistedState('Hike-UserTheme', dark);

   function toggleTheme() {
      setTheme(theme.title === 'light' ? dark : light);
   };

   function usePersistedState(key, inititalState) {
      const [state, setState] = useState(() => {
         const storageTheme = localStorage.getItem(key);

         if (storageTheme) {
            return JSON.parse(storageTheme);
         }
         else {
            return inititalState;
         }
      });

      useEffect(() => {
         localStorage.setItem(key, JSON.stringify(state))
         
      }, [key, state])

      return [state, setState];
   }

   return (
      <ThemesContext.Provider value={{toggleTheme}}>
         <ThemeProvider theme={theme}>
            {children}
         </ThemeProvider>
      </ThemesContext.Provider>
   );
}

export default ThemeProvider;