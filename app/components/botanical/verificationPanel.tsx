// components/VerificationPanel.tsx
// 'use client';

import { useState, useMemo, useEffect } from 'react';

import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

import {
  ACTION_CONFIG,
  VERIFICATION_STAGES_CONFIG,
  VerificationAction,
} from '@/lib/types/ethnobotanyVerification';
import { ErrorPopup, SuccessPopup } from '../ui/animations/email';
import { useEthnobotanyStore } from '@/lib/store/ethnobotanyStore';
import { generateCryptoSignature } from '@/lib/crypto-signature';
import { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical';
import { VerificationRole } from '@/lib/types/botanical';
import { usePlantStore } from '@/lib/store/plantStore';

interface VerificationPanelProps {
  record: Partial<EthnobotanicalMetadata>;
  currentUserRole: VerificationRole;
  currentUser: { id: string; name: string };
  // onAction: (action: VerificationAction) => Promise<void>;
}

// DEBUG LOGGER - Centralized logging utility
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[VerificationPanel]', ...args);
  }
};

export function VerificationPanel({
  record,
  currentUserRole,
  currentUser,
  // onAction,
}: VerificationPanelProps) {
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { updatePlant } = usePlantStore();

  useEffect(() => {
    if (!record.currentStage) {
      debugLog('⚠️ WARNING: Record missing currentStage. Defaulting to 1');
    }
    debugLog('Intialized with record:', {
      id: record.id,
      status: record.status,
      currentStage: record.currentStage,
      verificationStages: record.verificationStages?.length || 0,
    });
  }, [record]);

  // TODO: check on creation if the currentStage is set
  const stageKey = (record.currentStage ||
    1) as keyof typeof VERIFICATION_STAGES_CONFIG;
  const stageConfig =
    VERIFICATION_STAGES_CONFIG[stageKey] || VERIFICATION_STAGES_CONFIG[1];

  const isAuthorized = stageConfig.allowedRoles.includes(currentUserRole);
  debugLog(
    `Authorization check: userRole=${currentUserRole}, allowedRoles=${stageConfig.allowedRoles.join(', ')}, isAuthorized=${isAuthorized}`
  );

  // Get available actions for current stage
  const availableActions = useMemo(() => {
    switch (record.currentStage) {
      case 1:
        return ['submit_for_review'];
      case 2:
        return ['approve', 'request_revision', 'deny'];
      case 3:
        return ['publish', 'deny'];
      default:
        return [];
    }
  }, [record.currentStage]);

  // Get config for selected action
  const actionConfig = selectedAction
    ? ACTION_CONFIG[selectedAction as keyof typeof ACTION_CONFIG]
    : null;
  const requiresComment = actionConfig?.requiresComment || false;

  // Validation
  const canSubmit = useMemo(() => {
    if (!selectedAction || !isAuthorized) return false;
    if (requiresComment && !comments.trim()) return false;
    return true;
  }, [selectedAction, isAuthorized, requiresComment, comments]);

  const calculateNextState = (currentStage: number, action: string) => {
    const config = ACTION_CONFIG[action as keyof typeof ACTION_CONFIG];
    if (!config) return { nextStage: currentStage, nextStatus: record.status };

    let nextStage = currentStage;
    let nextStatus = config.nextStatus;

    // Stage progression logic
    if (action === 'submit_for_review' && currentStage === 1) {
      nextStage = 2;
    } else if (action === 'approve' && currentStage === 2) {
      nextStage = 3;
    } else if (action === 'request_revision') {
      nextStage = 1; // Send back to admin
      nextStatus = 'revision_requested';
    } else if (action === 'deny') {
      nextStatus = 'denied';
      // Keep currentStage as denial stage for audit
    } else if (action === 'publish' && currentStage === 3) {
      nextStage = 3; // Final stage
    }

    debugLog(
      `⏭️ Stage transition: currentStage=${currentStage}, action=${action} → nextStage=${nextStage}, nextStatus=${nextStatus}`
    );
    return { nextStage, nextStatus };
  };

  const handleSubmit = async () => {
    if (!selectedAction || !actionConfig || !record.id) {
      const errorMsg = 'Invalid action configuration or missing record ID';
      debugLog('❌ Submission failed:', errorMsg);
      setError(errorMsg);
      return;
    }

    const actionPayload: VerificationAction =
      record.currentStage === 1
        ? {
            stage: 1,
            action: 'submit_for_review',
            comments: comments.trim() || undefined,
          }
        : record.currentStage === 2
          ? {
              stage: 2,
              action: selectedAction as 'approve' | 'request_revision' | 'deny',
              comments: comments.trim(),
            }
          : {
              stage: 3,
              action: selectedAction as 'publish' | 'deny',
              comments: comments.trim(),
            };

    try {
      setError('');
      // await onAction(actionPayload);
      const currentStage = record.currentStage || 1;
      const { nextStage, nextStatus } = calculateNextState(
        currentStage,
        selectedAction
      );
      const signature = generateCryptoSignature(
        currentUser.id,
        record.id,
        actionPayload.action,
        nextStage,
        new Date().toISOString()
      );

      if (record.id && record.currentStage) {
        const newEvent = {
          stage: record.currentStage,
          role: currentUserRole,
          userId: currentUser.id,
          userName: currentUser.name,
          timestamp: new Date().toISOString(),
          action: actionPayload.action,
          comments: actionPayload.comments,
          signature: signature,
        };

        debugLog('📝 Created verification event:', newEvent);

        if (!record.verificationStages) {
          record.verificationStages = [];
        }
        record.verificationStages.push(newEvent);
        // if (record.currentStage < 3){record.currentStage++}else{record.currentStage=record.currentStage}
        record.status = nextStatus;
        record.currentStage = nextStage;

        await updatePlant(record.id, record);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
      setComments('');
      setSelectedAction('');
    } catch (err) {
      setError(
        (err as Error).message || 'Failed to process verification action'
      );
    }
  };

  if (!isAuthorized) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          <p>
            Your role <strong>({currentUserRole})</strong> is not authorized to
            verify records at Stage {record.currentStage}.
          </p>
          <p className="mt-1">
            <strong>Required roles:</strong>{' '}
            {stageConfig.allowedRoles.join(', ')}
          </p>
          <p className="mt-1">Contact your system administrator for access.</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-l-4 border-primary">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Verification Panel: Stage {record.currentStage}
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              <p>Current Status: </p>
              <Badge variant="outline">
                {record.status?.replace('_', ' ') ?? 'pending_review'}
              </Badge>
              <br />
              <strong>Required Role:</strong>{' '}
              {stageConfig.allowedRoles.join(', ')}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {currentUser.name} ({currentUserRole})
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="verification-action">Verification Action</Label>
          <Select
            value={selectedAction}
            onValueChange={setSelectedAction}
            disabled={isSubmitting}
          >
            <SelectTrigger id="verification-action">
              <SelectValue placeholder="Select an action..." />
            </SelectTrigger>
            <SelectContent>
              {availableActions.map(actionKey => {
                const config =
                  ACTION_CONFIG[actionKey as keyof typeof ACTION_CONFIG];
                return (
                  <SelectItem key={actionKey} value={actionKey}>
                    {config.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Select the appropriate action for this verification stage
          </p>
        </div>

        {selectedAction && (
          <div className="space-y-2">
            <Label htmlFor="verification-comments">
              Comments / Feedback
              {requiresComment && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id="verification-comments"
              placeholder={
                requiresComment
                  ? 'Required: Provide specific feedback for the record creator...'
                  : 'Optional: Add verification notes...'
              }
              value={comments}
              onChange={e => setComments(e.target.value)}
              disabled={isSubmitting}
              rows={requiresComment ? 4 : 2}
              className={
                requiresComment && !comments.trim() ? 'border-red-500' : ''
              }
            />
            {requiresComment && !comments.trim() && (
              <p className="text-xs text-red-500">
                Comments are required for this action
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-2">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Stage {record.currentStage}:</strong> {stageConfig.name}
            </p>
            <p>
              <strong>Verification Path:</strong> Admin Capture → Expert Review
              → Final Approval
            </p>
            <p className="italic">
              All actions are permanently recorded in the audit trail
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={actionConfig?.color || 'bg-primary'}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : actionConfig ? (
              <>
                {actionConfig.label.split(' ')[0]}
                <span className="hidden sm:inline ml-1">
                  {actionConfig.label.split(' ').slice(1).join(' ')}
                </span>
              </>
            ) : (
              'Select Action'
            )}
          </Button>
        </div>

        {selectedAction && actionConfig && (
          <Alert
            variant={
              actionConfig.nextStatus === 'published'
                ? 'default'
                : actionConfig.nextStatus === 'denied'
                  ? 'destructive'
                  : actionConfig.nextStatus === 'revision_requested'
                    ? 'warning'
                    : 'info'
            }
          >
            <AlertTitle className="flex items-center">
              {actionConfig.nextStatus === 'published' && (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              {actionConfig.nextStatus === 'denied' && (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              {actionConfig.nextStatus === 'revision_requested' && (
                <AlertCircle className="h-4 w-4 mr-2" />
              )}
              Next Status: {actionConfig.nextStatus.replace('_', ' ')}
            </AlertTitle>
            <AlertDescription>
              This action will update the record status and notify relevant
              parties.
              {actionConfig.nextStatus === 'published' && (
                <span className="block mt-1 font-medium">
                  JSON-LD will be generated and the record made publicly
                  accessible.
                </span>
              )}
              {actionConfig.nextStatus === 'denied' && (
                <span className="block mt-1 font-medium text-red-700">
                  Record will be rejected with feedback visible to creator.
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      {showSuccess && (
        <SuccessPopup
          message="Verification record saved successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showError && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}
    </Card>
  );
}
