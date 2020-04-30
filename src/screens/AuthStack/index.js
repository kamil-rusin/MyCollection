import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-community/google-signin';
import Authorization from './Authorization';
import { webClientId, androidClientId } from '../../config/routes';

const AuthorizationScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  // scopes: ['profile', 'email']
  const signIn = async () => {
    try {
      setIsSigninInProgress(true);
      GoogleSignin.configure({
        webClientId: webClientId,
        androidClientId: androidClientId,
        offlineAccess: true
      });
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      console.log('po signin' + idToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      console.log('it worked' + idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.warn(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setIsSigninInProgress(false);
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        setLoggedIn(false);
        await signIn();
      } else {
        // some other error
        setLoggedIn(false);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Authorization signIn={signIn} isSigninInProgress={isSigninInProgress} />
  );
};

export default AuthorizationScreen;
