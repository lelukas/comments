import styled from 'styled-components/native';
import {Colors} from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Constants} from '../../constants';
import {cardStyles} from '../../GlobalStyles';

export const Container = styled.View<{bottomMargin?: boolean}>`
  ${cardStyles};
  shadow-opacity: 0.1;
  margin-bottom: ${({bottomMargin}) =>
    bottomMargin ? `${Constants.CARD_MARGIN}px` : '0'};
  overflow: hidden;
`;

export const Row = styled.View<{spaced?: boolean}>`
  flex-direction: row;
  justify-content: ${({spaced}) => (spaced ? 'space-between' : 'flex-start')};
`;

export const UserPicture = styled.Image`
  width: 35px;
  height: 35px;
  background: ${Colors.grayLighter};
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

export const OptionsButton = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

export const OptionsIcon = styled(Icon).attrs({name: 'ellipsis-v'})`
  color: ${Colors.grayLight};
`;

export const Message = styled.Text`
  margin: 12px 0;
`;

export const Button = styled.View<{isSmall: boolean}>`
  border-radius: 9999px;
  background: ${Colors.grayLighter};
  padding: ${({isSmall}) => (isSmall ? '5px 10px' : '5px 0')};
  ${({isSmall}) => (isSmall ? undefined : `width: 92px`)};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonIcon = styled(Icon)`
  color: ${Colors.gray};
  font-size: 16px;
`;

export const FilledHeartIcon = styled(AntIcon).attrs({name: 'heart'})`
  color: ${Colors.purple}
  font-size: 16px;
`;

export const HeartIcon = styled(Icon).attrs({name: 'heart'})`
  color: ${Colors.gray};
  font-size: 16px;
`;

export const ButtonLabel = styled.Text<{purple?: boolean}>`
  color: ${({purple}) => (purple ? Colors.purple : Colors.gray)};
  width: 40%;
  margin-left: 10px;
`;
