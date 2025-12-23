'use client';

import { useState } from 'react';
import { FeedbackItem, FeedbackStatus } from '@/lib/types/folklore';
import { FeedbackService } from '@/app/utils/supabase/supabase';
import Swal from 'sweetalert2';
import { delay } from '@/app/utils/delay';

interface ModerationPayload {
  status: FeedbackStatus;
  comment?: string;
}

export function useFeedbackModeration(
  feedback: FeedbackItem,
  onUpdated: (updated: FeedbackItem) => void
) {
  const [isloading, setIsLoading] = useState(false);

  const moderate = async ({ status, comment }: ModerationPayload) => {
    if (isloading) return;
    setIsLoading(true);

    try {
     await FeedbackService.updateFeedbackStatus(
        feedback.id,
        status,
        comment
      );

      onUpdated({
        ...feedback,
        status_enum: status,
        status_comment: comment,
      });


       const emailPromise = fetch('/api/send-vetting-email', {
        method: 'POST',
        body: JSON.stringify({
            replyComment: comment,
            useremail: feedback.useremail,
          commentId: feedback.id,
          status,
          commentReference: feedback.message,
        }),
      });

       await Promise.all([
        emailPromise,
        delay(3500),
      ]);

        await Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: 'The feedback status was updated successfully.',
        timer: 5000,
        showConfirmButton: false,
      });

      return true;
    }catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong while updating the feedback.',
      });
      throw error;}
    finally {
      setIsLoading(false);
    }
  };

  return { moderate, isloading };
}
