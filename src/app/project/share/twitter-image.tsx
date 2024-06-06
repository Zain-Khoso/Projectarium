// Lib Imports.
import { ImageResponse } from 'next/og';

// Local Imports.
import { cn } from '@/utils/utils';

// Route segment configs.
export const runtime = 'edge';
export const alt = 'Share your project';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div className={cn('w-full h-full bg-white flex items-center justify-center text-2xl')}>
        Share your Project.
      </div>
    )
  );
}
