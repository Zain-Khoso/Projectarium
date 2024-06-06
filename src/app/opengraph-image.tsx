// Lib Imports.
import { ImageResponse } from 'next/og';

// Local Imports.
import { cn } from '@/utils/utils';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Projectarium';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Font
  const font = fetch(new URL('/fonts/montserrat.ttf')).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div className={cn('w-full h-full bg-white flex items-center justify-center text-2xl')}>
        Projectarium
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Montserrat',
          data: await font,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
