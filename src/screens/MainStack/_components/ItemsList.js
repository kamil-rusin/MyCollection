import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SingleItem from './SingleItem';
import EmptyListComponent from './EmptyListComponent';

const ItemsList = props => {
  const {
    data,
    finishedItems,
    type,
    goToDetails,
    deleteItem
    // handleFavouriteItem,
  } = props;

  const renderItem = useCallback(
    ({ item }) => (
      <SingleItem
        item={item}
        type={type}
        onClicked={goToDetails}
        onLongPress={deleteItem}
        // handleFavouriteItem={handleFavouriteItem}
        isFinished={finishedItems && finishedItems.includes(item.key)}
      />
    ),
    [deleteItem, finishedItems, goToDetails, type]
  );

  return (
    <>
      <FlatList
        data={data}
        numColumns={1}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        ListEmptyComponent={<EmptyListComponent type={type} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'stretch'
  }
});

export default ItemsList;
