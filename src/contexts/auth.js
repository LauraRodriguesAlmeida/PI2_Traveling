import { useState, createContext, useEffect } from 'react';
import connection from '../services/sqlConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loadingAuth, setLoadingAuth] = useState(false);
   const [loading, setLoading] = useState(true);
   const [access, setAccess] = useState(false);

   useEffect(() => {
      function loadStorage() {
         const storageUser = localStorage.getItem('Hike-UserSystem');

         if (storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
         } else {
            setLoading(false);
         }
      }

      loadStorage();
   }, []);

   //Delay de promisse
   function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

   //Logando usuario
   async function signIn(email, senha) {
      setLoadingAuth(true);

      await delay(800);

      connection.query(
         'SELECT * FROM usuario WHERE email = ? AND senha = ?',
         [email, senha],
         (err, results) => {
            if (err) {
               console.error('Erro ao buscar usuário:', err);
               setLoadingAuth(false);
               setAccess(true);
               return;
            }

            if (results.length > 0) {
               const usuario = results[0];

               const data = {
                  uid: usuario.id,
                  foto: usuario.foto,
                  nome: usuario.nome,
                  email: usuario.email,
               };

               setUser(data);
               storageUser(data);
               setLoadingAuth(false);
            } else {
               console.log('Usuário não encontrado');
               setAccess(true);
               setLoadingAuth(false);
            }
         }
      );
   }

   //Cadastrando novo usuario
   async function signUp(nome, email, senha) {
      setLoadingAuth(true);

      await delay(740);

      connection.query(
         'INSERT INTO usuario (nome, email, senha, foto) VALUES (?, ?, ?, ?)',
         [nome, email, senha, null],
         (err, results) => {
            if (err) {
               console.error('Erro ao criar usuário:', err);
               setLoadingAuth(false);
               return;
            }

            const userId = results.insertId;

            const data = {
               uid: userId,
               foto: null,
               nome: nome,
               email: email,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
         }
      );
   }

   //Salvando localStorage
   function storageUser(data) {
      localStorage.setItem('Hike-UserSystem', JSON.stringify(data));
   }

   //Deslogando usuario
   async function signOut() {
      setUser(null);
      localStorage.removeItem('Hike-UserSystem');
   }

   return (
      <AuthContext.Provider
         value={{
            signed: !!user,
            user,
            loading,
            access,
            loadingAuth,
            signIn,
            signUp,
            signOut,
            setUser,
            storageUser,
            setAccess,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export default AuthProvider;
