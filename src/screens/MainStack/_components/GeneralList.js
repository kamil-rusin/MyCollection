import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemsList from './ItemsList';

const GeneralList = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ItemsList data={[]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default GeneralList;
