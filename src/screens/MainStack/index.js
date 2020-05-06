import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/MaterialCommunityIcons';
import GamesStack from './Games';
import MoviesStack from './Movies';
import BooksStack from './Books';
import { BOOK_COLOR, GAME_COLOR, MOVIE_COLOR } from './_utils/constants';

const Tab = createMaterialBottomTabNavigator();

const CollectionTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="MoviesStack"
      labeled={false}
      shifting={true}>
      <Tab.Screen
        name="GamesStack"
        component={GamesStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIconsGlyphs name="xbox" color={color} size={26} />
          ),
          tabBarColor: GAME_COLOR
        }}
      />
      <Tab.Screen
        name="MoviesStack"
        component={MoviesStack}
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
        name="BooksStack"
        component={BooksStack}
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
