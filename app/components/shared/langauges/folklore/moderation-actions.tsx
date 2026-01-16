/**
 * Moderation Actions Component
 * Reusable moderation action buttons and controls
 */

import React, { useState } from 'react';
import {
  Shield,
  Eye,
  EyeOff,
  Flag,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
  Loader2
} from 'lucide-react';
import {
  ModerationAction,
  ModerationTag,
  ModerationState
} from '@/lib/types/comments';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';

interface ModerationActionsProps {
  commentId: string;
  commentContent: string;
  currentStatus?: {
    is_moderated: boolean;
    is_deleted: boolean;
  };
  moderationState: ModerationState;
  onModerate: (
    commentId: string,
    action: ModerationAction,
    feedback: string,
    tags: ModerationTag[]
  ) => Promise<void>;
  compact?: boolean;
}

const MODERATION_TAGS: { value: ModerationTag; label: string; color: string }[] = [
  { value: 'spam', label: 'Spam', color: 'bg-red-100 text-red-800' },
  { value: 'harassment', label: 'Harassment', color: 'bg-orange-100 text-orange-800' },
  { value: 'inappropriate', label: 'Inappropriate', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'off-topic', label: 'Off-topic', color: 'bg-blue-100 text-blue-800' },
  { value: 'misinformation', label: 'Misinformation', color: 'bg-purple-100 text-purple-800' },
  { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' },
];

export function ModerationActions({
  commentId,
  commentContent,
  currentStatus,
  moderationState,
  onModerate,
  compact = false,
}: ModerationActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ModerationAction | null>(null);
  const [selectedTags, setSelectedTags] = useState<ModerationTag[]>([]);
  const [feedback, setFeedback] = useState('');

  const handleActionClick = (action: ModerationAction) => {
    setSelectedAction(action);
    setIsExpanded(true);
  };

  const handleSubmit = async () => {
    if (!selectedAction) return;

    await onModerate(commentId, selectedAction, feedback, selectedTags);

    // Reset form
    setIsExpanded(false);
    setSelectedAction(null);
    setSelectedTags([]);
    setFeedback('');
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setSelectedAction(null);
    setSelectedTags([]);
    setFeedback('');
  };

  const toggleTag = (tag: ModerationTag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const isModerated = currentStatus?.is_moderated || false;
  const isDeleted = currentStatus?.is_deleted || false;

  return (
    <div className="space-y-3">
      {/* Action Buttons */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {!isModerated && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleActionClick('hide')}
                disabled={moderationState.isProcessing}
                className="text-orange-600 hover:bg-orange-50 border-orange-200"
              >
                <EyeOff className="w-3.5 h-3.5 mr-1.5" />
                Hide
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleActionClick('flag')}
                disabled={moderationState.isProcessing}
                className="text-yellow-600 hover:bg-yellow-50 border-yellow-200"
              >
                <Flag className="w-3.5 h-3.5 mr-1.5" />
                Flag
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleActionClick('warn')}
                disabled={moderationState.isProcessing}
                className="text-blue-600 hover:bg-blue-50 border-blue-200"
              >
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                Warn
              </Button>
            </>
          )}
          {isModerated && !isDeleted && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleActionClick('approve')}
              disabled={moderationState.isProcessing}
              className="text-green-600 hover:bg-green-50 border-green-200"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              Approve
            </Button>
          )}
          {!isDeleted && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleActionClick('delete')}
              disabled={moderationState.isProcessing}
              className="text-red-600 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Delete
            </Button>
          )}
        </motion.div>
      )}

      {/* Expanded Form */}
      <AnimatePresence>
        {isExpanded && selectedAction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border rounded-lg p-4 bg-muted/30 space-y-3"
          >
            {/* Action Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Moderation: {selectedAction.toUpperCase()}
              </h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                disabled={moderationState.isProcessing}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Comment Preview */}
            <div className="text-xs bg-background p-2 rounded border">
              <p className="text-muted-foreground truncate">{commentContent}</p>
            </div>

            {/* Tags Selection */}
            {selectedAction !== 'approve' && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Select tags (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {MODERATION_TAGS.map(tag => (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() => toggleTag(tag.value)}
                      disabled={moderationState.isProcessing}
                      className={`
                        px-2.5 py-1 rounded-full text-xs font-medium
                        transition-all duration-200
                        ${
                          selectedTags.includes(tag.value)
                            ? tag.color + ' ring-2 ring-offset-1'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }
                      `}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Feedback / Reason {selectedAction !== 'approve' && '(required)'}
              </label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={`Provide reason for ${selectedAction}...`}
                className="min-h-[80px] text-sm"
                disabled={moderationState.isProcessing}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={
                  moderationState.isProcessing ||
                  (selectedAction !== 'approve' && !feedback.trim())
                }
                className="flex-1"
              >
                {moderationState.isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Submit {selectedAction}</>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={moderationState.isProcessing}
              >
                Cancel
              </Button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {moderationState.error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200"
                >
                  ⚠ {moderationState.error}
                </motion.div>
              )}
              {moderationState.success && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200"
                >
                  ✓ Action completed successfully
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Status Indicator Component
 */
interface StatusIndicatorProps {
  isModerated: boolean;
  isDeleted: boolean;
  compact?: boolean;
}

export function StatusIndicator({ isModerated, isDeleted, compact = false }: StatusIndicatorProps) {
  if (isDeleted) {
    return (
      <div className={`flex items-center gap-1.5 ${compact ? 'text-xs' : 'text-sm'} text-red-600`}>
        <Trash2 className="w-3.5 h-3.5" />
        {!compact && <span>Deleted</span>}
      </div>
    );
  }

  if (isModerated) {
    return (
      <div className={`flex items-center gap-1.5 ${compact ? 'text-xs' : 'text-sm'} text-orange-600`}>
        <EyeOff className="w-3.5 h-3.5" />
        {!compact && <span>Hidden</span>}
      </div>
    );
  }

  return null;
}
