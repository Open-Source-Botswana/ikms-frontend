'use client';

import { Loader2, User, X } from 'lucide-react';
import { Button } from '../button';


import {  useCallback, useEffect, useState } from 'react';
import { FeedbackItem } from '@/lib/types/folklore';
import Swal from 'sweetalert2';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: FeedbackItem;
}

type SwalStatus = 'success' | 'error';

interface SwalOptions {
  status: SwalStatus;
  title: string;
  text: string;
}



export default function ReplyModal({
  isOpen,
  onClose,
  comment,
}: ReplyModalProps) {
  const [replyComment, setReplyComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

const showSwal = ({ status, title, text }: SwalOptions) => {
  Swal.fire({
    position: 'center',
    icon: status,
    title,
    text,
    showConfirmButton: false,
    timer: status === 'success' ? 5000 : 8000,
  });
};

//   useEffect(() => {

//      if (isSubmitting) {
//         setTimeout(() => {
//             handleReply()
//           setIsSubmitting(false);
//         }, 10000);
//     }
//   }, [isSubmitting]);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleReply = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {

      const res = await fetch('/api/send-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          replyComment,
          commentId: comment.id,
          commentReference: comment.message,
          useremail: comment.useremail,
        }),
      }).then(res=>res.json());

      const [result] = await Promise.all([res, delay(8000)]);

    //   const result = await res.json();
      if (result.error) {
             showSwal({
        status: 'error',
        title: 'Reply Failed',
        text: 'Failed to send support reply.',
      });
      return;
      }


        showSwal({
      status: 'success',
      title: 'Support reply sent successfully!',
      text: 'Support reply has been sent to the user email.',
    });
      onClose();
    } catch (error) {
        //console.error('Error sending reply:', error);
            showSwal({
      status: 'error',
      title: 'Unexpected Error',
      text: 'Something went wrong while sending the reply. Please try again.',
    });

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCancel = () => {
    setReplyComment('');
    setIsFocused(false);
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if(isSubmitting)return;
        if(!replyComment.trim()) return;
        handleReply();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };
  const placeholder = 'Replying to comment...';

  if (!isOpen) return null;

if (isSubmitting) {
      return (
             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 min-h-screen flex items-center justify-center">

        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className='text-lg'>Sending Reply...</p>
      </div>
        )
    }
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      id="replyModal"
      aria-labelledby="replyModalLabel"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-screen-md mx-4 bg-white rounded-2xl shadow-2xl border border-sky-100 max-h-[90vh] overflow-y-auto">
        <div className="relative p-10 pb-4">
          {/* Header */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4" id="replyModalLabel">
              Replying to: {comment.useremail}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-4 right-4 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              disabled={!isOpen}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Modal body */}
          <div className="space-y-4">
            <p>{comment.id}</p>
            <ul className="list-disc md:list-item space-y-2">
              <li>Subject Comment: {comment.message}</li>
            </ul>
          </div>

          {/* input */}
          <div className="flex gap-3 p-4 pb-2">
            <img
              src={
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
              }
              alt="Your avatar"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 bg-slate-300/50 rounded-lg px-3 py-2 border border-transparent focus-within:border-sky-500 transition-all">
              <textarea
                value={replyComment}
                onChange={e => setReplyComment(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={1}
                className="
                w-full bg-transparent border-none outline-none resize-none
                text-foreground placeholder:text-muted-foreground
                text-sm min-h-[24px] leading-6
              "
                style={{
                  height: 'auto',
                  minHeight: '24px',
                  maxHeight: '120px',
                  overflowY:
                    replyComment.split('\n').length > 4 ? 'auto' : 'hidden',
                }}
                onInput={e => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height =
                    Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <Button
              size="lg"
              variant="outline"
              className="text-base rounded-3xl"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleReply}
              disabled={isSubmitting || replyComment.trim().length === 0}
            >
              {' '}
             {isSubmitting ? 'Sending Reply...' : 'Send Reply'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
