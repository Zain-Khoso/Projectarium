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
  title: 'Projectarium: Share, Innovate, Connect',
  description:
    'Projectarium is a dynamic platform for programmers to showcase their latest projects, receive feedback, and connect with like-minded peers. Join us and be part of a supportive and interactive programming community.',
  keywords: [
    'projectarium',
    'programming',
    'project sharing',
    'feedback',
    'collaboration',
    'innovation',
  ],
  authors: [
    {
      name: 'Zain Khoso',
      url: 'https://github.com/Zain-Khoso/Projectarium.git',
    },
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Projectarium: Share, Innovate, Connect',
    description:
      'Projectarium is a dynamic platform for programmers to showcase their latest projects, receive feedback, and connect with like-minded peers.',
    images: '/brand/logo.ico',
    url: 'https://github.com/Zain-Khoso/Projectarium.git',
  },
  twitter: {
    title: 'Projectarium: Share, Innovate, Connect',
    description:
      'Projectarium is a dynamic platform for programmers to showcase their latest projects, receive feedback, and connect with like-minded peers.',
    images: '/brand/logo.ico',
    card: 'summary_large_image',
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
