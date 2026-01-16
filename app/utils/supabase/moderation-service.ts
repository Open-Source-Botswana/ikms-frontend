/**
 * Moderation Service
 * Handles all moderation-related operations with Supabase
 */

import {
  ModerationAction,
  ModerationActionPayload,
  EmailDispatchPayload,
  ModerationRecord
} from '@/lib/types/comments';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!)

export class ModerationService {

  static TABLE = "comment_moderation"
  static async moderateComment(payload: ModerationActionPayload): Promise<ModerationRecord> {
    try {


      const moderationRecord = await this.createModerationRecord(payload);

      return {
        ...moderationRecord,
      };
    } catch (error) {
      console.error('Moderation error:', error);
      throw error;
    }
  }


  private static async updateCommentModetationStatus(
    commentId: string,
    action: ModerationAction
  ): Promise<{ success: boolean; error?: string }> {
    try {

      await new Promise(resolve => setTimeout(resolve, 500));

      // Mappinig action to database fields
      const updates: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };

      switch (action) {
        case 'hide':
        case 'flag':
        case 'warn':
          updates.is_moderated = true;
          break;
        case 'delete':
          updates.is_deleted = true;
          updates.is_moderated = true;
          break;
        case 'approve':
          updates.is_moderated = false;
          break;
      }

      await new Promise(resolve => setTimeout(resolve, 300));

      const {data, error} = await supabase
          .from('folklore_comments')
            .update({
              is_moderated: updates.is_moderated,
              updated_at: updates.updated_at,
              is_deleted: updates.is_deleted ?? false,
            })
            .eq('id', commentId)
            .select()
            .single()

          if (error) { throw error; }

          if (!data) {
            throw new Error('No data returned from update operation');
          }

      console.log('[ModerationService] Updating comment:', commentId, updates);

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   *  moderation record for audit trail
   */
  private static async createModerationRecord(
    payload: ModerationActionPayload
  ): Promise<ModerationRecord> {
    try {

      await new Promise(resolve => setTimeout(resolve, 300));

        const {data, error} = await supabase
        .from(this.TABLE)
        .insert({
          comment_id: payload.comment_id,
          moderator_id: '62d571c5-4b25-4ec3-883e-1f5636542de6', // to update to get this from auth context
          action: payload.action,
          feedback: payload.feedback,
          tags: payload.tags,
        })
        .select()
        .single()

      if (error) { throw error; }

      if (!data) {
        throw new Error('No data returned from insert operation');
      }

      console.log('[ModerationService] Created moderation record:', data);

      // update comment status
      await this.updateCommentModetationStatus(payload.comment_id, payload.action);
      // defensive programming for failure in updating the comment and email dispatch

      let emailSent = false;
      let emailError: string | undefined;

      if (payload.notify_user) {
        const emailResult = await this.dispatchModerationEmail({
          recipient_email: 'samuelkabelo1@gmail.com', // update to get comment author's email after integrating user system
          comment_id: payload.comment_id,
          action: payload.action,
          reason: payload.feedback,
          moderator_name: 'Admin', // to admin name from auth context
        });
        emailSent = emailResult.success;
        emailError = emailResult.error;
      }

      return data;
    } catch (error) {
      throw new Error('Failed to create moderation record');
    }
  }


  private static async dispatchModerationEmail(
    payload: EmailDispatchPayload
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate email dispatch - in real app, use email service (SendGrid, Resend, etc.)
      await new Promise(resolve => setTimeout(resolve, 800));

      const res = await fetch('/api/send-moderation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });


      // Simulate 10% failure rate when testing
      // if (Math.random() < 0.1) {
      //   throw new Error('Email service unavailable');
      // }

      const result = await res.json();
      if (result.error) {
        throw new Error('Email service unavailable');
      }

      return { success: true };
    } catch (error: any) {
      console.error('[ModerationService] Email dispatch failed:', error);
      return { success: false, error: error.message };
    }
  }


  /**
   * Fetch moderation history for a comment
   */
  static async getModerationHistory(commentId: string): Promise<ModerationRecord[]> {
    try {

      await new Promise(resolve => setTimeout(resolve, 300));
      const {data, error} = await supabase
        .from(this.TABLE)
        .select('*')
        .eq('comment_id', commentId)
        .order('created_at', { ascending: false });
      if (error) { throw error; }

      if (data) {
        return data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch moderation history:', error);
      return [];
    }
  }

  /**
   * Batch moderation action for multiple comments
   */
  static async batchModerate(
    commentIds: string[],
    action: ModerationAction,
    feedback: string
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const commentId of commentIds) {
      try {
        await this.moderateComment({
          comment_id: commentId,
          action,
          tags: [],
          feedback,
          notify_user: false,
        });
        success++;
      } catch (error) {
        failed++;
      }
    }

    return { success, failed };
  }

  /**
   * [] TODO: Check if user has admin/moderator permissions
   */
  static async checkModeratorPermissions(userId: string): Promise<boolean> {
    try {

      await new Promise(resolve => setTimeout(resolve, 200));

      // check Supabase RLS policies and auth context
      return true;
    } catch (error) {
      return false;
    }
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
