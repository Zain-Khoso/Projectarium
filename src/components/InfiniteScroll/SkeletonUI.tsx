// Lib Imports.
import { v4 as UUID4 } from 'uuid';

// Local Imports.
import { cn } from '@/utils/utils';
import { Skeleton } from '../ui/skeleton';

// Component.
export default function SkeletonUI() {
  const items = new Array(9).fill('').map(() => UUID4());

  return items.map((id) => <Skeleton key={id} className={cn('w-full min-h-[550px] rounded-lg')} />);
}
