import React, { useState, useEffect, useCallback, useMemo } from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import GeneralList from '../../_components/GeneralList';
import {
  ALL_ITEMS,
  BOOK_TYPE,
  NOT_FINISHED,
  ONLY_FINISHED
} from '../../_utils/constants';

const BooksScreen = props => {
  const userId = auth().currentUser.uid;
  const [books, setBooks] = useState(null);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [booksStatus, setBooksStatus] = useState(ALL_ITEMS);
  const [searchValue, setSearchValue] = useState('');

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

  const pushBookToFinished = useCallback(
    itemKey => {
      try {
        database()
          .ref(`/favourites/${userId}/books`)
          .update({ [itemKey]: itemKey });
      } catch (err) {
        console.warn('Error while pushing to finished.');
      }
    },
    [userId]
  );

  const removeBookFromFinished = useCallback(
    itemKey => {
      try {
        database()
          .ref(`/favourites/${userId}/books/${itemKey}`)
          .remove();
      } catch (err) {
        console.warn('Error while removing from finished.');
      }
    },
    [userId]
  );

  const handleItemStatus = useCallback(
    (isFinished, itemKey) => {
      isFinished
        ? removeBookFromFinished(itemKey)
        : pushBookToFinished(itemKey);
    },
    [pushBookToFinished, removeBookFromFinished]
  );

  useEffect(() => {
    const subscriber = database()
      .ref(`/books`)
      .on('value', snapshot => {
        try {
          let tempBooks = [];

          snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;

            tempBooks.push(item);
          });

          setBooks(tempBooks);
          console.log('Books data: ', tempBooks);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = database()
      .ref(`/favourites/${userId}/books`)
      .on('value', snapshot => {
        try {
          let tempFinishedBooks = [];

          snapshot.forEach(childSnapshot => {
            tempFinishedBooks.push(childSnapshot.key);
          });

          setFinishedBooks(tempFinishedBooks);
          console.log('Finished books data: ', tempFinishedBooks);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      });
    return () => subscriber();
  }, [userId]);

  const data = useMemo(() => {
    if (booksStatus === ONLY_FINISHED) {
      let result = books.filter(book => finishedBooks.includes(book.key));
      searchValue &&
        (result = result.filter(book =>
          book.title.toLowerCase().includes(searchValue.toLowerCase())
        ));
      return result;
    } else if (booksStatus === NOT_FINISHED) {
      let result = books.filter(book => !finishedBooks.includes(book.key));
      searchValue &&
        (result = result.filter(book =>
          book.title.toLowerCase().includes(searchValue.toLowerCase())
        ));
      return result;
    }
    return searchValue
      ? books.filter(book =>
          book.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : books;
  }, [finishedBooks, books, booksStatus, searchValue]);

  return (
    <GeneralList
      type={BOOK_TYPE}
      data={data}
      finishedItems={finishedBooks}
      isLoading={isLoading}
      goToDetails={goToDetails}
      handleItemStatus={handleItemStatus}
      deleteItem={deleteItem}
      navigation={props.navigation}
      setItemsStatus={setBooksStatus}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};

export default BooksScreen;
