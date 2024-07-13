import { signInWithEmailAndPassword, createUserWithEmailAndPassword ,sendEmailVerification} from "firebase/auth";
import { auth, db } from "./firbaseConfig";
import { storage } from "../mmkv";
import PropTypes from 'prop-types';
import { setDoc, doc,  } from "firebase/firestore";

export const handleLogin = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        storage.set('token', token);
        navigation.replace('Home');
        console.log(user);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

    handleLogin.propTypes = {
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    };

  export  const handleSignUp = ({email, password, setPassword, setEmail, navigation}) => {
        try {
          if (!email || !password || (!email && !password)) {
            throw new Error('Please fill all fields');
          }
    
          createUserWithEmailAndPassword(auth, email, password).then(
            userCredential => {
              console.log(userCredential);
              const user = userCredential._tokenResponse.email;
              const myUserUid = auth.user.uid;
    
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  // Email verification sent!
                  // ...
                })
                .catch(error => {
                  console.log(error);
                });
    
              setDoc(doc(db, 'users', `${myUserUid}`), {
                email: user,
                password: password,
              });
            },
          );
          setEmail('');
          setPassword('');
            navigation.replace('Home');
        } catch (error) {
          console.log(error);
        }
      };