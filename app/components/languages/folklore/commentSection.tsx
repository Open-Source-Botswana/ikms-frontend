

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ArrowDown, Loader2, MessageSquare } from 'lucide-react';
import { FeedbackForm } from './feedback/feedback-form';
import { LanguageItemType } from '@/lib/types/folklore';
import { toast } from '@/app/hooks/use-toast';
import { FeedbackService } from '@/app/utils/supabase/supabase';
import { Button } from '../../ui/button';
import CommentItem from './commentItem';

interface CommentSectionProps {
  riddleId: string;
  riddleTitle: string;
  riddleCategory:LanguageItemType;
}

export function CommentSection({ riddleId, riddleTitle, riddleCategory }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const newComments = await FeedbackService.getFeedbackByItemId(riddleId);

      if (newComments.length > 0) {
        setComments(prev => [...prev, ...newComments]);
      } else {
        setComments(newComments);
        setHasMore(newComments.length >= 10);
        setPage(1);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      toast({
        title: 'Error loading comments',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {

        setIsLoading(false);

    }
  };


  return (
     <div className="space-y-6">
              <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Discussion ({comments.reduce((total, c) => total + (c.reply_count || 0), comments.length)})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <FeedbackForm
            itemId={riddleId}
            itemCategory={riddleCategory}
            onSuccess={() => {

              loadComments();
            }}
          /> */}
        </CardContent>
      </Card>


      {comments.length === 0 ? (
        <Card className="p-8 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              riddleId={riddleId}
              riddleTitle={riddleTitle}
            //   onReply={handleReply}
            />
          ))}

          {hasMore && (
            <Button
              onClick={() => loadComments()}
              disabled={loadingMore}
              variant="outline"
              className="w-full"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading more comments...
                </>
              ) : (
                <>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Load more comments
                </>
              )}
            </Button>
          )}
        </div>
      )}
     </div>
  )

}
