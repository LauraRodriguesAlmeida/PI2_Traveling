import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/auth';
import { NavLink } from 'react-router-dom';

import { Container, Wrapper, Header, ContentTop, Logo, NavMenu, NavItem, RoadMapIcon, NotesIcon, ContentBottom, DropUpMenu, ProfileDropUp, AvatarDropUp, NavProfile, ProfileItem, Avatar, AvatarImage, User, DropUpItem, SpanDot, Dot, ExitIcon, ArrowMenu } from './styles';
import { AnimatePresence } from 'framer-motion';

import Toggle from '../Toggle';
import logoMob from '../../assets/logo-mobile.svg';
import logoLet from '../../assets/logo-letters.svg';
import avatar from '../../assets/avatar.png';

function Navbar() {
   const { user } = useContext(AuthContext);
   const { signOut } = useContext(AuthContext);

   const [isOpen, setIsOpen] = useState(false);

   const dropup = {
      from: {y: 20, opacity: 0},
      to: {y: 0, opacity: 1, transition: {duration: .15}}
   }

   let menuRef = useRef();

   
   useEffect(() => {
      function handleToggleModalProfile() {
         const handler = (e) => {
            if (menuRef?.current && !menuRef.current.contains(e.target)) {
               setIsOpen(false);
            }
         };
         document.addEventListener('mousedown', handler);

         return () => {
            document.removeEventListener('mousedown', handler);
         }
      }

      handleToggleModalProfile();

   }, [setIsOpen, menuRef]);


   return (
      <Container>
         <Wrapper>
            <Header>
               <ContentTop>
                  <Logo>
                     <img src={logoMob} alt='Hike logo mobile' />
                     <img src={logoLet} alt='Hike loogo' />
                  </Logo>

                  <NavMenu>
                     <NavLink to='/roadmaps' activeClassName="is-active">
                        <NavItem>
                           <RoadMapIcon />
                           <span>Roteiros</span>
                        </NavItem>
                     </NavLink>

                     <NavLink to='/notes' activeClassName="is-active">
                        <NavItem>
                           <NotesIcon />
                           <span>Anotações</span>
                        </NavItem>
                     </NavLink>
                  </NavMenu>
               </ContentTop>

               <ContentBottom ref={menuRef}>
                  <AnimatePresence>
                     {isOpen && (
                        <DropUpMenu
                           variants={dropup}
                           initial='from'
                           animate='to'
                           exit={{y: 20, opacity: 0, transition: {duration: .12}}}
                        >
                           <NavLink to='/profile' activeClassName="is-active">
                              <ProfileDropUp>
                                 <AvatarDropUp>
                                    <AvatarImage src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='Foto perfil Hike' />
                                 </AvatarDropUp>
                                 <User>
                                    <p>{user.name}</p>
                                    <span>Meu perfil</span>
                                 </User>
                              </ProfileDropUp>
                           </NavLink>

                           <DropUpItem htmlFor={Toggle}>
                              <Toggle />
                              <span>Tema</span>
                           </DropUpItem>

                           <DropUpItem onClick={() => signOut()}>
                              <ExitIcon />
                              <span>Sair</span>
                           </DropUpItem>

                           <SpanDot>
                              <Dot />
                           </SpanDot>
                        </DropUpMenu>
                     )}
                  </AnimatePresence>

                  <NavProfile onClick={() => setIsOpen(!isOpen)}>
                     <ProfileItem>
                        <Avatar>
                           <AvatarImage src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='Foto perfil Hike' />
                        </Avatar>
                        <span>{user.name}</span>
                     </ProfileItem>

                     <ArrowMenu />
                  </NavProfile>
               </ContentBottom>
            </Header>
         </Wrapper>
      </Container>
   );
}

export default Navbar;