// Components.
import Heading from '../Heading';
import { default as CommentRibbon } from './Comment';
import CommentForm from './CommentForm';

// Types.
import { CommentWithUser } from '../../../types';
import { User } from '@prisma/client';
type Props = {
  projectId: string;
  comments: CommentWithUser[];
  currentUser?: User | null;
};

// Component.
export default function CommentSection({ projectId, comments, currentUser }: Props) {
  return (
    <section className="w-full flex flex-col gap-4">
      <Heading title="Comments" />

      <CommentForm projectId={projectId} currentUser={currentUser} />
      <hr />

      <div className="flex flex-col gap-8">
        {comments.map((comment) => (
          <CommentRibbon key={comment.id} comment={comment} user={comment.user} />
        ))}
      </div>
    </section>
  );
}
