import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { Container, Wrapper, Logo, SpanErr, ImageLogo, Form, LoadWrapper } from './styles';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';
import logo from '../../assets/logo.svg';
import InputWrapper from '../../components/WrapperInput';
import Button from '../../components/Button';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

   const [emailErr, setEmailErr] = useState(false);
	const [passwordErr, setPasswordErr] = useState(false);

   const { signIn, loadingAuth, access, setAccess } = useContext(AuthContext);

   const err = {
      from: {y: -10, opacity: 0, delay: 0},
      to: {y: 0, opacity: 1, transition: {duration: 0}}
   }

   const load = {
      from: {opacity: 0},
      to: {opacity: 1, transition: {duration: .3}}
   }

   let validate = false;


   useEffect(() => {
      setAccess(false);
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   function validadeSignIn() {

      if (email === '') {
         setEmailErr(true);
         validate = false;
         return;
      }
      else {
         setEmailErr(false);
         validate = true;
      }

      if (password === '') {
         setPasswordErr(true);
         validate = false;
         return;
      }
      else {
         setPasswordErr(false);
         validate = true;
      }

   }

   function handleSubmit(e) {
      e.preventDefault();
      validadeSignIn();
      
      if (validate) {
         signIn(email, password);
      }
   }

   
   return (
		<Container>
	  		<Wrapper>
				<Logo>
               <ImageLogo src={logo} alt='Hike Logo'/>
            </Logo>

            {access && <SpanErr>Email ou senha incorretos. Tente novamente.</SpanErr>}

				<Form onSubmit={handleSubmit}>
               <InputWrapper>
                  <input
                     type='text'
                     onChange={(e) => setEmail(e.target.value)}
                     autoComplete='off'
                     placeholder='Email'
                     id='email'
                     className={emailErr ? 'classErr' : null}
                  />
                  <label htmlFor='email'>Email</label>

                  {emailErr &&
                     <motion.span
                        variants={err}
                        initial='from'
                        animate='to'
                     >
                        Preencha com seu email.
                     </motion.span>
                  }
               </InputWrapper>

               <InputWrapper>
					   <input
                     type='password'
                     onChange={(e) => setPassword(e.target.value)}
                     autoComplete='off'
                     placeholder='Password'
                     id='password'
                     className={passwordErr ? 'classErr' : null}
                  />
                  <label htmlFor='password'>Senha</label>

                  {passwordErr &&
                     <motion.span
                        variants={err}
                        initial='from'
                        animate='to'
                     >
                        Preencha com sua senha.
                     </motion.span>
                  }
               </InputWrapper>

					<Button type='submit' span='Entrar' />
				</Form>

				<Link to='/signup'>Criar uma conta</Link>
			</Wrapper>

         {loadingAuth && (
            <LoadWrapper
               variants={load}
               initial='from'
               animate='to'
            >
               <Loading />
               <span>Entrando</span>
            </LoadWrapper>
         )}
		</Container>
  );
}

export default SignIn;