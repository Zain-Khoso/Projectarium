// Lib Imports.
import { Metadata } from 'next';

// Components.
import Background from '../Background';
import Heading from '@/components/Heading';
import SocialLogins from '../SocialLogins';
import LoginForm from './LoginForm';

// Metadata.
export const metadata: Metadata = {
  title: 'Login',
  description:
    'Access your Projectarium account to continue showcasing your projects, connecting with peers, and collaborating on new ideas. Log in now to stay engaged with the programming community.',
  keywords: [
    'Projectarium',
    'login',
    'sign in',
    'programmer social media',
    'developer login',
    'access account',
  ],
};

// Page.
export default function SignupPage() {
  return (
    <>
      <Background />

      <section className="fixed w-[100dvw] h-[100dvh] bg-transparent flex items-center justify-end">
        <div className="w-full md:w-[480px] h-full md:h-[80dvh] max-h-[800px] md:mr-12 md:rounded-xl bg-white flex flex-col items-center justify-around gap-4 py-8 px-4">
          <Heading title="Login" subtitle="Reconnect with Innovators and Continue Your Journey!" />

          <SocialLogins />

          <div className="w-full flex flex-col items-center justify-center relative">
            <hr className="w-full border-neutral-300" />
            <span className="absolute bg-white px-1 text-sm">OR</span>
          </div>

          <LoginForm />
        </div>
      </section>
    </>
  );
}
