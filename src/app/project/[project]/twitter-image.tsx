// Lib Imports.
import { ImageResponse } from 'next/og';

// Local Imports.
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
        {project?.title || 'View on Projectarium'}
      </div>
    )
  );
}
