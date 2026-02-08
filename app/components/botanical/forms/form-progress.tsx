interface FormProgressProps {
    steps: {title: string; description: string}[];
    currentStep: number;
    onStepClick: (step: number) => void;
}

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react'

export const FormProgress = ({ steps, currentStep, onStepClick }: FormProgressProps) => {
  return (
    <div className="w-full py-4">
 <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.button
                  onClick={() => onStepClick?.(index)}
                  disabled={index > currentStep}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary/20 border-2 border-primary text-primary",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
                    index <= currentStep && "cursor-pointer hover:opacity-80"
                  )}
                  whileHover={index <= currentStep ? { scale: 1.05 } : {}}
                  whileTap={index <= currentStep ? { scale: 0.95 } : {}}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </motion.button>
                <div className="mt-2 text-center hidden sm:block">
                  <p className={cn(
                    "text-xs font-medium",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 bg-muted relative">
                  <motion.div
                    className="absolute inset-0 bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>

  )
}
