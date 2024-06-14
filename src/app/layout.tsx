// Lib Imports.
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

// Local Imports.
import { cn } from '@/utils/utils';
import './globals.css';

// Types.
type Props = {
  children: React.ReactNode;
};

// Default Font.
const Font = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Metadata.
export const metadata: Metadata = {
  title: {
    template: '%s | Projectarium',
    default: 'Share, Innovate, Connect | Projectarium',
  },
  description:
    'Welcome to Projectarium, the leading platform for programmers to share their latest projects, get feedback, and connect with fellow developers. Join our community to showcase your work, collaborate, and drive innovation in the programming world.',
  keywords: [
    'projectarium',
    'programming community',
    'share projects',
    'developer collaboration',
    'programming innovation',
    'project showcase',
    'developer network',
  ],
  applicationName: 'Projectaruim',
  referrer: 'origin',
  creator: 'Zain Khoso',
  publisher: 'Zain Khoso',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  authors: [
    {
      name: 'Zain Khoso',
      url: 'https://www.linkedin.com/in/zain-khoso/',
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
};

// Component.
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', Font.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
