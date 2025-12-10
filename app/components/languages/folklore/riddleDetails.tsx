// components/folklore/RiddleDetail.tsx
'use client';

import React, { useState } from 'react';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Loader2, Eye, MessageSquare, ThumbsUp, ThumbsDown, ChevronLeft } from 'lucide-react';
// import { useFeedbackStore } from '@/store/feedback.store';
import { RiddleItem } from '@/lib/types/folklore';
import { AdminControls } from './feedback/adminControls';

interface RiddleDetailProps {
  item: RiddleItem;
  onBack: () => void;
}

export function RiddleDetail({ item ,onBack}: RiddleDetailProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
//   const { submitFeedback } = useFeedbackStore();

//   const handleFeedback = async (type: 'helpful' | 'not_helpful') => {
//     setSubmittingFeedback(true);
//     try {
//       await submitFeedback({
//         folklore_id: item.id,
//         feedback_type: type === 'helpful' ? 'meaning' : 'context',
//         original_content: item.answer,
//         suggested_content: type === 'helpful' ? 'This riddle was helpful' : 'This riddle needs improvement',
//         rating: type === 'helpful' ? 5 : 2,
//       });
//     } catch (error) {
//       console.error('Failed to submit feedback:', error);
//     } finally {
//       setSubmittingFeedback(false);
//     }
//   };

if (!item) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>
          Riddle not found.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-2xl font-bold text-foreground">
            {item.question}
          </CardTitle>
        </div>

        {/* {isAdmin && <AdminControls riddleId={item.id} />} */}
         <AdminControls riddleId={item.id} />
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {item.context && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-blue-700"><span className="font-medium">Context:</span> {item.context}</p>
            </div>
          )}

          {item.usage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-green-700"><span className="font-medium">Usage:</span> {item.usage}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {!showAnswer ? (
            <Button
              onClick={() => setShowAnswer(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg font-medium"
              disabled={submittingFeedback}
            >
              <Eye className="mr-2 h-5 w-5" />
              Reveal Answer
            </Button>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Answer:</h3>
              <p className="text-2xl font-bold text-blue-600">{item.answer}</p>

              {/* {item.hints && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                  <p className="text-yellow-700">
                    <span className="font-medium">Hint:</span> {Object.values(item.hints).join(', ')}
                  </p>
                </div>
              )} */}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
        {/* <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            // onClick={() => {handleFeedback('helpful')}}
            disabled={submittingFeedback}
          >
            <ThumbsUp className="h-4 w-4" />
            {submittingFeedback ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Helpful'}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
            // onClick={() => handleFeedback('not_helpful')}
            disabled={submittingFeedback}
          >
            <ThumbsDown className="h-4 w-4" />
            {submittingFeedback ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Not Helpful'}
          </Button>
        </div> */}
        <Button variant="secondary" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Share Feedback
        </Button>
      </CardFooter>
    </Card>
  );
}
