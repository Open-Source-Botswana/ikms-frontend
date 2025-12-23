// components/ui/feedback-loading-overlay.tsx
import { Loader2 } from 'lucide-react';

export function FeedbackLoadingOverlay({ label }: { label?: string }) {
  return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
      <p className="text-white text-lg">
        {label ?? 'Processing...'}
      </p>
    </div>
  );
}
