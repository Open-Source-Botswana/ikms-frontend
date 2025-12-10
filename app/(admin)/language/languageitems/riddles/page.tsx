'use client';
import { supabase } from '@/app/utils/supabase/supabase';
import React, { useEffect, useState, useCallback } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Loader2, AlertCircle, Database, Plus, Save, X } from 'lucide-react';
import Link from 'next/link';

// Updated interface to match the new table structure
interface RiddleItem {
  id: string;
  category: string;
  language: string;
  question: string;
  answer: string;
  context?: string;
  usage?: string;
  tags: string[];
  version: number;
  created_at: string;
  updated_at: string;
}

// Error boundary component for better error handling
const ErrorBoundary = ({ error, onReset }: { error: Error; onReset: () => void }) => (
  <div className="max-w-2xl mx-auto p-6">
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Loading Data</AlertTitle>
      <AlertDescription>
        <p className="mb-2">{error.message}</p>
        <p className="mb-4 text-sm text-muted-foreground">
          This could be due to network issues, database connection problems, or invalid data structure.
        </p>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </AlertDescription>
    </Alert>
  </div>
);

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="max-w-2xl mx-auto p-6">
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  </div>
);

// Empty state component
const EmptyState = ({ onRefresh }: { onRefresh: () => void }) => (
  <div className="max-w-2xl mx-auto p-6 text-center">
    <div className="flex flex-col items-center justify-center py-12">
      <Database className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">No Riddles Found</h3>
      <p className="text-sm text-gray-500 mb-4">
        There are no riddles in the database yet, or there might be a filtering issue.
      </p>
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Refresh Data
      </button>
    </div>
  </div>
);

// Add Riddle Form Component
const AddRiddleForm = ({ onRiddleAdded }: { onRiddleAdded: () => void }) => {
  const [formData, setFormData] = useState({
    category: 'logic',
    language: 'en',
    question: '',
    answer: '',
    context: '',
    usage: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Parse tags from comma-separated string to array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Validate required fields
      if (!formData.question.trim() || !formData.answer.trim()) {
        throw new Error('Question and answer are required');
      }

      console.log('Submitting riddle:', {
        category: formData.category,
        language: formData.language,
        question: formData.question,
        answer: formData.answer,
        context: formData.context || null,
        usage: formData.usage || null,
        tags: tagsArray,
      });

      const { data, error: supabaseError } = await supabase
        .from('language_riddles_items')
        .insert({
          category: formData.category,
          language: formData.language,
          question: formData.question,
          answer: formData.answer,
          context: formData.context || null,
          usage: formData.usage || null,
          tags: tagsArray,
        })
        .select();

      if (supabaseError) {
        console.error('Supabase insert error:', supabaseError);
        throw new Error(`Failed to save riddle: ${supabaseError.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error('No data returned after insert');
      }

      console.log('Riddle successfully added:', data[0]);
      setSuccess(true);
      onRiddleAdded();

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          category: 'logic',
          language: 'en',
          question: '',
          answer: '',
          context: '',
          usage: '',
          tags: '',
        });
        setSuccess(false);
      }, 2000);

    } catch (err) {
      console.error('Failed to add riddle:', err);
      setError(err instanceof Error ? err.message : 'Failed to add riddle');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg border p-6 mb-8 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-500" />
          Add New Riddle
        </h2>
        {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <span>✓</span>
            <span>Riddle added successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="logic">Logic</option>
              <option value="nature">Nature</option>
              <option value="wordplay">Wordplay</option>
              <option value="math">Math</option>
              <option value="everyday">Everyday</option>
              <option value="animal">Animal</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
            Question *
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What has keys but cannot open locks?"
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
            Answer *
          </label>
          <input
            id="answer"
            name="answer"
            type="text"
            value={formData.answer}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="piano"
            required
          />
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-1">
            Context (Optional)
          </label>
          <textarea
            id="context"
            name="context"
            value={formData.context}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="This riddle plays on the double meaning of 'keys' - referring to piano keys rather than door keys."
          />
        </div>

        <div>
          <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-1">
            Usage/Example (Optional)
          </label>
          <textarea
            id="usage"
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Common brain teaser used in puzzle games and team-building activities."
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="music, brain-teaser, wordplay"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: music, brain-teaser, wordplay
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setFormData({
              category: 'logic',
              language: 'en',
              question: '',
              answer: '',
              context: '',
              usage: '',
              tags: '',
            })}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            <X className="h-4 w-4 inline-block mr-1" />
            Clear
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              loading
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Add Riddle
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function RiddlePage() {
  const [riddles, setRiddles] = useState<RiddleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch riddles with proper error handling
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

      setRiddles(data);

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

  // Initial fetch and cleanup
  useEffect(() => {
    fetchRiddles();

    // Cleanup function
    return () => {
      console.log('Component unmounted, cleaning up...');
    };
  }, [fetchRiddles]);

  // Handle retry
  const handleRetry = () => {
    if (!isRefreshing) {
      fetchRiddles();
    }
  };

  // Handle riddle added event
  const handleRiddleAdded = () => {
    fetchRiddles(); // Refresh the list after adding a new riddle
  };

  // Debug information component
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

  // Handle error boundary
  if (error) {
    return <ErrorBoundary error={error} onReset={handleRetry} />;
  }

  // Show loading skeleton
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <DebugInfo />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Riddles Management</h1>
        <p className="text-gray-600">
          Total riddles: {riddles.length}
        </p>
      </div>

      {/* Add Riddle Form Section */}
      <AddRiddleForm onRiddleAdded={handleRiddleAdded} />

      {/* Riddles List */}
      {riddles.length === 0 ? (
        <EmptyState onRefresh={handleRetry} />
      ) : (
        <div className="space-y-4">
          {riddles.map((riddle) => (
               <Link key={riddle.id} href={`/language/languageitems/riddles/${riddle.id}`}>
            <div
              key={riddle.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-gray-900">
                    🤔 {riddle.question?.substring(0, 60)}{riddle.question?.length > 60 ? '...' : ''}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {riddle.category}
                    </span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {riddle.language.toUpperCase()}
                    </span>
                    {riddle.tags && riddle.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800`}>
                  v{riddle.version}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Answer:</span> {riddle.answer || 'N/A'}
                  </p>
                  {riddle.context && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Context:</span> {riddle.context}
                    </p>
                  )}
                </div>
                <div>
                  {riddle.usage && (
                    <p className="text-gray-600">
                      <span className="font-medium">Usage:</span> {riddle.usage}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Created: {new Date(riddle.created_at).toLocaleDateString()}</span>
                  <span>Updated: {new Date(riddle.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleRetry}
          disabled={isRefreshing || loading}
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            isRefreshing || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <Database className="h-4 w-4" />
              Refresh Data
            </>
          )}
        </button>
      </div>
    </div>
  );
}
