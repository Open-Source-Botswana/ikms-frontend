// components/EthnobotanyCaptureFlow.tsx
'use client';

import { useState } from 'react';

import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { BotanicalInfoSection } from './forms/info-section-form';
import { CulturalConsentSection } from './forms/consent-form';
import { EthnobotanicalMetadata, EthnobotanicalMetadataMode } from '@/lib/types/botanical';
import { useEthnobotanyStore } from '@/lib/store/ethnobotanyStore';
import { v4 as uuidv4 } from 'uuid'
import { ErrorPopup, SuccessPopup } from '../ui/animations/email';

type Step = 'BOTANICAL' | 'CULTURAL' | 'REVIEW';

interface EthnobotanyCaptureFlowProps {
  mode: EthnobotanicalMetadataMode
  onSuccess?: () => void;
}

export function EthnobotanyCaptureFlow({mode,onSuccess}:EthnobotanyCaptureFlowProps) {

  const generateIDMetadata = () => {
        return uuidv4()
  }
  const { currentPlant, setCurrentPlant, addPlant, resetCurrentPlant } = useEthnobotanyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const [step, setStep] = useState<Step>('BOTANICAL');


  if (!currentPlant) {
    resetCurrentPlant();
    return null;
  }

  const updateField = (field: keyof typeof currentPlant, value: any) => {
    setCurrentPlant({ ...currentPlant, [field]: value });
  };

  const nextStep = () => {
    if (step === 'BOTANICAL') setStep('CULTURAL');
    else if (step === 'CULTURAL') setStep('REVIEW');
  };

  const prevStep = () => {
    if (step === 'CULTURAL') setStep('BOTANICAL');
    else if (step === 'REVIEW') setStep('CULTURAL');
  };

  const canProceed = () => {
    if (step === 'BOTANICAL') {
      return currentPlant.name && currentPlant.scientificName;
    }
    if (step === 'CULTURAL') {
      return (
        currentPlant.culturalAuthority?.communityName &&
        currentPlant.customCulturalId &&
        currentPlant.consentStatus !== 'pending'
      );
    }
    return true;
  };

  const handleSubmit = async () => {

    setIsSubmitting(true);
    setShowError(false);
    setErrorMessage('');
    try {

      if (currentPlant.name) {
        // Update identifiers before update
        currentPlant.id = generateIDMetadata()
        currentPlant.customCulturalId = generateIDMetadata()
        currentPlant.docId = generateIDMetadata()
        currentPlant.currentStage = 1
        currentPlant.status = 'draft'

        await addPlant(currentPlant as EthnobotanicalMetadata);
        resetCurrentPlant();

        setShowSuccess(true);


        setTimeout(() => {
          setShowSuccess(false);

        }, 3000);
        onSuccess?.();

      }
    }  catch (error) {
          console.error('Failed to submit details:', error);
          setErrorMessage(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
          setShowError(true);

    } finally {
      setIsSubmitting(false);
    }


  };

  const renderStep = () => {
    switch (step) {
      case 'BOTANICAL':
        return <BotanicalInfoSection data={currentPlant} onUpdate={updateField} />;
      case 'CULTURAL':
        return <CulturalConsentSection data={currentPlant} onUpdate={updateField} />;
      case 'REVIEW':
        return (
          <div className="space-y-4">
            <h3 className="font-bold">{currentPlant.name} ({currentPlant.scientificName})</h3>
            <p>{currentPlant.description}</p>
            <div>
              <h4 className="font-medium">Cultural Authority</h4>
              <p>{currentPlant.culturalAuthority?.communityName}</p>
              <p>{currentPlant.associatedTerritory}</p>
            </div>
            <div>
              <h4 className="font-medium">Labels</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {[...(currentPlant.tkLabels || []), ...(currentPlant.bcLabels || [])].map(label => (
                  <span key={label} className="bg-secondary px-2 py-1 rounded text-sm">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card>
            <div className="space-y-6">
      <CardHeader>
        <CardTitle>
          {step === 'BOTANICAL' && 'Botanical Information'}
          {step === 'CULTURAL' && 'Cultural Consent & Protocols'}
          {step === 'REVIEW' && 'Review Record'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className={step === 'BOTANICAL' ? 'font-bold' : ''}>1. Botanical</span>
            <span className={step === 'CULTURAL' ? 'font-bold' : ''}>2. Cultural</span>
            <span className={step === 'REVIEW' ? 'font-bold' : ''}>3. Review</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: step === 'BOTANICAL' ? '33%' : step === 'CULTURAL' ? '66%' : '100%' }}
            />
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 'BOTANICAL'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {step === 'REVIEW' ? (
            <Button onClick={handleSubmit} className="flex items-center">
              <Save className="w-4 h-4 mr-2" /> Save Record
            </Button>
          ) : (
            <Button onClick={nextStep} disabled={!canProceed()}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
      </div>

            {showSuccess && (
              <SuccessPopup
                message="Plant record saved successfully!"
                onClose={() => setShowSuccess(false)}
              />
            )}

            {showError && (
              <ErrorPopup
                message={errorMessage}
                onClose={() => setShowError(false)}
              />
            )}
    </Card>
  );
}
