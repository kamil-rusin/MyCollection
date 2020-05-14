import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Button,
  Snackbar,
  TextInput,
  Title
} from 'react-native-paper';
import { MOVIE_COLOR } from '../MainStack/_utils/constants';

const Authorization = props => {
  const {
    email,
    isProcessing,
    isSnackbarVisible,
    onDismissSnackbar,
    password,
    setEmail,
    setPassword,
    snackbarText,
    logInUser,
    signIn
  } = props;

  const primaryColor = MOVIE_COLOR;
  const theme = useMemo(() => {
    return {
      colors: {
        placeholder: primaryColor,
        primary: primaryColor,
        underlineColor: 'transparent'
      }
    };
  }, [primaryColor]);

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>MyCollection</Title>
      <TextInput
        theme={theme}
        disabled={isProcessing}
        style={styles.textInput}
        onChangeText={setEmail}
        mode="outlined"
        value={email}
        label="Email"
      />
      <TextInput
        secureTextEntry
        disabled={isProcessing}
        theme={theme}
        style={styles.textInput}
        onChangeText={setPassword}
        mode="outlined"
        value={password}
        label="Password"
      />
      <View style={styles.row}>
        <Button
          disabled={isProcessing}
          compact={true}
          style={styles.testButton}
          color={primaryColor}
          mode="contained"
          onPress={logInUser}>
          Login
        </Button>
        <Button
          disabled={isProcessing}
          compact={true}
          style={styles.testButton}
          color={primaryColor}
          mode="contained"
          onPress={signIn}>
          Sign in
        </Button>
      </View>

      {isProcessing ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={primaryColor}
        />
      ) : (
        <View style={styles.activityIndicatorPlaceHolder} />
      )}

      <Snackbar
        style={[styles.snackbar, { backgroundColor: primaryColor }]}
        duration={3000}
        visible={isSnackbarVisible}
        onDismiss={onDismissSnackbar}>
        {snackbarText}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    margin: 15
  },
  title: {
    margin: 15,
    color: MOVIE_COLOR,
    fontSize: 30
  },
  row: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  testButton: {
    width: '48%',
    margin: 5
  },
  activityIndicator: {
    margin: 15
  },
  activityIndicatorPlaceHolder: {
    margin: 27
  },
  snackbar: {
    margin: 15
  }
});

export default Authorization;
