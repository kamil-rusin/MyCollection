import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BOOK_COLOR } from '../_utils/constants';
import BooksScreen from './BooksList';

const BooksScreensStack = createStackNavigator();

const BooksStack = () => {
  return (
    <BooksScreensStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: BOOK_COLOR
        },
        headerTintColor: 'white'
      }}>
      <BooksScreensStack.Screen name="Books" component={BooksScreen} />
    </BooksScreensStack.Navigator>
  );
};

export default BooksStack;
