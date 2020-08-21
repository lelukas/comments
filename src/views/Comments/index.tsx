import * as React from 'react';
import {useState, Fragment, useRef} from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Title,
  CommentCard,
  UserPicture,
  Input,
  DismissReplyButton,
  DismissReplyLabel,
  CardBar,
  ReplyContainer,
  Header,
  ClearText,
  CommentsSection,
} from './style';
import {Card} from '../../components/Card';
import {CommentActions, useCommentSelector} from '../../store/reducers/comment';
import {Comment} from '../../interfaces/Comment';
import {useDispatch} from 'react-redux';
import {Users} from '../../constants';

export const Comments = () => {
  const {comments} = useCommentSelector();
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [inputState, setInputState] = useState<{
    placeholder: string;
    isReplying: boolean;
    commentToReplyTo?: Comment;
  }>({
    placeholder: 'Add your comment here',
    isReplying: false,
  });
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  const pushNewComment = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ): void => {
    event.persist();
    const newComment: Comment = {
      user: {
        name: Users[selectedUser].name,
        profilePicture: Users[selectedUser].profilePicture,
      },
      id: generateRandomNumber().toString(),
      message: event.nativeEvent.text,
      date: new Date(),
    };
    setSelectedUser(Math.floor(Math.random() * Users.length));
    if (inputState.isReplying && inputState.commentToReplyTo) {
      dispatch(
        CommentActions.addReplyToComment(
          inputState.commentToReplyTo,
          newComment,
        ),
      );
    } else {
      dispatch(CommentActions.addComment(newComment));
    }
    setInputState({
      placeholder: 'Add your comment here',
      isReplying: false,
    });
    inputRef.current?.clear();
  };

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 10000) + 1;
  };

  const handleLike = (comment: Comment) => {
    dispatch(CommentActions.likeComment(comment));
  };

  const handleReply = (comment: Comment): void => {
    scrollRef.current?.scrollTo({animated: true, x: 0, y: 0});
    inputRef.current?.focus();
    setInputState({
      placeholder: `Replying to ${comment.user.name}`,
      isReplying: true,
      commentToReplyTo: comment,
    });
  };

  const cancelReply = () => {
    setInputState({
      placeholder: 'Add your comment here',
      isReplying: false,
    });
  };

  const renderCommentCard = (comment: Comment) => {
    return (
      <Card
        comment={comment}
        onReply={handleReply}
        onLike={handleLike}
        bottomMargin={comment.isRootComment}
      />
    );
  };

  const renderCommentsArr = (commentsArr: Comment[]) => {
    return (
      <>
        {commentsArr.map((comment) => (
          <Fragment key={comment.id}>
            {comment.replies && comment.replies.length ? (
              <>
                {renderCommentCard(comment)}
                <ReplyContainer
                  isRootComment={comment.isRootComment}
                  key={comment.id}>
                  <CardBar isFirstLevelReply={comment.isRootComment} />
                  {renderCommentsArr(comment.replies)}
                </ReplyContainer>
              </>
            ) : (
              <>{renderCommentCard(comment)}</>
            )}
          </Fragment>
        ))}
      </>
    );
  };

  const clearComments = (): void => {
    dispatch(CommentActions.clearComments());
  };

  return (
    <Container>
      <ScrollView ref={scrollRef} contentContainerStyle={{padding: 20}}>
        <Header>
          <Title>Comments</Title>
          {comments.length ? (
            <TouchableOpacity onPress={clearComments}>
              <ClearText>Clear all comments</ClearText>
            </TouchableOpacity>
          ) : undefined}
        </Header>
        <CommentCard>
          <UserPicture source={{uri: Users[selectedUser].profilePicture}} />
          <Input
            ref={inputRef}
            placeholder={inputState.placeholder}
            onSubmitEditing={pushNewComment}
          />
          {inputState.isReplying ? (
            <TouchableOpacity onPress={cancelReply}>
              <DismissReplyButton>
                <DismissReplyLabel>Cancel</DismissReplyLabel>
              </DismissReplyButton>
            </TouchableOpacity>
          ) : undefined}
        </CommentCard>
        <CommentsSection>{renderCommentsArr(comments)}</CommentsSection>
      </ScrollView>
    </Container>
  );
};
