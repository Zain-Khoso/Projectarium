'use client';

// Hooks.
import useCountries from '@/hooks/useCountries';

// Types.
type Props = {
  locationValue: string;
};

// Component.
export default function LocationText({ locationValue }: Props) {
  const { getByValue } = useCountries();

  return <span className="font-normal text-neutral-800">{getByValue(locationValue)?.label}</span>;
}
