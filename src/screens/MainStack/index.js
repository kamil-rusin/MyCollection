import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/MaterialCommunityIcons';
import GamesScreen from './Games';
import MoviesScreen from './Movies';
import BooksScreen from './Books';

const Tab = createMaterialBottomTabNavigator();

const CollectionTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Movies" labeled={false}>
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIconsGlyphs name="xbox" color={color} size={26} />
          )
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
          )
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
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default CollectionTabs;
