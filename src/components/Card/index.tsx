import * as React from 'react';
import {
  View,
  TouchableOpacity,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
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
import {useState} from 'react';

const WHOLE_DAY = 24;
const WHOLE_HOUR = 60;
const ONE_MINUTE = 1;
const FIFTY_PER_CENT = 0.5;

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
  const [shouldRenderButtonLabels, setShouldRenderButtonLabels] = useState<
    boolean
  >(true);
  const viewportWidth = useWindowDimensions().width;

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

  const getCardWidth = (event: LayoutChangeEvent): void => {
    event.persist();
    const cardWidth = parseInt(event.nativeEvent.layout.width.toString());
    const viewportWidthLimit = parseInt(
      (viewportWidth * FIFTY_PER_CENT).toString(),
    );
    setShouldRenderButtonLabels(cardWidth >= viewportWidthLimit);
  };

  return (
    <Container
      bottomMargin={bottomMargin}
      onLayout={(event) => getCardWidth(event)}>
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
          <Button isSmall={!shouldRenderButtonLabels}>
            <ButtonIcon name="reply" />
            {shouldRenderButtonLabels ? (
              <ButtonLabel>Reply</ButtonLabel>
            ) : undefined}
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onLike(comment)}>
          <Button isSmall={!shouldRenderButtonLabels}>
            {comment.liked ? <FilledHeartIcon /> : <HeartIcon />}
            {shouldRenderButtonLabels ? (
              <ButtonLabel purple={comment.liked}>
                {comment.liked ? 'Liked' : 'Like'}
              </ButtonLabel>
            ) : undefined}
          </Button>
        </TouchableOpacity>
      </Row>
    </Container>
  );
};
