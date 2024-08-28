// Lib Imports.
import { Metadata } from 'next';

// Actions.
import noAuthenticationRequired from '@/actions/noAuthenticationRequired';

// Components.
import Background from '../Background';
import Heading from '@/components/Heading';
import SocialLogins from '../SocialLogins';
import SignUpForm from './SignUpForm';

// Metadata.
export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create your account on Projectarium and join a community of programmers. Start showcasing your projects, connecting with peers, and collaborating on new ideas.',
  keywords: [
    'Projectarium',
    'signup',
    'create account',
    'programmer social media',
    'developer registration',
    'join community',
  ],
};

// Page.
export default async function SignupPage() {
  await noAuthenticationRequired();

  return (
    <>
      <Background />

      <section className="fixed w-[100dvw] h-[100dvh] bg-transparent flex items-center justify-end">
        <div className="w-full md:w-[480px] h-full md:h-[80dvh] max-h-[800px] md:mr-12 md:rounded-xl bg-white flex flex-col items-center justify-around gap-4 py-8 px-4">
          <Heading title="Sign Up" subtitle="Join the Community of Innovators, Today!" />

          <SocialLogins />

          <div className="w-full flex flex-col items-center justify-center relative">
            <hr className="w-full border-neutral-300" />
            <span className="absolute bg-white px-1 text-sm">OR</span>
          </div>

          <SignUpForm />
        </div>
      </section>
    </>
  );
}
