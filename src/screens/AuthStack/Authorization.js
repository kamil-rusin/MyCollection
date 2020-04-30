import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSigninButton } from '@react-native-community/google-signin';

const Authorization = props => {
  return (
    <SafeAreaView style={styles.container}>
      <GoogleSigninButton
        style={styles.googleSignInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={props.signIn}
        disabled={props.isSigninInProgress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  googleSignInButton: {
    width: 192,
    height: 48
  }
});

export default Authorization;
