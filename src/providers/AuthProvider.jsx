import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);

   };

   const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   // social login 
   const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };


   const logOut = () => {
      setLoading(true);
      return signOut(auth);
   };

   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         console.log("Current user in auth provider", currentUser);
         setLoading(false);
         if (currentUser && currentUser.email) {
            const loggedUser = {
               email: currentUser?.email
            };
            fetch('https://car-doctor-server-beryl-alpha.vercel.app/jwt', {
               method: 'POST',
               headers: {
                  'content-type': 'application/json'
               },
               body: JSON.stringify(loggedUser)
            })
               .then(res => res.json())
               .then(data => {
                  console.log('JWT response ', data);
                  // warning : local storage set is not the best (second best)
                  localStorage.setItem('car-doctor-access-token', data.token);
               });
         }
         else {
            localStorage.removeItem('car-doctor-access-token');
         }
      });
      return () => {
         return unSubscribe();
      };
   }, []);

   const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      googleSignIn,
      logOut,
   };

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;