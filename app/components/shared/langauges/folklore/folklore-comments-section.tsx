
'use client';

import React, { useCallback, useEffect, useState } from 'react';

import {
  Award,
  Check,
  Edit,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Share,
  X,
  Shield,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { FolkloreCommentsService } from '@/app/utils/supabase/supabase';
import { useParams } from 'next/navigation';
import { FolkloreComment } from '@/lib/types/comments';
import { motion, AnimatePresence } from 'motion/react';
import { useModeration, useCommentVisibility } from '@/app/hooks/use-moderation';
import { AdminModerationPanel } from './admin-moderation-panel';
import { CommentWithModeration } from '@/lib/types/comments';
import { StatusIndicator } from './moderation-actions';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { CommentInput } from '../comment-input';
import { Card } from '@/app/components/ui/card';
import { useAdmin } from '@/app/hooks/use-admin';
import { CommentItem } from '../../comments/comment-item';


export default function FolkloreCommentsSection() {
  const params = useParams();
  const id = params.riddleId as string;

  const [folkloreComments, setFolkloreComments] = useState<FolkloreComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Moderation hooks
  // const { isAdmin } = useModeration({ itemId: id });
  const { isAdmin } = useAdmin();


  const { shouldShowComment, getCommentPlaceholder } = useCommentVisibility(isAdmin);

  const fetchFolkloreComments = useCallback(async () => {
    if (!id) return null;
    setIsLoading(true);
    try {
      const res = await FolkloreCommentsService.getCommentWithVotesByItemId(id);
      // Filter out parent comments only
      const parentComments = res.filter((comment) => !comment.parent_id);
      // Set replies for each parent comment
      parentComments.forEach((parentComment) => {
        parentComment.replies = res.filter((comment) => comment.parent_id === parentComment.id);
      });

      setFolkloreComments(parentComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFolkloreComments();
  }, [fetchFolkloreComments]);

  const USER_AVATAR =
    'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=40&h=40&fit=crop&crop=face';

  const getTimeDisplay = (comment: FolkloreComment) => {
    if (!comment.created_at) {
      return 'Just now';
    }

    const now = new Date();
    const created = new Date(comment.created_at);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return created.toLocaleDateString();
  };

  const handleAddNewComment = (content: string) => {
    const comment: FolkloreComment = {
      id: generateId(),
      content,
      author_name: 'You',
      author_id: 'current-user-id',
      replies: [],
      created_at: new Date(),
      vote_score: 0,
      avatar: USER_AVATAR,
      parent_id: null,
      item_id: id,
      is_deleted: false,
      is_moderated: false,
      updated_at: null,
    };
    setFolkloreComments((prev) => [comment, ...prev]);
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const updateCommentInTree = (
    comments: FolkloreComment[],
    id: string,
    content: string
  ): FolkloreComment[] => {
    return comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content };
      }
      return {
        ...comment,
        replies: updateCommentInTree(comment.replies || [], id, content),
      };
    });
  };

  const addReplyToComment = (
    comments: FolkloreComment[],
    parentId: string,
    content: string
  ): FolkloreComment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        const newReply: FolkloreComment = {
          id: generateId(),
          parent_id: parentId,
          item_id: id,
          is_deleted: false,
          is_moderated: false,
          content: content,
          author_name: 'You',
          author_id: 'current-user-id',
          replies: [],
          created_at: new Date(),
          vote_score: 0,
          avatar: USER_AVATAR,
          updated_at: null,
        };
        return {
          ...comment,
          replies: [newReply, ...(comment.replies || [])],
        };
      }
      return {
        ...comment,
        replies: addReplyToComment(comment.replies || [], parentId, content),
      };
    });
  };

  const handleEditComment = (id: string, content: string) => {
    setFolkloreComments((prev) => updateCommentInTree(prev, id, content));
  };

  const handleReplyToComment = (parentId: string, content: string) => {
    setFolkloreComments((prev) => addReplyToComment(prev, parentId, content));
  };

  // Convert to CommentWithModeration type for admin panel
  const commentsForAdmin: CommentWithModeration[] = folkloreComments.map((c) => ({
    ...c,
    moderation_status: c.is_deleted ? 'deleted' : c.is_moderated ? 'hidden' : 'approved',
  }));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Admin Panel Toggle */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Button
              variant={showAdminPanel ? 'default' : 'outline'}
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="w-full sm:w-auto"
            >
              <Shield className="w-4 h-4 mr-2" />
              {showAdminPanel ? 'Hide' : 'Show'} Admin Moderation Panel
              {showAdminPanel ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </Button>
          </motion.div>
        )}

        {/* Admin Moderation Panel */}
        <AnimatePresence>
          {(isAdmin && showAdminPanel) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <AdminModerationPanel
                comments={commentsForAdmin}
                itemId={id}
                onModerationComplete={fetchFolkloreComments}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add New Comment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <CommentInput
            placeholder="What are your thoughts?"
            onSubmit={handleAddNewComment}
            userAvatar={USER_AVATAR}
          />
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Loading comments...</p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-0 overflow-clip">
          <AnimatePresence>
            {folkloreComments
              .filter((comment) => shouldShowComment(comment) || isAdmin)
              .map((comment, index) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onEdit={handleEditComment}
                  onReply={handleReplyToComment}
                  level={0}
                  isLast={index === folkloreComments.length - 1}
                  hasNextSibling={index < folkloreComments.length - 1}
                  parentConnectorHovered={false}
                  getTimeDisplay={getTimeDisplay}
                  userAvatar={USER_AVATAR}
                  isAdmin={isAdmin}
                  shouldShowComment={shouldShowComment}
                  getCommentPlaceholder={getCommentPlaceholder}
                />
              ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!isLoading && folkloreComments.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No comments yet. Add the first comment above!
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
