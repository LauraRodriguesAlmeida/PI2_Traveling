import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { validateEmail, validatePassword } from '../../utils/regex';

import { Container, Wrapper, Logo, ImageLogo, Form, LoadWrapper } from './styles';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';
import logo from '../../assets/logo.svg';
import InputWrapper from '../../components/WrapperInput';
import Button from '../../components/Button';

function SignUp() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

   const [nameErr, setNameErr] = useState(false);
   const [emailErr, setEmailErr] = useState(false);
	const [passwordErr, setPasswordErr] = useState(false);

   const { signUp, loadingAuth } = useContext(AuthContext);

   const err = {
      from: {y: -10, opacity: 0, delay: 0},
      to: {y: 0, opacity: 1, transition: { duration: 0}}
   }

   const load = {
      from: {opacity: 0},
      to: {opacity: 1, transition: {duration: .3}}
   }

   let validate = false;

   
   function validadeSignUp() {
      if (name === '') {
         setPasswordErr(false);
         setEmailErr(false);

         setNameErr(true);
         validate = false;
         return;
      }
      else {
         setNameErr(false);
         validate = true;
      }

      if (email === '' || !validateEmail.test(email)) {
         setEmailErr(true);
         validate = false;
         return;
      }
      else {
         setEmailErr(false);
         validate = true;
      }

      if (password === '' || !validatePassword.test(password)) {
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
      validadeSignUp();

      if (validate) {
         signUp(name, email, password);
      }
   }
   

   return (
		<Container>
	  		<Wrapper>
				<Logo>
               <ImageLogo src={logo} alt='Hike Logo'/>
            </Logo>

				<Form onSubmit={handleSubmit}>
               <InputWrapper>
					   <input
                     type='text'
                     // defaultValue={name}
                     onChange={(e) => setName(e.target.value)}
                     autoComplete='off'
                     placeholder='Nome'
                     id='name'
                     className={nameErr ? 'classErr' : null}
                  />
                  <label htmlFor='name'>Nome</label>

                  {nameErr &&
                     <motion.span
                        variants={err}
                        initial='from'
                        animate='to'
                     >
                        Campo Nome obrigatório
                     </motion.span>
                  }
               </InputWrapper>
               
               <InputWrapper>
					   <input
                     type='text'
                     // defaultValue={email}
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
                        E-mail inválido. Digite novamente.
                     </motion.span>
                  }
               </InputWrapper>
               
               <InputWrapper>
					   <input
                     type='password'
                     // defaultValue={password}
                     onChange={(e) => setPassword(e.target.value)}
                     autoComplete='off'
                     placeholder='Senha'
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
                        A senha deve conter no mínimo 8 caracteres e uma letra.
                     </motion.span>
                  }
               </InputWrapper>

					<Button type='submit' span='Criar conta'/>
				</Form>

				<Link to='/'>Entrar</Link>
			</Wrapper>
         
         {loadingAuth && (
            <LoadWrapper
               variants={load}
               initial='from'
               animate='to'
            >
               <Loading />
               <span>Criando</span>
            </LoadWrapper>
         )}
		</Container>
  );
}

export default SignUp;