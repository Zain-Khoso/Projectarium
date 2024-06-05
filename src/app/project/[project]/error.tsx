'use client';

// Local Imports.
import { cn } from '@/utils/utils';
import { H2, P } from '@/components/ui/typography';
import { LinkButton } from '@/components/Navigation';
import { Button } from '@/components/ui/button';

// Types.
type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Component.
export default function Error({ error, reset }: Props) {
  if (error.message === 'project-does-not-exist')
    return (
      <section className={cn('px-4 py-8 space-y-4')}>
        <H2>Project does not exist!</H2>
        <P>The project you are looking for, is not shared here at the moment.</P>

        <div className={cn('flex items-center gap-4 !my-8')}>
          <LinkButton link="/project/share">Share this Project</LinkButton>
          <Button variant="secondary" onClick={reset}>
            Reload
          </Button>
          <LinkButton link="/" variant="link">
            Go back to home page
          </LinkButton>
        </div>
      </section>
    );

  return (
    <section className={cn('px-4 py-8 space-y-4')}>
      <H2>Oops! Something went wrong.</H2>
      <P>Check your internet connection before trying again.</P>

      <div className={cn('flex items-center gap-4 !my-8')}>
        <Button variant="outline" onClick={reset}>
          Reload
        </Button>
      </div>
    </section>
  );
}
