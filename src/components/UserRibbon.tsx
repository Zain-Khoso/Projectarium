'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useMemo, MouseEventHandler, useCallback } from 'react';

// Hooks.
import useCountries from '@/hooks/useCountries';

// Utils.
import { getDisplayNameOfUser } from '@/libs/getDisplayNameOfUser';

// Icons.
import { FaLocationDot } from 'react-icons/fa6';

// Components.
import Avatar from './Avatar';

// Types.
import { User } from '@prisma/client';
type Props = {
  owner: User;
  size?: 'sm' | 'md' | 'lg';
};

// Component.
export default function UserRibbon({ owner, size = 'sm' }: Props) {
  const router = useRouter();
  const { getByValue: getCountryByValue } = useCountries();

  const ownerLabel = useMemo(() => getDisplayNameOfUser(owner), [owner]);

  const ownerCountry = useMemo(() => {
    if (!owner.locationValue) return null;

    return getCountryByValue(owner.locationValue);
  }, [owner.locationValue, getCountryByValue]);

  const handleOwnerClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();

      router.push(`/${owner.username}`);
    },
    [owner.username, router]
  );
  return (
    <div
      onClick={handleOwnerClick}
      className="h-11 flex flex-row items-center gap-2 cursor-pointer"
    >
      <div className="w-fit h-fit rounded-full border border-neutral-300">
        <Avatar
          src={owner.image ? owner.image : '/images/user-placeholder.png'}
          size={size === 'sm' ? 35 : size === 'md' ? 40 : 45}
        />
      </div>

      <div className="flex-1 h-full flex-col items-start justify-between">
        <h4 className="font-bold text-md text-neutral-600">{ownerLabel}</h4>

        {ownerCountry && (
          <div className="flex flex-row items-center gap-1">
            <FaLocationDot size={12} className="fill-neutral-600" />

            <span className="font-medium text-sm text-neutral-600">
              {ownerCountry.flag} {ownerCountry.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
