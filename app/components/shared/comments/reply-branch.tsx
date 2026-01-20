import React from 'react';
import clsx from 'clsx';

interface ReplyBranchProps {
  isLast: boolean;
  active?: boolean;
}

export const ReplyBranch: React.FC<ReplyBranchProps> = ({
  isLast,
  active,
}) => {
  const color = active ? 'border-primary' : 'border-border';

  return (
    <>

      <div
        className={clsx('absolute border-l border-b', color)}
        style={{
          left: -20,
          top: 0,
          width: 20,
          height: 20,
          borderBottomLeftRadius: 12,
        }}
      />


      {!isLast && (
        <div
          className={clsx('absolute border-l', color)}
          style={{
            left: -20,
            top: 20,
            bottom: -16,
          }}
        />
      )}
    </>
  );
};
