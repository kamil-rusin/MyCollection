import React, { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import Authorization from './Authorization';

const AuthorizationScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState(false);

  const createUser = useCallback(() => {
    setIsProcessing(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    setIsProcessing(false);
  }, [email, password]);

  const logInUser = useCallback(() => {
    setIsProcessing(true);
    auth()
      .signInWithEmailAndPassword(
        'sarah.lane@gmail.com',
        'SuperSecretPassword!'
      )
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          console.log('That password is wrong!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    setIsProcessing(false);
  }, []);

  return (
    <Authorization
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      signIn={createUser}
      logInUser={logInUser}
      isProcessing={isProcessing}
    />
  );
};

export default AuthorizationScreen;
