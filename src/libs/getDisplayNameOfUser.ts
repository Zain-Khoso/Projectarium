// Types.
import { User } from '@prisma/client';

// Util function to get a valid displayName of provided user to show on screen.
export function getDisplayNameOfUser(user: User) {
  if (user.name) return user.name;

  if (!user.username) return 'User';

  if (user.username.length > 20) return user.username.slice(0, 17) + '...';

  return user.username;
}
