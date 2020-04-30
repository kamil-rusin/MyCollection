import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SingleItem from './SingleItem';
import EmptyListComponent from './EmptyListComponent';

const ItemsList = props => {
  const {
    // pending,
    data
    // favouriteItems,
    // handleFavouriteItem,
    // onlyFavourites,
    // handleFavourites
  } = props;

  const renderItem = useCallback(
    ({ item }) => (
      <SingleItem
        item={item}
        // handleFavouriteItem={handleFavouriteItem}
        // isFavourite={favouriteItems.includes(item.id)}
      />
    ),
    [
      // handleFavouriteItem,
      // favouriteItems
    ]
  );

  return (
    <>
      <FlatList
        data={data}
        numColumns={1}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyListComponent />}
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
