import * as React from 'react';
import {Comments} from './views/Comments';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {CommentActions} from './store/reducers/comment';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CommentActions.repopulate());
  }, [dispatch]);

  return <Comments />;
};

export default App;
