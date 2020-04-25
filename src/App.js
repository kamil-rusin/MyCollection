import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/Store';

const store = configureStore();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Text>Hello there</Text>
    </Provider>
  );
};

export default App;
