import {useSelector} from 'react-redux';
import {Comment} from '../../interfaces/Comment';
import {AppState} from '../index';
import AsyncStorage from '@react-native-community/async-storage';
import {ThunkAction} from 'redux-thunk';

interface State {
  comments: Comment[];
}

type Action =
  | {type: 'comment/REPLY'; updatedComment: Comment}
  | {type: 'comment/ADD'; comment: Comment}
  | {type: 'comment/LIKE'; likedComment: Comment}
  | {type: 'comment/CLEAR'}
  | {type: 'comment/REPOPULATE'; comments: Comment[]};

const initialState: State = {
  comments: [],
};

const toggleLikeComment = (comments: Comment[], likedComment: Comment) => {
  comments.forEach((comment) => {
    if (comment.id === likedComment.id) {
      comment.liked = !comment.liked;
    } else if (comment.replies) {
      toggleLikeComment(comment.replies, likedComment);
    }
  });
};

export const userReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'comment/REPLY':
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === action.updatedComment.id) {
          return action.updatedComment;
        }
        return comment;
      });
      AsyncStorage.setItem('@comments', JSON.stringify(updatedComments));
      return {comments: updatedComments};
    case 'comment/ADD':
      AsyncStorage.setItem(
        '@comments',
        JSON.stringify([action.comment, ...state.comments]),
      );
      return {comments: [action.comment, ...state.comments]};
    case 'comment/LIKE':
      const commentsCopy = [...state.comments];
      toggleLikeComment(commentsCopy, action.likedComment);
      AsyncStorage.setItem('@comments', JSON.stringify(commentsCopy));
      return {comments: commentsCopy};
    case 'comment/REPOPULATE':
      return {comments: action.comments};
    case 'comment/CLEAR':
      AsyncStorage.removeItem('@comments');
      return {comments: []};
    default:
      return state;
  }
};

export const useCommentSelector = (): State =>
  useSelector<AppState, State>((store) => store.comment);

export const CommentActions = {
  addComment(newComment: Comment): Action {
    return {type: 'comment/ADD', comment: {...newComment, isRootComment: true}};
  },
  addReplyToComment(parentComment: Comment, newComment: Comment): Action {
    if (!parentComment.replies) {
      parentComment.replies = [];
      // parentComment.replyLevel = 1;
    }
    parentComment.replies?.push(newComment);
    return {type: 'comment/REPLY', updatedComment: parentComment};
  },
  likeComment(likedComment: Comment): Action {
    return {type: 'comment/LIKE', likedComment: likedComment};
  },
  repopulate(): ThunkAction<Promise<void>, AppState, never, Action> {
    return async (dispatch) => {
      const comments = await AsyncStorage.getItem('@comments');
      dispatch({
        type: 'comment/REPOPULATE',
        comments: comments ? (JSON.parse(comments) as Comment[]) : [],
      });
    };
  },
  clearComments(): Action {
    return {type: 'comment/CLEAR'};
  },
};
