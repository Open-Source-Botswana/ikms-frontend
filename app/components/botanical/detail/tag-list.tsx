import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TagListProps {
  tags?: string[];
  variant?: 'default' | 'primary' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-emerald-500/10 text-emerald-600',
  warning: 'bg-amber-500/10 text-amber-600'
};

export function TagList({ tags, variant = 'default', size = 'sm' }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag, index) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03 }}
          className={cn(
            "rounded-full font-medium",
            variantStyles[variant],
            size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
          )}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
