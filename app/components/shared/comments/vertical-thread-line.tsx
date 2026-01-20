import React from 'react';
import clsx from 'clsx';

interface VerticalThreadLineProps {
  active?: boolean;
  visible: boolean;
}

export const VerticalThreadLine: React.FC<VerticalThreadLineProps> = ({
  active,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div
      className={clsx(
        'absolute transition-colors',
        active ? 'bg-primary w-[2px]' : 'bg-border w-[1px]'
      )}
      style={{
        left: 20,
        top: 40,
        bottom: 0,
        zIndex: 0,
      }}
    />
  );
};
