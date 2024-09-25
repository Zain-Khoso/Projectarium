'uise client';

// Lib Imports.
import { MouseEventHandler, useState } from 'react';

// Icons.
import { FaShare } from 'react-icons/fa';

// Components.
import ShareProjectModel from '../modals/ShareProjectModel';

// Types.
import { User, Project } from '@prisma/client';
type Props = {
  project: Project;
  owner: User;
};

// Component.
export default function ShareButton({ owner, project }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleShare: MouseEventHandler<HTMLButtonElement> = function (event) {
    event.preventDefault();
    onOpen();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="flex flex-row gap-2 justify-center items-center"
      >
        <div className="-translate-y-[1px]">
          <FaShare size={18} className={`stroke-[1.5px] stroke-neutral-800 fill-neutral-600`} />
        </div>

        <div className="h-4 w-[1px] border border-neutral-400"></div>

        <span className="text-neutral-600 font-semibold">Share</span>
      </button>

      <ShareProjectModel owner={owner} project={project} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
