import React, { useLayoutEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemsList from './ItemsList';
import { returnProperColor } from '../_utils/checkTypes';
import HeaderMenu from './HeaderMenu';

const GeneralList = props => {
  const primaryColor = returnProperColor(props.type);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <HeaderMenu />
    });
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {props.isLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={primaryColor} />
        </View>
      ) : (
        <>
          <ItemsList
            data={props.data}
            finishedItems={props.finishedItems}
            type={props.type}
            goToDetails={props.goToDetails}
            handleItemStatus={props.handleItemStatus}
            deleteItem={props.deleteItem}
          />
          <FAB
            style={[styles.fab, { backgroundColor: primaryColor }]}
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
