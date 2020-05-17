import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GAME_COLOR } from '../../_constants/types';
import GamesScreen from './GamesList';
import GameDetailsScreen from './GameDetails';

const GamesScreensStack = createStackNavigator();

const GamesStack = () => {
  return (
    <GamesScreensStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GAME_COLOR
        },
        headerTintColor: 'white'
      }}>
      <GamesScreensStack.Screen name="Games" component={GamesScreen} />
      <GamesScreensStack.Screen name="Details" component={GameDetailsScreen} />
    </GamesScreensStack.Navigator>
  );
};

export default GamesStack;
