// Libs
import { Nunito } from 'next/font/google';

// Local Imports.
import ToastProvider from '@/providers/ToasterProvider';

// Styles.
import './globals.css';

// Types.
import type { Metadata } from 'next';
import { ChildrenProps } from '../../types';

// Metadata.
export const metadata: Metadata = {
  title: {
    template: '%s | Projectarium',
    default: 'Projectarium: Showcase, Collaborate, Innovate',
  },
  description:
    'Projectarium is a social media platform for programmers to showcase their projects, collaborate with others, and receive valuable feedback. Build your profile, connect with like-minded developers, and innovate together.',
  keywords: [
    'Projectarium',
    'programmer social media',
    'project sharing',
    'developer collaboration',
    'code review',
    'programming community',
    'software projects',
    'developer profiles',
    'project feedback',
    'open source collaboration',
    'tech innovation',
    'developer networking',
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

// Global Font Setup.
const font = Nunito({ subsets: ['latin'] });

// Root Layout
export default function RootLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
