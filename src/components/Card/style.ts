import styled from 'styled-components/native';
import {Colors} from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Constants} from '../../constants';

export const Container = styled.View<{isReply?: boolean}>`
  background: ${Colors.white};
  elevation: 8;
  padding: 14px;
  border-radius: 8px;
  margin-top: 10px;
`;

export const Row = styled.View<{spaced?: boolean}>`
  flex-direction: row;
  justify-content: ${({spaced}) => (spaced ? 'space-between' : 'flex-start')};
`;

export const UserPicture = styled.Image`
  width: 35px;
  height: 35px;
  background: ${Colors.grayLight};
  border-radius: 9999px;
  margin-right: 10px;
`;

export const UserName = styled.Text`
  color: ${Colors.grayDarker};
  font-size: 15px;
`;

export const CommentTime = styled.Text`
  color: ${Colors.gray};
  font-size: 12px;
`;

export const Message = styled.Text`
  margin: 12px 0;
`;

export const Button = styled.View`
  border-radius: 9999px;
  background: ${Colors.grayLight};
  padding: 5px 15px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonIcon = styled(Icon)`
  margin-right: 10px;
  color: ${Colors.gray};
  font-size: 16px;
`;

export const FilledHeartIcon = styled(AntIcon).attrs({name: 'heart'})`
  margin-right: 10px;
  color: ${Colors.purple}
  font-size: 16px;
`;

export const HeartIcon = styled(Icon).attrs({name: 'heart'})`
  margin-right: 10px;
  color: ${Colors.gray};
  font-size: 16px;
`;

export const ButtonLabel = styled.Text`
  color: ${Colors.gray};
`;
