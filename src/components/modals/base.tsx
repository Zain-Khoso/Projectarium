'use client';

// Lib Imports.
import { useCallback, useEffect, useState } from 'react';

// Icons.
import { IoMdClose } from 'react-icons/io';

// Components.
import { Button } from '../Button';

// Types.
import { IconType } from 'react-icons';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactElement;
  actionLabel?: string;
  actionIcon?: IconType;
  onSubmit?: () => void;
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionIcon?: IconType;
};

// Component
export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  actionIcon,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  secondaryActionIcon,
}: Props) {
  const [showModel, setShowModel] = useState(isOpen);

  useEffect(() => {
    setShowModel(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModel(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled || !onSubmit) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full 
              ${showModel ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
            `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      icon={secondaryActionIcon}
                    />
                  )}
                  {onSubmit && actionLabel && (
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                      icon={actionIcon}
                      iconSide="right"
                    />
                  )}
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
