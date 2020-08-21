import {useSelector} from 'react-redux';
import {Comment} from '../../interfaces/Comment';
import {AppState} from '../index';
import AsyncStorage from '@react-native-community/async-storage';

interface State {
  comments: Comment[];
}

type Action =
  | {type: 'comment/REPLY_COMMENT'; updatedComment: Comment}
  | {type: 'comment/ADD_COMMENT'; comment: Comment}
  | {type: 'comment/LIKE_COMMENT'; likedComment: Comment}
  | {type: 'comment/REPOPULATE'};

const initialState: State = {
  comments: [],
};

const addRepliesLevels = (comments: Comment[], level: number): void => {
  comments.forEach((comment) => {
    if (comment.replies) {
      comment.replyLevel = level;
      addRepliesLevels(comment.replies, (level += 1));
    }
  });
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

export const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'comment/REPLY_COMMENT':
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === action.updatedComment.id) {
          return action.updatedComment;
        }
        return comment;
      });
      addRepliesLevels(updatedComments, 1);
      AsyncStorage.setItem('@comments', JSON.stringify(updatedComments));
      return {comments: updatedComments};
    case 'comment/ADD_COMMENT':
      AsyncStorage.setItem(
        '@comments',
        JSON.stringify([action.comment, ...state.comments]),
      );
      return {comments: [action.comment, ...state.comments]};
    case 'comment/LIKE_COMMENT':
      const commentsCopy = [...state.comments];
      toggleLikeComment(commentsCopy, action.likedComment);
      AsyncStorage.setItem('@comments', JSON.stringify(commentsCopy));
      return {comments: commentsCopy};
    default:
      return state;
  }
};

export const useCommentSelector = () =>
  useSelector<AppState, State>((store) => store.comment);

export const CommentActions = {
  addComment(newComment: Comment): Action {
    return {type: 'comment/ADD_COMMENT', comment: newComment};
  },
  addReplyToComment(parentComment: Comment, newComment: Comment): Action {
    if (!parentComment.replies) {
      parentComment.replies = [];
    }
    parentComment.replies?.push(newComment);
    return {type: 'comment/REPLY_COMMENT', updatedComment: parentComment};
  },
  likeComment(likedComment: Comment): Action {
    return {type: 'comment/LIKE_COMMENT', likedComment: likedComment};
  },
  repopulate(): Action {
    // todo: instalar thunk. é ... num deu.
    return {type: 'comment/REPOPULATE'};
  },
};
