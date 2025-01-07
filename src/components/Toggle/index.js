import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ThemesContext } from '../../contexts/theme';

// import { Container,  } from './styles';

import Switch from 'react-switch';

function Toggle() {
   const { colors, title } = useContext(ThemeContext);
   const { toggleTheme } = useContext(ThemesContext);
   
   return (
      <>
         <Switch
            onChange={toggleTheme}
            checked={title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            width={33}
            height={23}
            handleDiameter={17}
            offColor={colors.toggle}
            onColor={colors.toggle}
            activeBoxShadow={colors.primary_font}
         />
      </>
   );
}
   
export default Toggle;