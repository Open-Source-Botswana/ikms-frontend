// app/language/folklore/riddles/[id]/page.tsx

/**
 * [] - add a comments section
 *
 *
 */
'use client';

import { supabase } from '@/app/utils/supabase/supabase';
import { RiddleItem } from '@/lib/types/folklore';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { AlertCircle, ChevronLeft, Eye, MessageSquare, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAdmin } from '@/app/hooks/use-admin';
import CommentsSection from '@/app/components/shared/langauges/comments-section';

export default function RiddleDetailPage() {
  // const params = useParams<{ id: string }>();
  // const { id } = params;
  const params = useParams();
  const isAdmin = useAdmin()

  // const siteId = params.siteId as unknown as number;
  const id = params.riddleId as string;

  const [riddle, setRiddle] = useState<RiddleItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Use ref to track if component is mounted
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      console.log('Component unmounted, cleaning up...');
    };
  }, []);

  const fetchRiddle = useCallback(async () => {
    // Don't fetch if no ID or component is unmounted

    if (!id || !isMounted.current) return;

    setLoading(true);
    setError(null);

    try {
      //console.error('Fetching riddle from Supabase with ID:', id);

      // Create timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const { data, error: supabaseError } = await supabase
          .from('language_riddles_items')
          .select('*')
          .eq('id', id)
          .single();

        // Clear timeout
        clearTimeout(timeoutId);

        if (controller.signal.aborted) {
          throw new Error('Request timed out after 10 seconds');
        }

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          throw new Error(supabaseError.message || 'Failed to fetch riddle');
        }

        if (!data) {
          throw new Error(`Riddle not found ${id}`);
        }

        // Only update state if component is still mounted
        if (isMounted.current) {
          setRiddle(data);
        }

      } catch (err) {
        // Clear timeout on error
        clearTimeout(timeoutId);

        if (controller.signal.aborted) {
          throw new Error('Request timed out after 10 seconds');
        }
        throw err;
      }

    } catch (err) {
      console.error('Failed to fetch riddle:', err);

      // Only set error if component is still mounted
      if (isMounted.current) {
        setError(err instanceof Error ? err : new Error('Failed to load riddle'));
      }
    } finally {
      // Only set loading to false if component is still mounted
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [id]); // Only depend on id

  // Fetch riddle when id changes
  useEffect(() => {
    if (id) {
      fetchRiddle();
    } else {
      // Handle case where id is not available
      setError(new Error('Invalid riddle ID'));
      setLoading(false);
    }
  }, [id, fetchRiddle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading riddle...</p>
        </div>
      </div>
    );
  }

  if (error || !riddle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Riddle Not Found</AlertTitle>
          <AlertDescription>
            {error?.message || 'The riddle you requested could not be found.'}
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link href="/language/folklore/riddles">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Riddles
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/language" className="text-primary hover:underline">
                Language Learning
              </Link>
            </li>
            <li>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link href="/language/folklore" className="text-primary hover:underline">
                Folklore
              </Link>
            </li>
            <li>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link href="/language/folklore/riddles" className="text-primary hover:underline">
                Riddles
              </Link>
            </li>
            <li>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="font-medium text-foreground">Riddle #{riddle?.id?.slice(0, 8)}</span>
            </li>

          </ol>
        </nav>
        {/* <Button asChild className="w-full sm:w-auto">
              <Link href="/language/folklore/riddles">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to All Riddles
              </Link>
            </Button> */}

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-4xl mb-2">🤔</div>
                <div className="flex flex-wrap gap-2">
                  {(riddle.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {riddle.category || 'Unknown'}
                </span>
                <div className="mt-2 text-sm text-muted-foreground">
                  Created: {riddle.created_at ? new Date(riddle.created_at).toLocaleDateString() : 'Unknown date'}
                </div>
              </div>
            </div>
          </div>

          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-2xl font-bold text-foreground">
              {riddle.question || 'Riddle question not available'}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 pt-0 space-y-6">
            {riddle.context && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700">
                  <span className="font-medium">Context:</span> {riddle.context}
                </p>
              </div>
            )}

            {riddle.usage && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  <span className="font-medium">Usage:</span> {riddle.usage}
                </p>
              </div>
            )}

            {!showAnswer ? (
              <Button
                onClick={() => setShowAnswer(true)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium mt-2"
              >
                <Eye className="mr-2 h-5 w-5" />
                Reveal Answer
              </Button>
            ) : (
              <div className="bg-muted rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-2 flex items-center">
                  <span className="mr-2">💡</span>
                  The Answer Is:
                </h3>
                <p className="text-3xl font-bold text-primary mb-4">
                  {riddle.answer || 'Answer not available'}
                </p>
              </div>
            )}

            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-muted-foreground" />
                Discussion
              </h3>
              <p className="text-muted-foreground">
                What did you think of this riddle? Share your thoughts or ask questions about the meaning and context.
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-6 bg-card/50 border-t flex flex-col sm:flex-row justify-between gap-4">
            {/* <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                Helpful (42)
              </Button>
              <Button variant="outline" className="flex items-center gap-2 text-destructive">
                <ThumbsDown className="h-4 w-4" />
                Not Helpful (3)
              </Button>
            </div> */}

            <Link href={`/languages/setswana/folklore/riddles/feedback/${riddle.id}`}>
              <Button variant="outline">💬 Send Feedback</Button>
            </Link>


          </CardFooter>
        </Card>


        {/* Quick Links */}
        {/* <section className="max-w-6xl mx-auto px-4 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">

          <Link href="/languages/setswana/folklore/riddles/feedback">
            <Button variant="outline">💬 Send Feedback</Button>
          </Link>
        </div>
      </section> */}


        <section id="comments-section">
          <CommentsSection />

        </section>

        {/* Related Riddles Section */}
        {isAdmin &&
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">More Riddles to Try</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Another challenging riddle...</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Try this one next to continue your riddle journey!</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Riddle</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>}
      </div>
    </div>
  );
}
