
export type ModerationTag =
  | 'unappropriate'
  | 'vulgar'
  | 'out_of_reference'
  | 'cultural_misinterpretation'
  | 'spam'
  | 'harassment'
  | 'inappropriate'
  | 'off-topic'
  | 'misinformation'
  | 'other';

export interface FolkloreComment {
  id: string
  parent_id:string | null
  item_id: string
  content: string
  author_name?: string
  author_id: string //reference to auth.users id
  is_deleted: boolean
  is_moderated: boolean
  created_at: Date | null
  updated_at: Date | null
  replies?: FolkloreComment[]
  vote_score: number
  avatar?: string
}

export interface ModerationRecord {
  commentId: string
  adminId: string
  feedback: string
  tags: ModerationTag[]
}

export interface FolkloreCommentDTO {
  id: string
  item_id: string
  parent_id: string | null
  content: string
  author: string
  avatar_url?: string
  created_at: string
  vote_score: number
  is_deleted: boolean
}

interface ModerateCommentDTO {
  feedback: string
  tags: ModerationTag[]
}

/**
 * Moderation Types
 * Type definitions for comment moderation system
 */

export type ModerationAction = 'approve' | 'hide' | 'flag' | 'warn' | 'delete';

export type ModerationStatus = 'pending' | 'approved' | 'hidden' | 'flagged' | 'warned' | 'deleted';

export interface ModerationRecord {
  id?: string;
  comment_id: string;
  moderator_id: string;
  action: ModerationAction;
  tags: ModerationTag[];
  feedback: string;
  created_at: Date;
  email_sent: boolean;
}

export interface ModerationActionPayload {
  comment_id: string;
  action: ModerationAction;
  tags: ModerationTag[];
  feedback: string;
  notify_user?: boolean;
}

export interface ModerationState {
  isProcessing: boolean;
  error: string | null;
  success: boolean;
  lastAction: ModerationAction | null;
}

export interface CommentWithModeration {
  id: string;
  content: string;
  author_id: string;
  author_name?: string;
  is_moderated: boolean;
  is_deleted: boolean;
  moderation_status?: ModerationStatus;
  moderation_reason?: string;
  moderation_tags?: ModerationTag[];
  created_at: Date | null;
  updated_at: Date | null;
  replies?: CommentWithModeration[];
  parent_id: string | null;
  item_id: string;
  vote_score: number;
  avatar?: string;
}

export interface EmailDispatchPayload {
  recipient_email: string;
  comment_id: string;
  action: ModerationAction;
  reason: string;
  moderator_name: string;
}

export interface CommentVisibilityRules {

  showModeratedToUsers: false;
  showModeratedToAdmins: true;
  hideChildrenOfModerated: true;
  allowAdminOverride: true;
}
