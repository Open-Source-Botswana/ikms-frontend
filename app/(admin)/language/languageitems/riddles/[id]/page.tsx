'use client';
import { CommentSection } from '@/app/components/languages/folklore/commentSection';
import { RiddleDetail } from '@/app/components/languages/folklore/riddleDetails';
import { Card } from '@/app/components/ui/card';
import { FolkloreRiddlesService } from '@/app/utils/supabase/supabase';
import { CommentItem, RiddleItem } from '@/lib/types/folklore'
import { Loader2, MessageSquare } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'


interface Comments {
  id: string
  replies: CommentItem[]
}

export default function RiddleDetailView() {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<Comments[]>([])
    const [riddle, setRiddle] = useState<RiddleItem | null>(null);
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

    const fetchRiddle = useCallback(async () => {
        if (!id) return null;
        setIsLoading(true);
        try {
          const res = await FolkloreRiddlesService.getRiddleItemById(id);
          setRiddle(res);
        } catch (error) {
          console.error('Error fetching riddle:', error);
        } finally {
          setIsLoading(false);
        }
    },[id])


    useEffect(() => {
        fetchRiddle();
    }, [fetchRiddle]);



    if (isLoading || !riddle) {
      return (
             <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
        )
    }
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


        <RiddleDetail item={riddle!} onUpdate={setRiddle} onBack={()=>router.back()}/>

        <div className="mt-12 space-y-4">
            <CommentSection riddleId={id} riddleTitle={riddle.question} />
        </div>

        </div>
    </div>
  )
}
