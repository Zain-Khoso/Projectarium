import { Comment, User } from '@prisma/client';

export interface ChildrenProps {
  children: React.ReactNode;
}

export type CommentWithUser = Omit<Comment, 'user'> & {
  user: User;
};
