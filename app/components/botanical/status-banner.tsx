'use client';
import {
  getColorClasses,
  getStatusConfig,
} from '@/lib/verificationStatusConfig';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../ui/badge';
import { CheckCircle, ShieldCheck, Users } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical';

interface StatusBannerProps {
  record: Partial<EthnobotanicalMetadata>;
  viewMode: 'public' | 'admin';
  showFeedback?: boolean;
}

export function StatusBanner({
  record,
  viewMode,
  showFeedback = false,
}: StatusBannerProps) {
  const config = getStatusConfig(record.status ?? 'draft');
  const colors = getColorClasses(config.color);
  const Icon = config.icon;

  const description =
    typeof config.description === 'function'
      ? config.description(record)
      : config.description;

  return (
    <div
      className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}
    >
      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-lg ${colors.badge.replace('text', 'text-opacity-80')}`}
            >
              <Icon
                className={`h-6 w-6 ${colors.text.replace('700', '600')}`}
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge
                  variant={config.badgeVariant}
                  className={`font-bold text-xs px-2.5 py-0.5 ${colors.badge} border-0 shadow-sm`}
                >
                  {config.label}
                </Badge>
                {record.publishedAt && record.status === 'published' && (
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {new Date(record.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
                {config.nextStep && viewMode === 'admin' && (
                  <span className="text-xs text-muted-foreground hidden md:inline">
                    • {config.nextStep}
                  </span>
                )}
              </div>
              <p className={`text-sm ${colors.text} max-w-2xl`}>
                {description}
              </p>

              {config.showProgress && viewMode === 'admin' && (
                <div className="mt-3 pt-2 border-t border-dashed border-muted">
                  <div className="flex items-center text-xs">
                    <span className="font-medium text-muted-foreground mr-2">
                      Workflow Progress:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3].map(stage => {
                        const isCurrent = (record.currentStage ?? 0) === stage;
                        const isComplete = (record.currentStage ?? 0) > stage;
                        const isAllowed =
                          (stage === 1 &&
                            ['admin', 'officer'].includes('admin')) ||
                          (stage === 2 &&
                            [
                              'admin',
                              'ethnoExpert',
                              'ethnoCouncilMember',
                            ].includes('admin')) ||
                          (stage === 3 &&
                            ['admin', 'communityLeader', 'superAdmin'].includes(
                              'admin'
                            ));

                        return (
                          <div
                            key={stage}
                            className={`flex flex-col items-center ${stage < 3 ? 'mr-4' : ''}`}
                          >
                            <div
                              className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                                isComplete
                                  ? 'bg-primary border-primary text-primary-foreground'
                                  : isCurrent
                                    ? `${colors.badge.replace('bg', 'border')} bg-background text-${config.color}-600`
                                    : isAllowed
                                      ? 'border-dashed border-muted text-muted-foreground'
                                      : 'border-dashed border-muted-foreground/30 text-muted-foreground/50'
                              }`}
                            >
                              {isComplete ? (
                                <CheckCircle className="h-3.5 w-3.5" />
                              ) : (
                                <span className="text-xs font-bold">
                                  {stage}
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-[10px] mt-1 font-medium ${
                                isCurrent
                                  ? colors.text
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {stage === 1
                                ? 'Capture'
                                : stage === 2
                                  ? 'Verify'
                                  : 'Approve'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {viewMode === 'admin' && (
            <div className="flex flex-wrap items-center gap-2 min-w-[200px] justify-end">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background border border-muted">
                <ShieldCheck
                  className={`h-4 w-4 ${colors.text.replace('700', '600')}`}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  Sensitivity:
                </span>
                <Badge
                  variant={
                    record.sensitivityLevel === 'public'
                      ? 'outline'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {record.sensitivityLevel?.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background border border-muted">
                <Users
                  className={`h-4 w-4 ${colors.text.replace('700', '600')}`}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  Compliance:
                </span>
                {record.standardsCompliance?.darwinCore ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 text-xs"
                  >
                    Darwin Core ✓
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs"
                  >
                    Incomplete
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {showFeedback && viewMode === 'admin' && record.feedback && (
          <Alert
            variant="warning"
            className="mt-4 bg-amber-50 border-amber-200"
          >
            <AlertDescription className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <span className="font-semibold text-amber-800">
                  Verifier Feedback:
                </span>
                <span className="ml-1 text-amber-800">{record.feedback}</span>
              </div>
              {record.lastUpdated && (
                <span className="text-xs text-amber-700 whitespace-nowrap">
                  Updated{' '}
                  {formatDistanceToNow(new Date(record.lastUpdated), {
                    addSuffix: true,
                  })}
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
