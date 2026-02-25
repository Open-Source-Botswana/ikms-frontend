import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { WaitlistApiResponse, WaitlistEntry } from '@/lib/types/waitlist';
import { simpleFetcher } from '@/lib/services/api/fetchService';

export function useWaitListSubmit() {
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<WaitlistApiResponse['error']>();

  const waitListSubmit = useCallback(async (data: WaitlistEntry) => {
    setIsSubmitting(true);
    setError(undefined);

    try {
      const res = await simpleFetcher<WaitlistApiResponse>('api/waitlist', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!res.success) {
        setError(res.error);
        throw new Error(res.error?.message || 'Submission failed');
      }

      return res.entry;
    } catch (err: any) {
      // Extract error from fetcher or use default
      const message = err.message || 'Failed to submit to waitlist';

      setError({
        code: 'SUBMISSION_ERROR',
        message,
      });

      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);
  return {
    waitListSubmit,
    isSubmitting,
    error,
    clearError: () => setError(undefined),
  };
}
