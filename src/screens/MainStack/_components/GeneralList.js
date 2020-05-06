import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemsList from './ItemsList';
import { returnProperColor } from '../_utils/checkTypes';

const GeneralList = props => {
  return (
    <SafeAreaView style={styles.container}>
      {props.isLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            size={'large'}
            color={returnProperColor(props.type)}
          />
        </View>
      ) : (
        <>
          <ItemsList
            data={props.data}
            type={props.type}
            goToDetails={props.goToDetails}
          />
          <FAB
            style={styles.fab}
            small
            color={returnProperColor(props.type)}
            icon="plus"
            onPress={() => props.goToDetails(null)}
          />
        </>
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default GeneralList;
