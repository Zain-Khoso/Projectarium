import { User, Project, Comment, Like } from '@prisma/client';

export interface ChildrenProps {
  children: React.ReactNode;
}

export type CommentWithUser = Omit<Comment, 'user'> & {
  user: User;
};

export type WholeProject = Omit<Comment, 'owner', 'comments', 'likes'> & {
  owner: User;
  comments: Comment[];
  likes: Like[];
};
