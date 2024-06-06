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
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          color: 'black',
        }}
      >
        Projectarium
      </div>
    )
  );
}
