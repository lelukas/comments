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
  HeartIcon,
  FilledHeartIcon,
  OptionsButton,
  OptionsIcon,
} from './style';
import {Comment} from '../../interfaces/Comment';

interface Props {
  comment: Comment;
  onReply: (arg0: Comment) => void;
  onLike: (arg0: Comment) => void;
  bottomMargin?: boolean;
}

export const Card: React.FC<Props> = ({
  comment,
  onReply,
  onLike,
  bottomMargin,
}) => {
  return (
    <Container bottomMargin={bottomMargin}>
      <Row spaced>
        <Row>
          <UserPicture source={{uri: comment.user.profilePicture}} />
          <View>
            <UserName>{comment.user.name}</UserName>
            <CommentTime>5 min ago</CommentTime>
          </View>
        </Row>
        <OptionsButton>
          <OptionsIcon />
        </OptionsButton>
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
            {comment.liked ? <FilledHeartIcon /> : <HeartIcon />}
            <ButtonLabel>{comment.liked ? 'Liked' : 'Like'}</ButtonLabel>
          </Button>
        </TouchableOpacity>
      </Row>
    </Container>
  );
};
