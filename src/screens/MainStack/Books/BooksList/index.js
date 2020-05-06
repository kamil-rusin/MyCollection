import React, { useState, useEffect, useCallback } from 'react';
import GeneralList from '../../_components/GeneralList';
import { BOOK_TYPE } from '../../_utils/constants';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';

const BooksScreen = props => {
  const [books, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const goToDetails = useCallback(
    key => {
      props.navigation.navigate('Details', { key: key });
    },
    [props.navigation]
  );

  const deleteItem = useCallback((key, title) => {
    if (!key) return;
    Alert.alert(
      'Book',
      `Do you want to delete '${title}' permanently?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            database()
              .ref(`/books/${key}`)
              .remove();
          }
        }
      ],
      { cancelable: true }
    );
  }, []);

  useEffect(() => {
    const subscriber = database()
      .ref(`/books`)
      .on('value', snapshot => {
        let tempBooks = [];

        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;

          tempBooks.push(item);
        });

        setBooks(tempBooks);
        setIsLoading(false);
        console.log('Books data: ', tempBooks);
      });
    return () => subscriber();
  }, []);

  return (
    <GeneralList
      type={BOOK_TYPE}
      data={books}
      isLoading={isLoading}
      goToDetails={goToDetails}
      deleteItem={deleteItem}
    />
  );
};

export default BooksScreen;
