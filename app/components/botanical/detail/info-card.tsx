import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  value: string | React.ReactNode;
  icon: LucideIcon;
  variant?: 'default' | 'highlight' | 'success' | 'warning';
  className?: string;
}

const variantStyles = {
  default: 'bg-card border-border',
  highlight: 'bg-primary/5 border-primary/20',
  success: 'bg-emerald-500/5 border-emerald-500/20',
  warning: 'bg-amber-500/5 border-amber-500/20'
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  highlight: 'bg-primary/10 text-primary',
  success: 'bg-emerald-500/10 text-emerald-600',
  warning: 'bg-amber-500/10 text-amber-600'
};

export function InfoCard({
  title,
  value,
  icon: Icon,
  variant = 'default',
  className
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-lg border",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
          iconStyles[variant]
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="font-medium text-foreground">
            {value}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
