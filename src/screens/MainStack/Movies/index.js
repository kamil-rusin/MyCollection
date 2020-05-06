import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MOVIE_COLOR } from '../_utils/constants';
import MoviesScreen from './MoviesList';

const MoviesScreensStack = createStackNavigator();

const MoviesStack = () => {
  return (
    <MoviesScreensStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: MOVIE_COLOR
        },
        headerTintColor: 'white'
      }}>
      <MoviesScreensStack.Screen name="Movies" component={MoviesScreen} />
    </MoviesScreensStack.Navigator>
  );
};

export default MoviesStack;
