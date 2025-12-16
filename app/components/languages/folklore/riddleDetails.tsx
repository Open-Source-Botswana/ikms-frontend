
'use client';

import React, { useState } from 'react';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Loader2, Eye, MessageSquare, ThumbsUp, ThumbsDown, ChevronLeft, Pencil } from 'lucide-react';
import { RiddleItem } from '@/lib/types/folklore';

import { useAdmin } from '@/app/hooks/use-admin';
import { RiddleForm } from './riddleForm';

interface RiddleDetailProps {
  item: RiddleItem;
  onBack: () => void;
  onUpdate: (updated: RiddleItem) => void;
}

export function RiddleDetail({ item ,onBack,onUpdate}: RiddleDetailProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isAdmin } = useAdmin();


if (!item) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>
          Riddle not found.
        </AlertDescription>
      </Alert>
    );
  }

    if (isEditing && isAdmin) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Edit Riddle</CardTitle>
        </CardHeader>

        <CardContent>
          <RiddleForm
            mode="edit"
            riddleId={item.id}
            initialData={{
              category: item.category,
              language: item.language,
              question: item.question,
              answer: item.answer,
              context: item.context,
              usage: item.usage,
              tags: item.tags,
            }}
            onSuccess={(updatedRiddle) => {
              onUpdate(updatedRiddle)
              setIsEditing(false);
            }}
          />
        </CardContent>

        <CardFooter>
          <Button
            variant="ghost"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
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

            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">

        {isAdmin &&
               <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
        <Pencil className="h-4 w-4 mr-1" />
        Edit
      </Button>}
        <Button variant="secondary" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Share Feedback
        </Button>
      </CardFooter>
    </Card>
  );
}
