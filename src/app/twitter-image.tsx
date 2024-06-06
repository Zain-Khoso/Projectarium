// Lib Imports.
import { ImageResponse } from 'next/og';

// Local Imports.
import { cn } from '@/utils/utils';
import { H1 } from '@/components/ui/typography';

export const runtime = 'edge';
export const alt = 'Projectarium';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div className={cn('w-full h-full bg-white flex items-center justify-center')}>
        <H1 className={cn('text-black')}>Projectarium</H1>
      </div>
    )
  );
}
