import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loadingAuth, setLoadingAuth] = useState(false);
   const [loading, setLoading] = useState(true);

   const [access, setAccess] = useState(false);

   useEffect(() => {
      function loadStorage() {
         const storageUser = localStorage.getItem('Traveling-UserSystem');

         if (storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
         }

         setLoading(false);
      }

      loadStorage();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

}

export default AuthProvider;