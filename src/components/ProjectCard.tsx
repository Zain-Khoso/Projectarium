// Lib Imports.
import Link from 'next/link';
import Image from 'next/image';

// Icons.
import { FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

// Components.
import BookmarkButton from './BookmarkButton';
import Badge from './Badge';

// Component.
export default function ProjectCard() {
  return (
    <Link href={'/TestUser1/BellyBrains'} className="w-full flex flex-col overflow-hidden group">
      <section className="relative rounded-lg overflow-hidden w-full h-[200px]">
        <Image
          alt={`Cover image of project BellyBrains`}
          src={`https://res.cloudinary.com/dnbs8oqz6/image/upload/v1725690430/foxqrxgq5qfbfevbxwpo.png`}
          fill
          className="w-full h-full object-cover object-center group-hover:scale-110 transition"
        />

        <BookmarkButton />
      </section>

      <section className="w-full flex flex-col gap-4 px-2 py-4">
        <div className="flex flex-row items-center justify-between">
          <h4 className="font-bold text-xl">BellyBrains</h4>

          <Badge label="Archived" outline />
        </div>

        <div className="flex flex-row items-start gap-1">
          <FaCalendarCheck size={16} className="fill-neutral-600" />

          <span className="font-medium text-sm text-neutral-600">Created 5 days ago</span>
        </div>
        <div className="flex flex-row items-start gap-1">
          <FaClipboardList size={16} className="fill-neutral-600" />

          <span className="font-medium text-sm text-neutral-600">
            Created with Nextjs, Prisma, etc...
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            alt={`Profile picture of owner of BellyBrains`}
            src={false ? '' : '/images/user-placeholder.png'}
            width={30}
            height={30}
            className="rounded-full object-cover object-center"
          />

          <div className="flex-1 h-full flex-col items-start justify-between">
            <h4 className="font-bold text-md text-neutral-600">TestUser1</h4>

            <div className="flex flex-row items-center gap-1">
              <FaLocationDot size={12} className="fill-neutral-600" />

              <span className="font-medium text-sm text-neutral-600">Pakistan</span>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
