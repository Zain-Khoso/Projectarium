// Lib Imports.
import { ImageResponse } from 'next/og';

// Local Imports.
import { cn } from '@/utils/utils';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Share your project';
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
        Share your Project.
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
