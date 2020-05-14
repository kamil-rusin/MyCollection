import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import configureStore from './redux/Store';
import AuthorizationScreen from './screens/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import CollectionTabs from './screens/MainStack';

const store = configureStore();

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [user, setUser] = useState(null);

  const onAuthStateChanged = userReceived => {
    setUser(userReceived);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    SplashScreen.hide();

    return subscriber;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}>
            {user ? (
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
