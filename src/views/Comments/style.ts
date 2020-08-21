import styled from 'styled-components/native';
import {Colors} from '../../colors';
import {Constants} from '../../constants';

const setBarBackground = (replyLevel?: number) => {
  if (replyLevel) {
    if (replyLevel === 1) {
      return Colors.purpleLight;
    }
    return Colors.purpleLighter;
  }
  return undefined;
};

export const Container = styled.View`
  flex: 1;
  background: ${Colors.purpleLightest};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.purple};
  margin-bottom: 10px;
`;

export const CommentCard = styled.View`
  padding: 15px 20px;
  background: ${Colors.white};
  border-radius: 16px;
  elevation: 23;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const UserPicture = styled.Image`
  width: 32px;
  height: 32px;
  background: ${Colors.grayLight};
  border-radius: 9999px;
  margin-right: 20px;
`;

export const Input = styled.TextInput.attrs({returnKeyType: 'send'})`
  padding: 5px 15px;
  border-radius: 8px;
  background: ${Colors.grayLight};
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

export const ReplyContainer = styled.View`
  padding-left: 20px;
  margin-top: ${Constants.CARD_MARGIN}px;
  margin-bottom: ${Constants.CARD_MARGIN}px;
`;

export const CardBar = styled.View<{replyLevel?: number}>`
  width: 7px;
  border-radius: 9999px;
  margin: 0 10px 10px;
  position: absolute;
  left: -11px;
  top: 0;
  height: 100%;
  background: ${({replyLevel}) => setBarBackground(replyLevel)};
`;
