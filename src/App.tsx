import * as React from 'react';
import {Comments} from './views/Comments';
import {Provider} from 'react-redux';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Comments />
    </Provider>
  );
};

export default App;
