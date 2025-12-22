// components/folklore/RiddlesList.tsx
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { RiddleItem } from '@/lib/types/folklore';
import { Loader2, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface RiddlesListProps {
  items: RiddleItem[];
  loading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

export function RiddlesList({ items, loading, error, onRefresh }: RiddlesListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </CardContent>
            <CardFooter>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Riddles</AlertTitle>
        <AlertDescription>
          <p className="mb-2">{error.message}</p>
          <Button onClick={onRefresh} variant="outline" size="sm">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🤔</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Riddles Found</h3>
        <p className="text-gray-600 mb-4">We couldn't find any riddles in the database. Please check back later.</p>
        <Button onClick={onRefresh} variant="outline">
          <Loader2 className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    );
  }

   const filteredItems = useMemo(() => {
     return items.filter(riddle => !riddle.is_deleted || riddle.is_deleted == null)},[items])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((riddle) => (
        <Link
          key={riddle.id}
        //   href='#'
         href={`/languages/setswana/folklore/riddles/${riddle.id}`}
          className="block"
        >
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-border/50 overflow-hidden h-full flex flex-col"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
              <div className="text-3xl mb-2">🤔</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {riddle.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-bold line-clamp-2">
                {riddle.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {riddle.context || riddle.usage || 'A challenging riddle to test your wit.'}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button
                variant="outline"
                className="w-full group hover:bg-blue-50 transition-colors"
              >
                <span className="flex items-center justify-between w-full">
                  View Riddle
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
