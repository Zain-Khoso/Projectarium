'use client';

// Lib Imports.
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import qs from 'query-string';

// Types
import { IconType } from 'react-icons';
import { User } from '@prisma/client';
type Props = {
  label: string;
  icon: IconType;
  selected?: boolean;
  profileUser?: User | null;
};

// Component.
export default function UserProfileTab({ label, icon: Icon, selected, profileUser }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      tab: label.toLowerCase(),
    };

    if (label.toLowerCase() === 'overview') delete updatedQuery.tab;

    const url = qs.stringifyUrl(
      { url: `/${profileUser?.username}`, query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router, profileUser?.username]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-row items-center justify-center gap-2 p-2 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? 'border-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'
      }`}
    >
      <Icon size={18} />

      <div className="font-medium text-md">{label}</div>
    </div>
  );
}
