import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/MaterialCommunityIcons';
import GamesScreen from './Games';
import MoviesScreen from './Movies';
import BooksScreen from './Books';
import { BOOK_COLOR, GAME_COLOR, MOVIE_COLOR } from './_utils/constants';

const Tab = createMaterialBottomTabNavigator();

const CollectionTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Movies" labeled={false} shifting={true}>
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIconsGlyphs name="xbox" color={color} size={26} />
          ),
          tabBarColor: GAME_COLOR
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIconsGlyphs
              name="library-movie"
              color={color}
              size={26}
            />
          ),
          tabBarColor: MOVIE_COLOR
        }}
      />
      <Tab.Screen
        name="Books"
        component={BooksScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIconsGlyphs
              name="library-books"
              color={color}
              size={26}
            />
          ),
          tabBarColor: BOOK_COLOR
        }}
      />
    </Tab.Navigator>
  );
};

export default CollectionTabs;
