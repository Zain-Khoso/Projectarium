// Libs
import { Nunito } from 'next/font/google';

// Local Imports.
import ToastProvider from '@/providers/ToasterProvider';

// Styles.
import '@/app/globals.css';

// Types.
import type { Metadata } from 'next';
import { ChildrenProps } from '../../../types';

// Metadata.
export const metadata: Metadata = {
  title: {
    template: '%s | Projectarium Authentication',
    default: 'Authenticate | Projectarium - Sign In or Create Account',
  },
  description:
    'Access Projectarium, a platform for programmers to showcase their projects, collaborate, and receive feedback. Sign in or create a new account to join a thriving community of developers.',
  keywords: [
    'Projectarium',
    'authentication',
    'login',
    'sign up',
    'programmer community',
    'developer login',
    'account creation',
    'developer sign up',
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
    index: false,
    follow: false,
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
