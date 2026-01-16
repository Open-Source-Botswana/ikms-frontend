/**
 * Admin Moderation Panel
 * Simple test UI for admin comment moderation
 */

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import {
  Shield,
  ChevronDown,
  ChevronRight,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { CommentWithModeration, ModerationAction, ModerationTag } from '@/lib/types/comments';
import { ModerationActions, StatusIndicator } from './moderation-actions';
import { useModeration } from '@/app/hooks/use-moderation';
import { motion, AnimatePresence } from 'motion/react';

interface AdminModerationPanelProps {
  comments: CommentWithModeration[];
  itemId: string;
  onModerationComplete?: () => void;
}

export function AdminModerationPanel({
  comments,
  itemId,
  onModerationComplete
}: AdminModerationPanelProps) {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const { moderationState, moderate, isAdmin } = useModeration({
    itemId,
    onSuccess: (record) => {
      console.log('Moderation successful:', record);
      if (onModerationComplete) {
        onModerationComplete();
      }
    },
    onError: (error) => {
      console.error('Moderation failed:', error);
    },
  });

  const toggleExpand = (commentId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleModerate = async (
    commentId: string,
    action: ModerationAction,
    feedback: string,
    tags: ModerationTag[]
  ) => {
    await moderate({
      comment_id: commentId,
      action,
      tags,
      feedback,
      notify_user: true,
    });
  };

  // Flatten comment tree for display
  const flattenComments = (
    comments: CommentWithModeration[],
    level: number = 0
  ): Array<CommentWithModeration & { level: number }> => {
    const result: Array<CommentWithModeration & { level: number }> = [];

    for (const comment of comments) {
      result.push({ ...comment, level });

      if (comment.replies && comment.replies.length > 0) {
        result.push(...flattenComments(comment.replies, level + 1));
      }
    }

    return result;
  };

  const flatComments = flattenComments(comments);

  // Statistics
  const stats = {
    total: flatComments.length,
    moderated: flatComments.filter(c => c.is_moderated).length,
    deleted: flatComments.filter(c => c.is_deleted).length,
    pending: flatComments.filter(c => !c.is_moderated && !c.is_deleted).length,
  };

  if (!isAdmin) {
    return (
      <Card className="p-6 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          You don't have permission to access the moderation panel
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Admin Moderation Panel</h2>
            <p className="text-sm text-muted-foreground">
              Review and moderate user comments
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Comments</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold">{stats.moderated}</p>
              <p className="text-xs text-muted-foreground">Moderated</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold">{stats.deleted}</p>
              <p className="text-xs text-muted-foreground">Deleted</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Comments List */}
      <Card className="divide-y">
        {flatComments.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No comments to moderate
          </div>
        ) : (
          flatComments.map((comment, index) => {
            const isExpanded = expandedComments.has(comment.id);
            const hasReplies = comment.replies && comment.replies.length > 0;

            return (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 ${
                  comment.is_moderated ? 'bg-orange-50/50' : ''
                } ${comment.is_deleted ? 'bg-red-50/50' : ''}`}
              >
                {/* Comment Header */}
                <div
                  className="flex items-start gap-3 mb-3"
                  style={{ paddingLeft: `${comment.level * 32}px` }}
                >
                  {/* Expand/Collapse Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(comment.id)}
                    className="h-8 w-8 p-0"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>

                  {/* Comment Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {comment.author_name || comment.author_id}
                      </span>
                      {comment.level > 0 && (
                        <span className="text-xs text-muted-foreground">
                          → Reply (Level {comment.level})
                        </span>
                      )}
                      <StatusIndicator
                        isModerated={comment.is_moderated}
                        isDeleted={comment.is_deleted}
                        compact
                      />
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {comment.content}
                    </p>
                    {comment.created_at && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(comment.created_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                      style={{ paddingLeft: `${comment.level * 32 + 44}px` }}
                    >
                      {/* Full Comment Content */}
                      <div className="mb-4 p-3 bg-background rounded-lg border">
                        <p className="text-sm whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>

                      {/* Reply Tree Info */}
                      {hasReplies && (
                        <div className="mb-3 text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{comment.replies?.length} {comment.replies?.length === 1 ? 'reply' : 'replies'}</span>
                        </div>
                      )}

                      {/* Moderation Actions */}
                      <ModerationActions
                        commentId={comment.id}
                        commentContent={comment.content}
                        currentStatus={{
                          is_moderated: comment.is_moderated,
                          is_deleted: comment.is_deleted,
                        }}
                        moderationState={moderationState}
                        onModerate={handleModerate}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          Moderation Flow
        </h3>
        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
          <li>1. Click expand (›) to view full comment and moderation options</li>
          <li>2. Select an action: Hide, Flag, Warn, Delete, or Approve</li>
          <li>3. Choose relevant tags and provide feedback/reason</li>
          <li>4. Submit - the action will be logged and user will be notified via email</li>
          <li>5. Hidden/moderated comments are invisible to regular users</li>
          <li>6. If a parent comment is moderated, its reply tree is also hidden</li>
        </ul>
      </Card>
    </div>
  );
}
