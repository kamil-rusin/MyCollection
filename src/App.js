import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import configureStore from './redux/Store';
import MainAppScreen from './screens/MainStack';
import AuthorizationScreen from './screens/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

const store = configureStore();

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const isLoggedIn = false;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="MyCollection" component={MainAppScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={AuthorizationScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
