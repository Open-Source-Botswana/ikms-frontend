/**
 * useModeration Hook
 * Custom hook for managing comment moderation with state and error handling
 */

import { useState, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import {
  ModerationAction,
  ModerationActionPayload,
  ModerationRecord,
  ModerationState,
  ModerationTag
} from '@/lib/types/comments';
import { ModerationService } from '@/app/utils/supabase/moderation-service';

interface UseModerationOptions {
  itemId?: string;
  onSuccess?: (record: ModerationRecord) => void;
  onError?: (error: Error) => void;
}

export function useModeration(options: UseModerationOptions = {}) {
  const { itemId, onSuccess, onError } = options;

  const [moderationState, setModerationState] = useState<ModerationState>({
    isProcessing: false,
    error: null,
    success: false,
    lastAction: null,
  });

  // TODO: Fetch moderation history with SWR
  const {
    data: moderationHistory,
    error: historyError,
    isLoading: isLoadingHistory,
  } = useSWR<ModerationRecord[]>(
    itemId ? `/api/moderation/history/${itemId}` : null,
    () => itemId ? ModerationService.getModerationHistory(itemId) : Promise.resolve([]),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );


  const moderate = useCallback(async (payload: ModerationActionPayload) => {

    setModerationState({
      isProcessing: true,
      error: null,
      success: false,
      lastAction: payload.action,
    });

    try {

      const record = await ModerationService.moderateComment(payload);

      setModerationState({
        isProcessing: false,
        error: null,
        success: true,
        lastAction: payload.action,
      });

      // Revalidate comments data
      if (itemId) {
        mutate(`/api/comments/${itemId}`);
      }

      if (onSuccess) {
        onSuccess(record);
      }

      setTimeout(() => {
        setModerationState(prev => ({ ...prev, success: false }));
      }, 3000);

      return { success: true, record };
    } catch (error: any) {

      const errorMessage = error.message || 'Moderation action failed';

      setModerationState({
        isProcessing: false,
        error: errorMessage,
        success: false,
        lastAction: payload.action,
      });

      if (onError) {
        onError(error);
      }

      setTimeout(() => {
        setModerationState(prev => ({ ...prev, error: null }));
      }, 5000);

      return { success: false, error: errorMessage };
    }
  }, [itemId, onSuccess, onError]);

  /**
   * action helpers
   */
  const hideComment = useCallback(
    async (commentId: string, feedback: string, tags: ModerationTag[] = []) => {
      return moderate({
        comment_id: commentId,
        action: 'hide',
        tags,
        feedback,
        notify_user: true,
      });
    },
    [moderate]
  );

  const approveComment = useCallback(
    async (commentId: string, feedback: string = 'Approved by moderator') => {
      return moderate({
        comment_id: commentId,
        action: 'approve',
        tags: [],
        feedback,
        notify_user: false,
      });
    },
    [moderate]
  );

  const flagComment = useCallback(
    async (commentId: string, feedback: string, tags: ModerationTag[] = []) => {
      return moderate({
        comment_id: commentId,
        action: 'flag',
        tags,
        feedback,
        notify_user: true,
      });
    },
    [moderate]
  );

  const deleteComment = useCallback(
    async (commentId: string, feedback: string, tags: ModerationTag[] = []) => {
      return moderate({
        comment_id: commentId,
        action: 'delete',
        tags,
        feedback,
        notify_user: true,
      });
    },
    [moderate]
  );

  const warnUser = useCallback(
    async (commentId: string, feedback: string, tags: ModerationTag[] = []) => {
      return moderate({
        comment_id: commentId,
        action: 'warn',
        tags,
        feedback,
        notify_user: true,
      });
    },
    [moderate]
  );

  /**
   * [] TODO: Check if user is admin/moderator
   */
  const { data: isAdmin } = useSWR(
    '/api/moderation/check-permissions',
    () => ModerationService.checkModeratorPermissions('current-user-id'),
    {
      revalidateOnFocus: false,
      fallbackData: false,
    }
  );


  const resetState = useCallback(() => {
    setModerationState({
      isProcessing: false,
      error: null,
      success: false,
      lastAction: null,
    });
  }, []);

  return {

    moderationState,
    isAdmin: isAdmin ?? false,
    moderationHistory,
    isLoadingHistory,
    historyError,


    moderate,
    hideComment,
    approveComment,
    flagComment,
    deleteComment,
    warnUser,
    resetState,
  };
}

/**
 * Hook for checking comment visibility based on moderation status
 */
export function useCommentVisibility(isAdmin: boolean = false) {
  const shouldShowComment = useCallback(
    (comment: { is_moderated: boolean; is_deleted: boolean }) => {
      // Always hide deleted comments from regular users
      if (comment.is_deleted && !isAdmin) {
        return false;
      }

      // Hide moderated comments from regular users
      if (comment.is_moderated && !isAdmin) {
        return false;
      }

      // Admins can see everything
      return true;
    },
    [isAdmin]
  );

  const getCommentPlaceholder = useCallback(
    (comment: { is_moderated: boolean; is_deleted: boolean }) => {
      if (comment.is_deleted) {
        return '[This comment has been deleted by a moderator]';
      }
      if (comment.is_moderated) {
        return '[This comment has been hidden by a moderator]';
      }
      return null;
    },
    []
  );

  return {
    shouldShowComment,
    getCommentPlaceholder,
  };
}
