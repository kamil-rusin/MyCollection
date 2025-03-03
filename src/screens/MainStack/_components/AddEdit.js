import React, { useLayoutEffect, useMemo } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { returnDetailsLabel, returnProperColor } from '../_utils/checkTypes';
import { Button, TextInput, Surface, Snackbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';

const AddEdit = props => {
  const {
    url,
    title,
    details,
    isLoading,
    isSnackbarVisible,
    imagePath,
    navigation,
    onDismissSnackbar,
    onSave,
    onTest,
    setDetails,
    setUrl,
    setTitle,
    snackbarText,
    urlLoading,
    type
  } = props;
  const primaryColor = returnProperColor(type);

  const theme = useMemo(() => {
    return {
      colors: {
        placeholder: primaryColor,
        primary: primaryColor,
        underlineColor: 'transparent'
      }
    };
  }, [primaryColor]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={isLoading || isSnackbarVisible}
          style={styles.saveButtonContainer}
          onPress={onSave}>
          <Text style={styles.saveButton}>SAVE</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, isLoading, onSave, isSnackbarVisible]);

  useFocusEffect(() => {
    StatusBar.setBackgroundColor(primaryColor, true);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={primaryColor} />
      {isLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={primaryColor} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Surface
              style={[styles.imageContainer, { borderColor: primaryColor }]}>
              <Image style={styles.image} source={imagePath} />
            </Surface>
            <TextInput
              theme={theme}
              style={styles.textInput}
              onChangeText={setTitle}
              mode="outlined"
              value={title}
              label="Title"
            />
            <TextInput
              theme={theme}
              style={styles.textInput}
              onChangeText={setDetails}
              mode="outlined"
              value={details}
              label={returnDetailsLabel(type)}
            />
            <View style={styles.row}>
              <TextInput
                theme={theme}
                style={styles.textInputRow}
                onChangeText={setUrl}
                mode="outlined"
                value={url}
                label="Image URL"
              />
              <Button
                compact={true}
                style={styles.testButton}
                color={primaryColor}
                loading={urlLoading}
                mode="contained"
                onPress={() => onTest(url)}>
                Test
              </Button>
            </View>
          </View>
        </ScrollView>
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
    flex: 1
  },
  image: {
    width: 100,
    height: 100
  },
  imageContainer: {
    margin: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.1,
    borderRadius: 1,
    width: 105,
    height: 105,
    elevation: 15
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  saveButton: {
    color: 'white'
  },
  saveButtonContainer: {
    marginRight: 15
  },
  snackbar: {
    bottom: 0,
    position: 'absolute'
  },
  testButton: {
    marginTop: 5,
    height: 57,
    alignContent: 'center',
    justifyContent: 'center'
  },
  textInput: {
    margin: 15
  },
  textInputRow: {
    marginRight: 12,
    width: '80%'
  }
});

export default AddEdit;
