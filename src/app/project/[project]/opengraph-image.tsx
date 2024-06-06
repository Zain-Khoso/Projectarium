// Lib Imports.
import { ImageResponse } from 'next/og';

// Local Imports.
import { cn } from '@/utils/utils';
import { fetchDoc } from '@/utils/firebase/firestore';

// Types.
type Props = {
  params: {
    project: string;
  };
};

// Route segment configs.
export const runtime = 'edge';
export const alt = 'View on Projectarium';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  return new ImageResponse(
    (
      <div className={cn('w-full h-full bg-white flex items-center justify-center text-2xl')}>
        {project?.title || 'View on Projectarium'}
      </div>
    )
  );
}
