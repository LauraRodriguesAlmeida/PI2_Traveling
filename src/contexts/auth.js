import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

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
         }

         setLoading(false);
      }

      loadStorage();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   //Delay de promisse
   function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }


   //Logando usuario
   async function signIn(email, password) {
      setLoadingAuth(true);

      await delay(800);
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
         let uid = value.user.uid;

         const userProfile = await firebase.firestore().collection('users')
         .doc(uid).get();

         let data = {
            uid: uid,
            avatarUrl: userProfile.data().avatarUrl,
            name: userProfile.data().name,
            email: value.user.email
         };

         setUser(data);
         storageUser(data);
         setLoadingAuth(false);
      })
      .catch((err) => {
         console.log(err);
         
         setAccess(true);
         setLoadingAuth(false);
      })
   }


   //Cadastrando novo usuario
   async function signUp(name, email, password) {
      setLoadingAuth(true);

      await delay(740);
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async (value) => {
         let uid = value.user.uid;

         await firebase.firestore().collection('users')
         .doc(uid).set({
            name: name,
            avatarUrl: null,
         })
         .then(() => {
            let data = {
               uid: uid,
               avatarUrl: null,
               name: name,
               email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
         })
      })
      .catch((error) => {
         console.log(error);
         setLoadingAuth(false);
      })
   }

   //Salvando localStorage
   function storageUser(data) {
      localStorage.setItem('Hike-UserSystem', JSON.stringify(data));
   }

   
   //Deslogando usuario
   async function signOut() {
      await firebase.auth().signOut();

      localStorage.removeItem('Hike-UserSystem');
      setUser(null);
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
            setAccess
      }}>
         {children}
      </AuthContext.Provider>
   );
}

export default AuthProvider;