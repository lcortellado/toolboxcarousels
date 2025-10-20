import {HomeScreen} from './src/screens/Home/HomeScreen';
import {Provider} from 'react-redux';
import React from 'react';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
