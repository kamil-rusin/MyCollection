import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemsList from './ItemsList';

const GeneralList = props => {
  return (
    <SafeAreaView style={styles.container}>
      {props.isLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={'#007AFF'} />
        </View>
      ) : (
        <ItemsList data={props.data} type={props.type} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GeneralList;
