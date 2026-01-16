/**
 * Folklore Comments Section Component
 * [] New comments should be uploaded to Supabase
 * [] Comments should be fetched from Supabase - with replies
 * [] Allow editing and replying to comments
 * [] Upvote and downvote comments
 * [] Collapse and expand comment threads
 * [] Pagination for comments if more than 10 parent comments
 * [] Display metrics such as number of comments, upvotes, downvotes
 * [] Handle loading and error states
 * [] Styling and UI/UX improvements
 * [x] Admin moderation flow integrated
 * [x] Better lineage visualization
 * [x] State transitions with animations
 *
 * This component displays a comments section for folklore items, allowing users to view,
 * add, edit, and reply to comments in a nested structure.
 * It includes features such as upvoting/downvoting comments,
 * collapsing/expanding comment threads, and editing comments.
 * The component is designed to be reusable and can be integrated into various parts of the application.
 * It uses state management to handle comment data and user interactions.
 * The component also includes a comment input area for adding new comments.
 */

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

interface CommentItemProps {
  comment: FolkloreComment;
  onEdit: (id: string, content: string) => void;
  onReply: (parentId: string, content: string) => void;
  level: number;
  isLast: boolean;
  hasNextSibling: boolean;
  parentConnectorHovered?: boolean;
  getTimeDisplay: (comment: FolkloreComment) => string;
  userAvatar: string;
  isAdmin: boolean;
  shouldShowComment: (comment: FolkloreComment) => boolean;
  getCommentPlaceholder: (comment: FolkloreComment) => string | null;
}

const UpvoteIcon = () => (
  <svg fill="currentColor" height="16" width="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"></path>
  </svg>
);

const DownvoteIcon = () => (
  <svg fill="currentColor" height="16" width="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1-.854-2.592A3.99 3.99 0 0 1 10 1Zm0 17.193 7.315-7.264a.251.251 0 0 0-.177-.429H12.5V5.184A2.631 2.631 0 0 0 10.136 2.5a2.441 2.441 0 0 0-1.856.682A2.478 2.478 0 0 0 7.5 5v5.5H2.861a.251.251 0 0 0-.176.429L10 18.193Z"></path>
  </svg>
);

const CollapseIcon = () => (
  <svg fill="currentColor" height="16" width="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10.625H6v-1.25h8v1.25ZM20 10a10 10 0 1 0-10 10 10.011 10.011 0 0 0 10-10Zm-1.25 0A8.75 8.75 0 1 1 10 1.25 8.76 8.76 0 0 1 18.75 10Z"></path>
  </svg>
);

const ExpandIcon = () => (
  <svg fill="currentColor" height="16" width="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.625 9.375H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375ZM20 10A10 10 0 1 1 10 0a10.011 10.011 0 0 1 10 10Zm-1.25 0A8.75 8.75 0 1 0 10 18.75 8.76 8.76 0 0 0 18.75 10Z"></path>
  </svg>
);

function CommentItem({
  comment,
  onEdit,
  onReply,
  level,
  isLast,
  hasNextSibling,
  parentConnectorHovered,
  getTimeDisplay,
  userAvatar,
  isAdmin,
  shouldShowComment,
  getCommentPlaceholder,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [isConnectorHovered, setIsConnectorHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSaveEdit = () => {
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleSubmitReply = (content: string) => {
    onReply(comment.id, content);
    setIsReplying(false);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  // Check if comment should be visible
  const isVisible = shouldShowComment(comment);
  const placeholder = getCommentPlaceholder(comment);

  // Enhanced lineage visualization
  const lineageColor = isConnectorHovered || parentConnectorHovered
    ? 'bg-primary'
    : comment.is_moderated
    ? 'bg-orange-300'
    : 'bg-border';

  // If comment is hidden and user is not admin, show placeholder
  if (!isVisible && placeholder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="mb-4 ml-8"
        style={{ paddingLeft: `${level * 32}px` }}
      >
        <div className="flex gap-3 items-center p-3 bg-muted/50 rounded-lg border border-dashed">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground italic">{placeholder}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      {/* Enhanced Vertical Connector Line */}
      {comment.replies && comment.replies.length > 0 && !isCollapsed && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          className={`absolute ${lineageColor} transition-colors duration-200`}
          style={{
            left: '20px',
            top: '40px',
            width: '2px',
            boxShadow: isConnectorHovered ? '0 0 8px rgba(30, 64, 175, 0.3)' : 'none',
          }}
          onMouseEnter={() => setIsConnectorHovered(true)}
          onMouseLeave={() => setIsConnectorHovered(false)}
        />
      )}

      {/* Horizontal Connector for nested comments */}
      {level > 0 && (
        <div
          className={`absolute h-0.5 w-4 ${lineageColor} transition-colors duration-200`}
          style={{
            left: '-16px',
            top: '20px',
            boxShadow: parentConnectorHovered ? '0 0 8px rgba(30, 64, 175, 0.3)' : 'none',
          }}
        />
      )}

      {/* Bottom masking for last item */}
      {isLast && (
        <div
          className="absolute bg-background"
          style={{
            left: level > 0 ? '-16px' : '20px',
            top: '21px',
            height: '100vh',
            width: '2px'
          }}
        />
      )}

      {/* Comment content */}
      <div className="mb-4">
        <div className="flex gap-3">
          {/* Avatar or Collapse Button */}
          <div className="flex-shrink-0">
            {isCollapsed ? (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer border-2 border-primary/20 hover:border-primary/40 transition-colors"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <ExpandIcon />
              </motion.div>
            ) : (
              <img
                src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                alt={`${comment.author_id}'s avatar`}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
            )}
          </div>

          {/* Comment text or edit form */}
          <div className="flex-1 min-w-0" style={{ paddingTop: '8px' }}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">
                {comment.author_id}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-sm">
                {getTimeDisplay(comment)}
              </span>
              {level > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    Level {level}
                  </span>
                </>
              )}
              {isAdmin && (
                <StatusIndicator
                  isModerated={comment.is_moderated}
                  isDeleted={comment.is_deleted}
                  compact
                />
              )}
            </div>

            {/* Moderated overlay for admins */}
            {isAdmin && (comment.is_moderated || comment.is_deleted) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-xs text-orange-700">
                  {comment.is_deleted ? 'Deleted by moderator' : 'Hidden by moderator'} - Only visible to admins
                </span>
              </motion.div>
            )}

            {/* Comment text or edit form */}
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2 mb-3"
              >
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[60px] resize-y"
                  placeholder="Edit your comment..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit}>
                    <Check className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </motion.div>
            ) : (
              !isCollapsed && (
                <div className="text-foreground text-sm mb-1 whitespace-pre-wrap">
                  {comment.content}
                </div>
              )
            )}

            {/* Actions */}
            {!isCollapsed && (
              <div className="flex items-center gap-1 relative" style={{ marginLeft: '-10px' }}>
                {comment.replies && comment.replies.length > 0 && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute cursor-pointer z-10"
                    style={{ left: '-30px', top: '8px' }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <div className="bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                      <CollapseIcon />
                    </div>
                  </motion.div>
                )}

                {/* Vote buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all"
                >
                  <UpvoteIcon />
                </Button>
                <span className="text-xs font-medium text-muted-foreground min-w-[1rem] text-center">
                  {comment.votes}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                >
                  <DownvoteIcon />
                </Button>

                {/* Action buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Reply
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Reply Input */}
            <AnimatePresence>
              {isReplying && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <CommentInput
                    placeholder="Write a reply..."
                    onSubmit={handleSubmitReply}
                    userAvatar={userAvatar}
                    onCancel={handleCancelReply}

                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      <AnimatePresence>
        {comment.replies && comment.replies.length > 0 && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-8 space-y-0"
          >
            {comment.replies
              .filter(reply => shouldShowComment(reply) || isAdmin)
              .map((reply, index) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onEdit={onEdit}
                  onReply={onReply}
                  level={level + 1}
                  isLast={index === (comment.replies?.length ?? 0) - 1}
                  hasNextSibling={index < (comment.replies?.length ?? 0) - 1}
                  parentConnectorHovered={isConnectorHovered}
                  getTimeDisplay={getTimeDisplay}
                  userAvatar={userAvatar}
                  isAdmin={isAdmin}
                  shouldShowComment={shouldShowComment}
                  getCommentPlaceholder={getCommentPlaceholder}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FolkloreCommentsSection() {
  const params = useParams();
  const id = params.riddleId as string;

  const [folkloreComments, setFolkloreComments] = useState<FolkloreComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Moderation hooks
  const { isAdmin } = useModeration({ itemId: id });
  const { shouldShowComment, getCommentPlaceholder } = useCommentVisibility(isAdmin);

  const fetchFolkloreComments = useCallback(async () => {
    if (!id) return null;
    setIsLoading(true);
    try {
      const res = await FolkloreCommentsService.getCommentsByItemId(id);
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
      votes: 0,
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
          votes: 0,
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
          {showAdminPanel && isAdmin && (
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
