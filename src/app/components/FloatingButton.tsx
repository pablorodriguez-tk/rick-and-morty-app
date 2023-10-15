'use client';

interface FloatingButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}

const FloatingButton = ({ onClick, icon, className }: FloatingButtonProps) => {
  return (
    <div data-dial-init className={` fixed right-6 bottom-6 group`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        type="button"
        data-dial-toggle="speed-dial-menu-default"
        aria-controls="speed-dial-menu-default"
        aria-expanded="false"
        className={`${className} flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
      >
        {icon}
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
};
export default FloatingButton;
