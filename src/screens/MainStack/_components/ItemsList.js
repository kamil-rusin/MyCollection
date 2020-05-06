import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SingleItem from './SingleItem';
import EmptyListComponent from './EmptyListComponent';

const ItemsList = props => {
  const {
    data,
    type,
    goToDetails,
    deleteItem
    // pending,
    // favouriteItems,
    // handleFavouriteItem,
    // onlyFavourites,
    // handleFavourites
  } = props;

  const renderItem = useCallback(
    ({ item }) => (
      <SingleItem
        item={item}
        type={type}
        onClicked={goToDetails}
        onLongPress={deleteItem}
        // handleFavouriteItem={handleFavouriteItem}
        // isFavourite={favouriteItems.includes(item.id)}
      />
    ),
    [deleteItem, goToDetails, type]
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
