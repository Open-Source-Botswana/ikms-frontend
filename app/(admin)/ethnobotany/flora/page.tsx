'use client';

import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import {  Info, Plus, Shield } from 'lucide-react';

import { EthnobotanicalMetadata } from '@/lib/types/botanical';
import { Button } from '@/app/components/ui/button';

import { useRouter } from 'next/navigation';

import EthnoFloraDirectory from '@/app/components/botanical/floraDirectory';
import PlantForm from '@/app/components/botanical/forms/plant-form';
export default function EthnoFloraDashboard() {
  const [currentView, setCurrentView] = useState('directory');
  const [showAddFlora, setShowAddFlora] = useState(false);

  const router = useRouter();
  const handlePlantSelect = (plant: EthnobotanicalMetadata) => {
    // Navigate to detail page or open modal
  };

  const onHandleCreationSuccess = () => {
    setShowAddFlora(false);
    setCurrentView('directory')
    // router.back();
  };

  if (showAddFlora) {
    // create the florametadataCreationFlow
    // return (
    //   <EthnobotanyCaptureFlow
    //     mode="create"
    //     onSuccess={() => onHandleCreationSuccess()}
    //   />
    // );

    return (
    <PlantForm
     onClose={() => setShowAddFlora(false)}
     onSuccess={onHandleCreationSuccess} />);
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'directory':

        return <EthnoFloraDirectory />;
        break;

      default:
        break;
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="space-y-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              IKMS demonstrates. For full community governance, user
              authentication, and secure knowledge storage.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <strong>Important:</strong> This tool helps admins records and
              management flora data.
            </AlertDescription>
          </Alert>



          {!showAddFlora && currentView === 'directory' && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                onClick={() => setShowAddFlora(true)}
                className="flex items-center space-x-2"
              >
                <Plus className="" />
                <span>Create new Plant Metadata</span>
              </Button>
            </div>
          )}

          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}
