'use client';

// Icons.
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';

// Components.
import { Button } from '@/components/Button';

// Types.
type Props = {
  nextLabel: string;
  nextAction: () => void;
  backAction?: () => void;
};

// Component.
export default function Controls({ nextLabel, nextAction, backAction }: Props) {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      {backAction && <Button label="Back" onClick={backAction} icon={FaArrowCircleLeft} outline />}

      <Button label={nextLabel} onClick={nextAction} icon={FaArrowCircleRight} iconSide="right" />
    </div>
  );
}
