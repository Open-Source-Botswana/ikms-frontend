/**
 * TODO:
 * - [] Update the action buttons on approval/rejection to reflect current status
 * - [] Add loading states to buttons to prevent multiple clicks
 * - [] Implement error handling and user feedback for status updates
 * - [] Consider adding a confirmation dialog before changing status
 * - [] Write tests for the status update functionality
 * - [] Refactor code for better readability and maintainability
 * - [] Ensure accessibility compliance for status indicators and buttons
 * - [] Optimize performance for large number of comments
 * - [] Add functionality to view and manage replies to comments
 * - [] Integrate email notifications for status changes ------- next
 * - [] Implement pagination or lazy loading for comments section
 * - [] Add user profile links or additional user info in comments
 * - [] Create a management tooltip for editing riddles and verifying comments -------- test if update works
 * - [] Implement a rich text editor for comment replies
 * - [] Add analytics tracking for admin actions on comments
 * - [] Review and update UI/UX for better admin experience
 * - [] Document the code and functionalities for future reference
 * - [] Conduct a security review to ensure only admins can change comment statuses
 * - [] Set up automated deployment to include these changes
 * - [] Plan a rollout strategy for existing comments with pending statuses
 * - [] Gather user feedback on the new admin features for further improvements
 * - [] Schedule regular maintenance checks for the comment management system
 * - [] Explore AI-assisted moderation tools for comment management
 * - [] Ensure compliance with data protection regulations when handling user comments
 * - [] Create a backup system for comments and their statuses
 * - [] Plan for scalability as the number of comments grows
 * - [] Integrate with third-party moderation services if needed
 * - [] Set up a monitoring system to track the performance of the comment management features
 * - [] Review and optimize database queries related to comment fetching and status updates
 * - [] Collaborate with the design team to enhance the visual aspects of the comment section
 * - [] Test the entire workflow from comment submission to admin status updates
 * - [] Prepare a FAQ or help section for admins managing comments
 * - [] Schedule training sessions for admins on using the new features
 * - [] Plan for future feature additions based on admin and user feedback
 * - [] Regularly update dependencies and libraries used in the comment management system
 * - [] Conduct code reviews to maintain code quality and consistency
 * - [] Set up a staging environment to test new features before production deployment
 * - [] Monitor user engagement with comments to assess the impact of admin interventions
 * - [] Continuously improve the system based on analytics and user feedback
 *
 */

'use client';
import { useAdmin } from '@/app/hooks/use-admin';
import { FeedbackItem, FeedbackStatus } from '@/lib/types/folklore';
import React, { useState } from 'react'
import { Card, CardContent } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { CheckCircle, MessageSquare, Reply, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import ReplyModal from '../../ui/modals/reply-modal';
import { FeedbackService } from '@/app/utils/supabase/supabase';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { set } from 'date-fns';


interface CommentItemProps {
  comment: FeedbackItem;
  riddleId: string;
  riddleTitle: string;
//   onReply: (commentId: string, message: string, userEmail?: string) => Promise<void>;
//   onToggleReplies: () => void;
//   isRepliesExpanded: boolean;
}


export default function CommentItem({ comment, riddleId, riddleTitle }: CommentItemProps) {
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useAdmin();
  const [showReplyModal, setShowReplyModal] = useState(false)
    const router = useRouter();

   const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const confirmStatusChange = async (status: FeedbackStatus) => {
    const confirm_dialog = status === 'approved' ? 'Approval' : 'Rejection';
    const text_dialog = status === 'approved' ? 'Approve' : 'Reject';
    const result = await Swal.fire({
      title: `Confirm ${confirm_dialog}`,
      text: `Are you sure you want to ${text_dialog} this feedback?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
    });

    return result.isConfirmed;
  };

    const handleStatusChange = async (newStatus: FeedbackStatus) => {
      if (loading) return;

    const confirmed = await confirmStatusChange(newStatus);
    if (!confirmed) return;
    setLoading(true);
    try {

      await FeedbackService.updateFeedbackStatus(comment.id, newStatus);

      const result = await Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: 'The feedback status was updated successfully.',
        showCancelButton: true,
        confirmButtonText: 'Refresh view',
        cancelButtonText: 'Stay here', timer: 5000
      });

      if (result.isConfirmed) {
        router.refresh();
      }

    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong while updating the feedback.',
      });
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

    const handleCloseModal = () => {
    setShowReplyModal(false)
  }

  const handleReply =()=>{
    setShowReplyModal(true)
  }


  return (
<>
        <Card className="border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                  <div className="flex gap-4">
                              <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.id.slice(0, 8)}`} />
            <AvatarFallback>
              {comment.useremail?.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>

                 <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-foreground">
                  {comment.useremail || 'Anonymous User'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comment.status_enum?.toString() || '')}`}>
                {comment.status_enum &&comment.status_enum?.charAt(0).toUpperCase() + comment.status_enum?.slice(1)}
              </span>
            </div>

             <p className="text-gray-700 mb-3">{comment.message}</p>

                         <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <span>24</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <ThumbsDown className="h-4 w-4" />
                <span>2</span>
              </div>
              <button
              // set a pop up modal
                onClick={() => handleReply()}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
              >
                <MessageSquare className="h-4 w-4" />
                Reply
              </button>
            </div>

                        {isAdmin && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30">
                <Button
                  size="sm"
                  variant={comment.status_enum === 'approved' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('approved')}
                  disabled={loading}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant={comment.status_enum === 'rejected' ? 'destructive' : 'outline'}
                  onClick={() => handleStatusChange('rejected')}
                  disabled={loading}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}

            </div>
                  </div>

            </CardContent>
        </Card>
        <ReplyModal isOpen={showReplyModal} onClose={handleCloseModal} comment={comment}/>

        {/* <ReplyModal isOpen={showReplyModal} onClose={()=>setShowReplyModal(false)} riddleId={riddleId} riddleTitle={riddleTitle} parentComment={comment}/> */}
</>
  )
}
