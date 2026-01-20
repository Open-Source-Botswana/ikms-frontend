
'use client';

import React from 'react';

interface CommentConnectorProps {
  level: number;
  isLast: boolean;
  hasReplies: boolean;
  isHovered: boolean;
}

export const CommentConnector = ({
  level,
  isLast,
  hasReplies,
  isHovered,
}: CommentConnectorProps) => {
  if (level === 0) return null;

  const colorClass = isHovered ? 'stroke-primary' : 'stroke-border';
  const strokeWidth = isHovered ? 2 : 1;

  return (
    <div className="absolute left-[-20px] top-0 h-full pointer-events-none">

      <svg width="20" height="20" className="absolute top-0 left-0">
        <line x1="0" y1="10" x2="20" y2="10" className={colorClass} strokeWidth={strokeWidth} />
      </svg>

      {!isLast && (
        <svg width="1" height="100%" className="absolute top-[20px] left-[9.5px]">
          <line x1="0" y1="0" x2="0" y2="100%" className={colorClass} strokeWidth={strokeWidth} />
        </svg>
      )}

      {isLast && !hasReplies && (
        <svg width="20" height="20" className="absolute bottom-[-20px] left-0">
          <path
            d="M0 10 Q 10 20, 20 10"
            fill="none"
            className={colorClass}
            strokeWidth={strokeWidth}
          />
        </svg>
      )}
    </div>
  );
};
