import {User} from './User';

export interface Comment {
  user: User;
  id: string;
  message: string;
  liked?: boolean;
  replies?: Comment[];
  replyType?: 'inner' | 'outer';
  isRootComment?: boolean;
}
