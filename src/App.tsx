import * as React from 'react';
import {Comments} from './views/Comments';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {CommentActions} from './store/reducers/comment';
import {Colors} from './colors';
import {SafeAreaView, StatusBar} from 'react-native';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CommentActions.repopulate());
  }, [dispatch]);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: Colors.purpleLightest}} />
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.purpleLightest} />
        <Comments />
      </SafeAreaView>
    </>
  );
};

export default App;
