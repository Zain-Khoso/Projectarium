// Utils.
import { getDisplayNameOfUser } from '@/libs/getDisplayNameOfUser';
import { timeElapsed } from '@/libs/timeElapsed';

// Comments.
import Avatar from '../Avatar';

// Types.
import { Comment, User } from '@prisma/client';
type Props = {
  comment: Comment;
  user: User;
};

// Component.
export default function CommentRibbon({ comment, user }: Props) {
  const displayName = getDisplayNameOfUser(user);
  const timePassed = timeElapsed(comment.createdAt);

  return (
    <div className="flex flex-row items-start justify-start gap-2">
      <Avatar src={user.image} />

      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <span className="text-md">{displayName}</span>
          &middot;
          <span className="text-md font-light text-neutral-400">{timePassed}</span>
        </div>

        <p className="text-lg font-semibold">{comment.text}</p>
      </div>
    </div>
  );
}
