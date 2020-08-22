import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from 'date-fns';
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

const WHOLE_DAY = 24;
const WHOLE_HOUR = 60;
const ONE_MINUTE = 1;

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
  const getTimeFromNow = (dateTime: Comment['date']) => {
    let date;
    if (typeof dateTime === 'string') {
      date = new Date(dateTime);
    } else {
      date = dateTime;
    }
    const currentDate = new Date();
    const minutesDifference = differenceInMinutes(currentDate, date);
    const hoursDifference = differenceInHours(currentDate, date);
    const daysDifference = differenceInDays(currentDate, date);
    if (minutesDifference < ONE_MINUTE) {
      return 'Just now';
    }
    if (minutesDifference < WHOLE_HOUR) {
      return `${minutesDifference} min ago`;
    }
    if (hoursDifference < WHOLE_DAY) {
      return `${hoursDifference} ${
        hoursDifference === 1 ? 'hour ago' : 'hours ago'
      }`;
    }
    return `${daysDifference} ${daysDifference === 1 ? 'day ago' : 'days ago'}`;
  };

  return (
    <Container bottomMargin={bottomMargin}>
      <Row spaced>
        <Row>
          <UserPicture source={{uri: comment.user.profilePicture}} />
          <View>
            <UserName>{comment.user.name}</UserName>
            <CommentTime>{getTimeFromNow(comment.date)}</CommentTime>
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
