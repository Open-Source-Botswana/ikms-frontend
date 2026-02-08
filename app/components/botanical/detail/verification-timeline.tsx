import { motion } from 'framer-motion';
import { Check, Clock, Circle, Shield, FileCheck, Users, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VerificationEvent } from '@/lib/types/ethnobotanical';

interface VerificationTimelineProps {
  stages?: VerificationEvent[];
  currentStage?: number;
}

const stageIcons = [FileCheck, Users, Shield, Award];

export function VerificationTimeline({ stages, currentStage }: VerificationTimelineProps) {
  return (
    <div className="space-y-1">
      {stages?.map((stage, index) => {
        const Icon = stageIcons[index] || Circle;
        const isCompleted = stage.status === 'completed';
        const isInProgress = stage.status === 'in_progress';
        const isPending = stage.status === 'pending';

        return (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="relative"
          >

            {index < stages.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-10 w-0.5 h-6",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}

            <div className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-all",
              isInProgress && "bg-primary/5 border border-primary/20",
              isCompleted && "bg-muted/30"
            )}>

              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                isCompleted && "bg-primary text-primary-foreground",
                isInProgress && "bg-primary/20 text-primary animate-pulse",
                isPending && "bg-muted text-muted-foreground"
              )}>
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : isInProgress ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={cn(
                    "font-medium text-sm",
                    isPending && "text-muted-foreground"
                  )}>
                    {stage.stage || `Stage ${stage.stage}`}
                  </h4>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    isCompleted && "bg-primary/10 text-primary",
                    isInProgress && "bg-amber-500/10 text-amber-600",
                    isPending && "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted ? 'Complete' : isInProgress ? 'In Progress' : 'Pending'}
                  </span>
                </div>

                {stage.timestamp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(stage.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}

                {stage.comments && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {stage.comments}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
