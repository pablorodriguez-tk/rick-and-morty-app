'use client';

import { Button } from 'flowbite-react';

interface FloatingButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}

const FloatingButton = ({ onClick, icon, className }: FloatingButtonProps) => {
  return (
    <div data-dial-init className={`fixed right-6 bottom-12 group`}>
      <Button
        outline
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        type="button"
        data-dial-toggle="speed-dial-menu-default"
        aria-controls="speed-dial-menu-default"
        aria-expanded="false"
        className={`${className} flex items-center justify-center`}
      >
        {icon}
        <span className="sr-only">Open actions menu</span>
      </Button>
    </div>
  );
};
export default FloatingButton;
