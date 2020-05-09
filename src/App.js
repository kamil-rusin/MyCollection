import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './redux/Store';
import AuthorizationScreen from './screens/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import CollectionTabs from './screens/MainStack';

const store = configureStore();

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const isLoggedIn = false;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}>
            {!isLoggedIn ? (
              <Stack.Screen name="MyCollection" component={CollectionTabs} />
            ) : (
              <Stack.Screen name="Login" component={AuthorizationScreen} />
            )}
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
