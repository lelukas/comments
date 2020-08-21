import * as React from 'react';
import {useRef, useState, Fragment} from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
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
  ScrollContainer,
  ReplyContainer,
} from './style';
import {Card} from '../../components/Card';
import {CommentActions, useCommentSelector} from '../../store/reducers/comment';
import {User} from '../../interfaces/User';
import {Comment} from '../../interfaces/Comment';
import {useDispatch} from 'react-redux';
import uniqueId from 'lodash.uniqueid';

const users: User[] = [
  {
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQnOaRBUJ8JTzaYlHWxjZa-es7JL69plZ2_yw&usqp=CAU',
    name: 'Corbin Simpson',
  },
  {
    profilePicture:
      'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    name: 'Braden Moss',
  },
  {
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS7wNVnTDhgihBY8SQQsFjroOtDwzGKiLTXw&usqp=CAU',
    name: 'Carson Fuentes',
  },
  {
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTq4H7mPnTLV9rtqZ7_W5NeAhudM0OXP3UNNQ&usqp=CAU',
    name: 'Julian Rayner',
  },
];

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
  const inputRef = useRef<TextInput>();
  const scrollRef = useRef<ScrollView>();

  const pushNewComment = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ): void => {
    event.persist();
    const newComment: Comment = {
      user: {
        name: users[selectedUser].name,
        profilePicture: users[selectedUser].profilePicture,
      },
      id: uniqueId(),
      message: event.nativeEvent.text,
    };
    setSelectedUser(Math.floor(Math.random() * users.length));
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
    inputRef.current?.clear();
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

  const renderCommentCard = (comment: Comment, noBottomMargin?: boolean) => {
    return (
      <Card
        comment={comment}
        onReply={handleReply}
        onLike={handleLike}
        noBottomMargin={noBottomMargin}
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
                {renderCommentCard(comment, true)}
                <ReplyContainer key={comment.id}>
                  <CardBar replyLevel={comment.replyLevel} />
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

  return (
    <Container>
      <ScrollView ref={scrollRef} contentContainerStyle={{padding: 20}}>
        <Title>Comments</Title>
        <CommentCard>
          <UserPicture source={{uri: users[selectedUser].profilePicture}} />
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
        {renderCommentsArr(comments)}
      </ScrollView>
    </Container>
  );
};
