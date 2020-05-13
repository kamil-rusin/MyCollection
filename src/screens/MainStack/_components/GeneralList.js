import React, { useLayoutEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemsList from './ItemsList';
import { returnProperColor } from '../_utils/checkTypes';
import HeaderMenu from './HeaderMenu';

const GeneralList = props => {
  const {
    type,
    setItemsStatus,
    navigation,
    isLoading,
    searchValue,
    setSearchValue,
    finishedItems,
    data,
    goToDetails,
    handleItemStatus,
    deleteItem
  } = props;
  const primaryColor = returnProperColor(props.type);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderMenu setItemsStatus={setItemsStatus} />
    });
  }, [setItemsStatus, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={primaryColor} />
        </View>
      ) : (
        <>
          <Searchbar
            placeholder={'Search title...'}
            value={searchValue}
            onChangeText={setSearchValue}
            iconColor={'#000'}
            style={[styles.searchBar, { borderColor: primaryColor }]}
          />
          <ItemsList
            data={data}
            finishedItems={finishedItems}
            type={type}
            goToDetails={goToDetails}
            handleItemStatus={handleItemStatus}
            deleteItem={deleteItem}
          />
          <FAB
            style={[styles.fab, { backgroundColor: primaryColor }]}
            icon="plus"
            onPress={() => goToDetails(null)}
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
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 0.1,
    marginBottom: 3,
    marginTop: 3,
    margin: 5,
    elevation: 5
  }
});

export default GeneralList;
