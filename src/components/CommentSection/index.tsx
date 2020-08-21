import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  CommentTime,
  Container,
  Row,
  UserName,
  UserPicture,
  Message,
  Button,
  ButtonLabel,
  ButtonIcon,
} from './style';
import {Colors} from '../../colors';
import {Comment} from '../../interfaces/Comment';

interface Props {
  comment: Comment;
  onReply: (arg0: Comment) => void;
  onLike: (arg0: Comment) => void;
}

export const CommentSection: React.FC<Props> = ({comment, onReply, onLike}) => {
  return (
    <Container>
      <Row spaced>
        <Row>
          <UserPicture source={{uri: comment.user.profilePicture}} />
          <View>
            <UserName>{comment.user.name}</UserName>
            <CommentTime>5 min ago</CommentTime>
          </View>
        </Row>
      </Row>
      <Message>{comment.message}</Message>
      <Row>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => onReply(comment)}>
          <Button>
            <ButtonIcon name="reply" />
            <ButtonLabel>Reply</ButtonLabel>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onLike(comment)}>
          <Button>
            <ButtonIcon name="heart" color={Colors.gray} />
            <ButtonLabel>Like</ButtonLabel>
          </Button>
        </TouchableOpacity>
      </Row>
    </Container>
  );
};
