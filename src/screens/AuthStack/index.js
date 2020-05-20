import React, { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import Authorization from './Authorization';

const AuthorizationScreen = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState(false);

  const showSnackbar = useCallback(text => {
    setSnackbarText(text);
    setIsSnackbarVisible(true);
  }, []);

  const onDismissSnackbar = useCallback(() => {
    setIsSnackbarVisible(false);
  }, []);

  const createUser = useCallback(() => {
    setIsProcessing(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          showSnackbar('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          showSnackbar('That email address is invalid!');
        }

        showSnackbar('Unrecognized error!');
      });
    setIsProcessing(false);
  }, [email, password, showSnackbar]);

  const logInUser = useCallback(() => {
    setIsProcessing(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          showSnackbar('That password is wrong!');
        }

        if (error.code === 'auth/invalid-email') {
          showSnackbar('That email address is invalid!');
        }

        showSnackbar('Unrecognized error!');
      });
    setIsProcessing(false);
  }, [email, password, showSnackbar]);

  return (
    <Authorization
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      signIn={createUser}
      logInUser={logInUser}
      isProcessing={isProcessing}
      isSnackbarVisible={isSnackbarVisible}
      snackbarText={snackbarText}
      onDismissSnackbar={onDismissSnackbar}
    />
  );
};

export default AuthorizationScreen;
