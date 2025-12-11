'use client'

import { RiddlesList } from '@/app/components/languages/folklore/riddlesList'
import { Button } from '@/app/components/ui/button'
import { supabase } from '@/app/utils/supabase/supabase'
import { RiddleItem } from '@/lib/types/folklore'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

type LessonParams = {
  unitId: string
}
export default function FolklorePage() {
      const params = useParams<LessonParams>()
      const { unitId } = params // riddles, idioms, proverbs
      const folklorelanguageId = 'en'
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<Error | null>(null);
        const [isRefreshing, setIsRefreshing] = useState(false);

        const [riddles, setRiddles] = useState<RiddleItem[]>([]);

  const fetchRiddles = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsRefreshing(true);

    try {
      console.log('Fetching riddles from Supabase...');

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out after 10 seconds')), 10000);
      });

      const fetchPromise = supabase
        .from('language_riddles_items')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error: supabaseError, status, statusText } = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]) as any;

      console.log('Supabase response:', { data, supabaseError, status, statusText });

      if (supabaseError) {
        console.error('Supabase error details:', supabaseError);
        throw new Error(`Database error: ${supabaseError.message || 'Unknown error'}`);
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: Expected array but received something else');
      }

      console.log(`Successfully loaded ${data.length} riddles`);

      // Set riddles regardless of length - even if empty array
      setRiddles(data);
      setLoading(false);

    } catch (err) {
      console.error('Failed to load riddles:', err);

      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unexpected error occurred while fetching riddles'));
      }

      // Set empty array on error to clear previous data
      setRiddles([]);

    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

    const fetchIdioms = useCallback(async () => {

    setLoading(false);
  }, []);

  const fetchProverbs = useCallback(async () => {

    setLoading(false);
  }, []);

  const handleRefresh = () => {
    if (!isRefreshing) {
      switch (unitId) {
        case 'riddles':
          fetchRiddles();
          break;
        case 'idioms':
          fetchIdioms();
          break;
        case 'proverbs':
          fetchProverbs();
          break;
      }
    }
  };

  useEffect(() => {
      fetchRiddles();

      // Cleanup function
      return () => {
        console.log('Component unmounted, cleaning up...');
      };
    }, [fetchRiddles]);

  const DebugInfo = () => {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
          <h4 className="font-medium mb-2">Debug Information:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Total riddles loaded: {riddles.length}</li>
            <li>Loading state: {loading ? 'true' : 'false'}</li>
            <li>Error state: {error ? 'Active' : 'None'}</li>
            <li>Table name: language_riddles_items</li>
          </ul>
        </div>
      );
    }
    return null;
  };

  const getPageContent = () => {
    switch (unitId) {
      case 'riddles':
        return {
          title: 'Riddle Collection',
          description: 'Challenge your mind with these clever riddles that test your logic and creativity.',
          component: unitId === 'riddles' ?
           <RiddlesList
              items={riddles}
              loading={loading}
              error={error}
              onRefresh={handleRefresh}  /> : null
        };
      case 'idioms':
        return {
          title: 'Idiom Collection',
          description: 'Explore the rich world of idioms and their cultural meanings.',
          component: <div>Idiom details coming soon...</div>
        };
      case 'proverbs':
        return {
          title: 'Proverb Collection',
          description: 'Discover timeless wisdom from proverbs around the world.',
          component: <div>Proverb details coming soon...</div>
        };
      default:
        return {
          title: 'Folklore Collection',
          description: 'Explore traditional wisdom and cultural expressions.',
          component: <div>Content coming soon...</div>
        };
    }
  };
  const { title, description, component } = getPageContent();

return (
    <div className="min-h-screen bg-background mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <span className="font-medium text-foreground capitalize">{unitId}</span>
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              <p className="text-lg text-muted-foreground mt-2">{description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                disabled={isRefreshing || loading}
                className="flex items-center gap-2"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Loader2 className="h-4 w-4" />
                )}
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button asChild variant="secondary">
                <Link href="/language/folklore">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Folklore
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          {unitId === 'riddles' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-card border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{riddles.length}</div>
                <div className="text-sm text-muted-foreground">Total Riddles</div>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{Math.floor(riddles.length * 0.3)}</div>
                <div className="text-sm text-muted-foreground">Easy Riddles</div>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.floor(riddles.length * 0.7)}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
           <DebugInfo />
          {component}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center border-t pt-8">
          <Button asChild variant="outline">
            <Link href="/language/folklore">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Folklore Collection
            </Link>
          </Button>
          {unitId === 'riddles' && (
            <Button asChild>
              <Link href="/language/folklore/riddles/random">
                <Sparkles className="h-4 w-4 mr-2" />
                Random Riddle Challenge
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper components for icons
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12.6L4.6 14 6 14.6 5.4 16 4 16.6 3.4 18 2 18.6 1.4 20 0 20.6 3.4 22 4 22"/>
    <path d="M20 12.6l-.6 1.4-1.4.6.6 1.4L20 16.6l.6 1.4 1.4.6-.6 1.4 1.4.6.6 1.4-3.4 1.4L20 22"/>
    <path d="M12 4.6l-.6 1.4-1.4.6.6 1.4L12 8.6l.6 1.4 1.4.6-.6 1.4 1.4.6.6 1.4-3.4 1.4L12 22l3.4-1.4L16 20l-.6-1.4 1.4-.6L17.4 16 16 15.4l-.6-1.4 1.4-.6L17.4 12 16 11.4l-.6-1.4 1.4-.6L17.4 8 16 7.4l-.6-1.4 1.4-.6L17.4 4 16 3.4l-.6-1.4L12 0.6 8.6 2 8 2"/>
  </svg>
);
