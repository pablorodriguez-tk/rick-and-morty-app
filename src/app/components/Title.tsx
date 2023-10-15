'use client';

interface TitleProps {
  title: string;
  position?: position;
}

type position = 'center' | 'left' | 'right';

export const Title = ({ title, position }: TitleProps) => {
  const checkPosition = (position: position | undefined) => {
    switch (position) {
      case 'center':
        return 'text-center';
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  return (
    <h1
      className={`${checkPosition(
        position,
      )} mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl`}
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {title}
      </span>
    </h1>
  );
};

export default Title;
