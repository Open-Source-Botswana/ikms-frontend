'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import {
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface AdminControlsProps {
  riddleId?: string;
}

export function AdminControls({ riddleId }: AdminControlsProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this riddle? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      // Implement your delete logic here
      console.log('Deleting riddle:', riddleId);
      // await RiddleService.deleteRiddle(riddleId);
      alert('Riddle deleted successfully!');
    } catch (error) {
      console.error('Error deleting riddle:', error);
      alert('Failed to delete riddle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Pencil className="h-4 w-4 mr-1" />
        Edit
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" disabled={loading}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log('Approve all')}>
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Approve All Comments
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Reject all')}>
            <XCircle className="h-4 w-4 mr-2 text-red-500" />
            Reject All Comments
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600 focus:text-red-700"
            disabled={loading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {loading ? 'Deleting...' : 'Delete Riddle'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
