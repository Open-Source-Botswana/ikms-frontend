
import {
  FileQuestion,
  Clock,
  FileCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

export const STATUS_CONFIG = {
  draft: {
    icon: FileQuestion,
    color: 'amber',
    label: 'DRAFT',
    description: 'Record is being prepared. Complete all required fields before submission.',
    badgeVariant: 'warning' as const,
    showProgress: true,
    nextStep: 'Review'

  },
  pending_review: {
    icon: Clock,
    color: 'blue',
    label: 'PENDING REVIEW',
    description: 'Awaiting verification by cultural experts or community knowledge keepers.',
    badgeVariant: 'secondary' as const,
    showProgress: true,
    nextStep: 'Expert verification in progress'
  },
  pending_approval: {
    icon: FileCheck,
    color: 'purple',
    label: 'PENDING APPROVAL',
    description: 'Final review by community leadership or administrator before publication.',
    badgeVariant: 'secondary' as const,
    showProgress: true,
    nextStep: 'Awaiting final authorization'
  },
  published: {
    icon: CheckCircle,
    color: 'green',
    label: 'PUBLISHED',
    description: (record: any) =>
      `Published on ${record.publishedAt ? new Date(record.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : 'N/A'}`,
    badgeVariant: 'success' as const,
    showProgress: false,
    nextStep: 'Published'
  },
  denied: {
    icon: XCircle,
    color: 'red',
    label: 'DENIED',
    description: 'Record requires significant revisions. Contact verifiers for guidance.',
    badgeVariant: 'destructive' as const,
    showProgress: false,
    nextStep: 'Review'
  },
  revision_requested: {
    icon: AlertCircle,
    color: 'yellow',
    label: 'REVISION REQUESTED',
    description: 'Updates needed based on verifier feedback. Resubmit when complete.',
    badgeVariant: 'warning' as const,
    showProgress: false,
    nextStep: 'Review'
  }
} as const;


export const getStatusConfig = (status: string) => {
  return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.draft;
};


export const getColorClasses = (color: string) => {
  const classes = {
    amber: {
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-800'
    },
    blue: {
      text: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-800'
    },
    purple: {
      text: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-800'
    },
    green: {
      text: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200',
      badge: 'bg-green-100 text-green-800'
    },
    red: {
      text: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-800'
    },
    yellow: {
      text: 'text-yellow-700',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      badge: 'bg-yellow-100 text-yellow-800'
    }
  };
  return classes[color as keyof typeof classes] || classes.amber;
};
