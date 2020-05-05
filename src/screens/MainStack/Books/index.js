import React from 'react';
import GeneralList from '../_components/GeneralList';
import { BOOK_TYPE } from '../_utils/constants';

const BooksScreen = () => {
  return <GeneralList type={BOOK_TYPE} data={[]} />;
};

export default BooksScreen;
