// components/VerificationTimeline.tsx
import { VerificationEvent } from '@/lib/types/botanical';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Clock, Send, AlertCircle, FileCheck } from 'lucide-react';

interface VerificationTimelineProps {
  events: VerificationEvent[];
  currentStage: number;
}

const ACTION_CONFIG = {
  submitted: {
    icon: Send,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    label: 'Submitted',
  },
  approved: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    label: 'Approved',
  },
  denied: {
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    label: 'Denied',
  },
  revision_requested: {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    label: 'Revision Requested',
  },
  published: {
    icon: FileCheck,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    label: 'Published',
  },
};

export function VerificationTimeline({
  events,
  currentStage,
}: VerificationTimelineProps) {
  if (!events) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No verification events yet
      </div>
    );
  }

  return (
    <div className="relative space-y-6 pl-6">

      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border -ml-px"></div>

      {events.map((event, index) => {
        const config =
          ACTION_CONFIG[event.action as keyof typeof ACTION_CONFIG] ||
          ACTION_CONFIG.submitted;
        const Icon = config.icon;
        const isLast = index === events.length - 1;

        return (
          <div key={index} className="relative pb-8">

            <div
              className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center ${config.bg} border-2 ${config.color}`}
            >
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 border">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    <span>{event.userName}</span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                      {event.role.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    Stage {event.stage}:{' '}
                    <span className={config.color}>{config.label}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap bg-accent px-2 py-0.5 rounded">
                  {formatDistanceToNow(new Date(event.timestamp), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {event.signature && (
                <div className="mt-3 pt-3 border-t border-dashed text-sm italic text-muted-foreground">
                  "{event.signature}"
                </div>
              )}

              {event.comments && (
                <div className="mt-3 pt-3 border-t border-dashed text-sm italic text-muted-foreground">
                  "{event.comments}"
                </div>
              )}
            </div>


            {!isLast && (
              <div className="absolute left-0 top-full h-8 w-0.5 bg-border -ml-px"></div>
            )}
          </div>
        );
      })}


      <div className="absolute -left-3 top-full w-6 h-6 rounded-full bg-primary border-2 flex items-center justify-center">
        <span className="text-xs font-bold text-primary-foreground">
          {currentStage}
        </span>
      </div>
      <div className="ml-4 mt-2 text-sm font-medium text-primary">
        Current Stage:{' '}
        {currentStage === 1
          ? 'Data Capture'
          : currentStage === 2
            ? 'Expert Verification'
            : 'Final Approval'}
      </div>
    </div>
  );
}
