// components/comments/CommentItem.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Shield, MessageCircle, Check, X } from 'lucide-react';
import { CommentConnector } from './comment-connector';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';

import type { FolkloreComment } from '@/lib/types/comments';
import { StatusIndicator } from '../langauges/folklore/moderation-actions';
import { CommentInput } from '../langauges/comment-input';
import { ReplyBranch } from './reply-branch';
import { VerticalThreadLine } from './vertical-thread-line';

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

    <div className='relative ml-8'>
      {/* Enhanced Vertical Connector Line */}
            {(comment.replies && comment.replies.length >= 1 ) && !isCollapsed && (
                <div
                    className={`absolute transition-colors duration-200 ${
      isConnectorHovered ? "bg-primary w-[2px]" : "bg-border w-[1px]"
    }`}
    style={{
      left: "20px", // Centered under the 40px avatar
      top: "40px",   // Starts below the avatar
      bottom: "0px", // Extends to the bottom of this comment's space to meet children
      height: '15%',
      zIndex: 10,
    }}

                    onMouseEnter={() => setIsConnectorHovered(true)}
                    onMouseLeave={() => setIsConnectorHovered(false)}
                />
            )}

{/* Child Branch Connector */}
{level > 0 && (
  <>
    {/* The Horizontal Branch & Curve */}
    <div
      className={`absolute border-l border-b transition-colors duration-200 ${
        parentConnectorHovered ? "border-primary" : "border-border"
      }`}
      style={{
        left: "-12px",        // Matches the 'left: 20px' of the parent trunk
        top: "0px",
        width: "10px",        // Bridges the gap to the child avatar
        height: "60%",       // Ends at the vertical center of the child avatar
        borderBottomLeftRadius: isLast ? "12px" : "0px",
      }}
    />

    {/* Continuation Line: If this isn't the last child, keep the vertical line going */}
    {!isLast && (
      <div
        className={`absolute border-l transition-colors duration-200 ${
          parentConnectorHovered ? "border-primary" : "border-border"
        }`}
        style={{
          left: "-20px",
          top: "20px",
          bottom: "-16px",
        }}
      />
    )}
  </>
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
                  {comment.is_deleted ? 'Deleted by moderator' : 'This comment has been moderated.'}
                </span>
              </motion.div>
            )}

            {!isAdmin && comment.is_moderated && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-xs text-orange-700">
                  {'This comment has been moderated.'}
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
                  {comment.vote_score >=1 ? `+${comment.vote_score}` : ''}
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

                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4" />
                </Button> */}
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
    </div>
  );
}
export { CommentItem };
