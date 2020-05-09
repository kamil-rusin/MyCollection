import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MOVIE_COLOR } from '../_utils/constants';
import MoviesScreen from './MoviesList';
import MovieDetailsScreen from './MovieDetails';

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
      <MoviesScreensStack.Screen
        name="Details"
        component={MovieDetailsScreen}
      />
    </MoviesScreensStack.Navigator>
  );
};

export default MoviesStack;
