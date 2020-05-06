import React, { useState, useEffect } from 'react';
import GeneralList from '../../_components/GeneralList';
import { BOOK_TYPE } from '../../_utils/constants';
import database from '@react-native-firebase/database';

const BooksScreen = () => {
  const [books, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return <GeneralList type={BOOK_TYPE} data={books} isLoading={isLoading} />;
};

export default BooksScreen;
