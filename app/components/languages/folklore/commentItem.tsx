'use client';
import { useAdmin } from '@/app/hooks/use-admin';
import { FeedbackItem } from '@/lib/types/folklore';
import React, { useState } from 'react'
import { Card, CardContent } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { CheckCircle, MessageSquare, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react';
import { Button } from '../../ui/button';

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

   const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

    const handleStatusChange = async (newStatus: 'approved' | 'rejected') => {
    try {
          console.error('To update status:', newStatus);
    //   setLoading(true);
    //   await FeedbackService.updateFeedbackStatus(comment.id, newStatus);
      // In a real app, you'd update the local state or refetch
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
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
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comment.status?.toString() || '')}`}>
                {comment.status &&comment.status?.charAt(0).toUpperCase() + comment.status?.slice(1)}
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
                onClick={() => {}}
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
                  variant={comment.status === 'approved' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('approved')}
                  disabled={loading}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant={comment.status === 'rejected' ? 'destructive' : 'outline'}
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
  )
}
