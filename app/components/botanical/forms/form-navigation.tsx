import { Button } from '@/app/components/ui/button';
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  onSubmit: () => void;
  isValid?: boolean;
  isSubmitting?: boolean;
}

export const FormNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSave,
  onSubmit,
  isValid = true,
  isSubmitting = false
}: FormNavigationProps) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <motion.div
      className="flex items-center justify-between pt-6 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirstStep}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {onSave && (
          <Button
            type="button"
            variant="ghost"
            onClick={onSave}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {isLastStep ? (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            disabled={!isValid}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};
