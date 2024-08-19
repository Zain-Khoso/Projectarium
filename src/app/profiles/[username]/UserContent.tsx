// Lib Imports.
import Link from 'next/link';

// Icons.
import { IoLocationSharp } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa';

// Components.
import Avatar from '@/components/Avatar';
import Heading from '@/components/Heading';
import EditProfileButton from './EditProfileButton';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
  profileUser: User | null;
};

// Component.
export default function UserContent({ currentUser, profileUser }: Props) {
  const username =
    (profileUser?.username?.length as number) > 25
      ? profileUser?.username?.slice(0, 20) + '...'
      : profileUser?.username;

  return (
    <section className="flex flex-col gap-8 md:w-[300px] md:border-r-2 border-neutral-200 pr-4">
      {/* First Section */}
      <section className="flex flex-row items-center gap-4">
        <Avatar src={profileUser?.image} size={60} />

        <Heading title={profileUser?.name as string} subtitle={username as string} />
      </section>

      {/* Second Section */}
      {profileUser?.bio && (
        <article className="font-light text-neutral-500 text-justify">{profileUser.bio}</article>
      )}

      {/* Third Section */}
      {profileUser?.locationValue ||
        (profileUser?.website && (
          <section className="flex flex-col gap-2">
            {profileUser?.locationValue && (
              <div className="flex flex-row gap-2 items-center">
                <IoLocationSharp className="fill-8eutral-500" />

                <span className="font-normal text-neutral-800">LOCATION HERE</span>
              </div>
            )}

            {profileUser?.website && (
              <Link href={profileUser.website} className="flex flex-row gap-2 items-center">
                <FaLink className="fill-neutral-800" />

                <span className="font-normal text-neutral-800">Website</span>
              </Link>
            )}
          </section>
        ))}

      {/* Final Section */}
      {currentUser?.username === profileUser?.username && <EditProfileButton />}
    </section>
  );
}
