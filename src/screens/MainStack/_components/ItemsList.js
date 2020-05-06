import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SingleItem from './SingleItem';
import EmptyListComponent from './EmptyListComponent';

const ItemsList = props => {
  const {
    data,
    type
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
        // handleFavouriteItem={handleFavouriteItem}
        // isFavourite={favouriteItems.includes(item.id)}
      />
    ),
    [
      type
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
        keyExtractor={item => item.key}
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
