/**
 * Comment Input Component
 * Reusable input for adding comments and replies
 */

import React, { useState } from 'react';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { Send } from 'lucide-react';

interface CommentInputProps {
  placeholder?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  userAvatar: string;
  autoFocus?: boolean;
}

export function CommentInput({
  placeholder = 'What are your thoughts?',
  onSubmit,
  onCancel,
  userAvatar,
  autoFocus = false,
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
    setIsFocused(false);
  };

  const handleCancel = () => {
    setContent('');
    setIsFocused(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <img
        src={userAvatar}
        alt="Your avatar"
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 space-y-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="min-h-[80px] resize-y"
        />
        {(isFocused || content) && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!content.trim()}
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Comment
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
