//IMPORT ALL SCREENS HERE:
import React from 'react';
import {Provider} from 'mobx-react';
import Navigation from './src/Navigation';
import RootStore from './src/stores/rootStore';

const App = () => {
  const mobxStore = new RootStore();

  return (
    <Provider mobxStore={mobxStore}>
      <Navigation />
    </Provider>
  );
};

export default App;
