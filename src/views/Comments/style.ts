import styled from 'styled-components/native';
import {Colors} from '../../colors';
import {Constants} from '../../constants';
import {cardStyles} from '../../GlobalStyles';

const setBarBackground = (isFirstLevelReply?: boolean) => {
  if (isFirstLevelReply) {
    return Colors.purpleLight;
  }
  return Colors.purpleLighter;
};

export const Container = styled.View`
  flex: 1;
  background: ${Colors.purpleLightest};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.purple};
  margin-left: 25px;
`;

export const ClearText = styled.Text`
  color: ${Colors.gray};
  padding: 10px 5px;
`;

export const CommentCard = styled.View`
  ${cardStyles};
  shadow-opacity: 0.05;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Constants.CARD_MARGIN}px;
`;

export const UserPicture = styled.Image`
  width: 32px;
  height: 32px;
  background: ${Colors.grayLighter};
  border-radius: 9999px;
  margin-right: 20px;
`;

export const Input = styled.TextInput.attrs({returnKeyType: 'send'})`
  padding: 5px 15px;
  border-radius: 8px;
  background: ${Colors.grayLighter};
  flex: 1;
`;

export const DismissReplyButton = styled.View`
  border-radius: 5px;
  background: ${Colors.purple};
  margin-left: 10px;
  padding: 7px 10px;
`;

export const DismissReplyLabel = styled.Text`
  color: ${Colors.white};
`;

export const CommentsSection = styled.View`
  padding: 0 5px;
`;

export const ReplyContainer = styled.View<{isRootComment?: boolean}>`
  padding-left: 20px;
  margin-top: ${({isRootComment}) =>
    isRootComment ? '0' : `${Constants.CARD_MARGIN}px`};
  margin-bottom: ${({isRootComment}) => (isRootComment ? '20px' : '0')};
`;

export const CardBar = styled.View<{isFirstLevelReply?: boolean}>`
  width: 7px;
  border-radius: 9999px;
  margin: 0 10px 10px;
  position: absolute;
  left: -11px;
  top: 0;
  height: 100%;
  background: ${({isFirstLevelReply}) => setBarBackground(isFirstLevelReply)};
`;
