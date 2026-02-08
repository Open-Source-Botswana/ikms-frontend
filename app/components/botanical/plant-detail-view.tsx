'use client';

import {
  VerificationEvent,
  VerificationRole,
} from '@/lib/types/botanical';
import { SensitivityLevel } from '@/lib/types/sitesData';
import React, { useEffect } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { ArrowLeft, CheckCircle, Clock, FileQuestion, FileText, Leaf, MapPin, Shield, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { VerificationTimeline } from './verification-timeline';
import { JSONLDPreview } from './jsonld-preview';
import { VerificationPanel } from './verificationPanel';
import { StatusBanner } from './status-banner';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical';


interface RecordDetailViewProps {
  record: Partial<EthnobotanicalMetadata> ;
  userRole?: VerificationRole | 'public';
  viewMode?: 'public' | 'admin';
}

// DEBUG LOGGER - Centralized logging utility
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Details View - PlantDetail View]', ...args);
  }
};


export function RecordDetailView({
  record,
  userRole = 'public',
  viewMode: explicitViewMode,
}: RecordDetailViewProps) {

  const router = useRouter();

  const isPublished = record?.status === 'published';
  const isAdminView =
    explicitViewMode === 'admin' ||
    (userRole && ['admin', 'superAdmin', 'ethnoExpert'].includes(userRole));
  const viewMode =
    explicitViewMode || (isAdminView && "published" ? 'admin' : 'public');

  if (!record) return false;


  const canViewSensitive = (fieldSensitivity: SensitivityLevel): boolean => {
    if (viewMode === 'admin') return true;

    if (record.sensitivityLevel === 'public') return true;
    if (
      record.sensitivityLevel === 'restricted' &&
      fieldSensitivity === 'public'
    )
      return true;
    return false;
  };


  useEffect(() => {
      if (!record.id) {
        debugLog('⚠️ WARNING: Record missing identifier.');
        debugLog('Intialized with record:', {
        id: record.id,
        status: record.status,
        currentStage: record.currentStage,
        verificationStages: record.verificationStages?.length || 0
      });

      }
      debugLog('Intialized with record:', {
        id: record.id,
        status: record.status,
        currentStage: record.currentStage,
        verificationStages: record.verificationStages?.length || 0
      });
    }, [record]);


  //   const getGeographicDisplay = () => {
  //     if (viewMode === 'admin') {
  //       return `${record.location.latitude.toFixed(4)}, ${record.location.longitude.toFixed(4)} (${record.associatedTerritory})`;
  //     }

  //     switch (record.sensitivityLevel) {
  //       case 'public':
  //         return `📍 ${record.associatedTerritory} (General area)`;
  //       case 'restricted':
  //         return `📍 ${record.associatedTerritory} (Precision restricted)`;
  //       case 'closed':
  //         return '📍 Location details restricted';
  //     }
  //   };

  const getContactDisplay = () => {
    if (viewMode === 'admin' && record.culturalAuthority?.contactEmail) {
      return `${record.culturalAuthority.representative} • ${record.culturalAuthority.contactEmail}`;
    }
    if (canViewSensitive('public')) {
      return record.culturalAuthority?.representative
        ? `${record.culturalAuthority.representative} (Community Representative)`
        : 'Community Representative';
    }
    return 'Community Authority';
  };

  const STATUS_CONFIG = {
    1: { icon: FileQuestion, color: 'text-amber-500', bg: 'bg-amber-50', label: 'DRAFT' },
    3: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'PUBLISHED' },
    2: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', label: 'PENDING REVIEW' },

  };

  const status_display = STATUS_CONFIG[record.status as unknown as keyof typeof STATUS_CONFIG]

  return (
    <div className="space-y-6">




    <Button
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back</span>
          </Button>
      <div
        className={`p-4 rounded-lg ${isPublished ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}
      >
        <div className="flex items-center justify-between">


          {viewMode === 'admin' && (

            <StatusBanner
              record={record as Partial<EthnobotanicalMetadata>}
              viewMode={viewMode}
              showFeedback={viewMode === 'admin' && !!record.feedback && record.status !== 'published'}
            />

          )}
        </div>
        {record.feedback && viewMode === 'admin' && (
          <Alert
            variant="destructive"
            className="mt-3 bg-yellow-100 border-yellow-300"
          >
            <AlertDescription>
              <strong>Feedback:</strong> {record.feedback}
              <div className="mt-1 text-xs text-yellow-800">
                Last updated:{' '}
                {record.lastUpdated
                  ? formatDistanceToNow(new Date(record.lastUpdated))
                  : 'N/A'}{' '}
                ago
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>


      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Context</TabsTrigger>
          <TabsTrigger value="botanical">Botanical Details</TabsTrigger>
          {viewMode === 'admin' && (
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          )}
        </TabsList>


        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{record.name}</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {record.scientificName}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {record.tkLabels?.map(label => (
                    <Badge
                      key={label}
                      variant="outline"
                      className="bg-blue-50 text-blue-800 border-blue-300"
                    >
                      {label}
                    </Badge>
                  ))}
                  {record.bcLabels?.map(label => (
                    <Badge
                      key={label}
                      variant="outline"
                      className="bg-green-50 text-green-800 border-green-300"
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Leaf className="h-4 w-4 mr-2 text-green-600" /> Description
                </h3>
                <p className="text-justify">{record.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-amber-600" /> Location
                  </h3>
                  {/* <p className="pl-6">{getGeographicDisplay()}</p> */}

                  {record.location?.unescoSite && (
                    <Badge variant="secondary" className="mt-2">
                      UNESCO Heritage Site
                    </Badge>
                  )}
                  {record.location?.undpSupported && (
                    <Badge variant="secondary" className="mt-2 ml-2">
                      UNDP Supported
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-600" /> Cultural
                    Authority
                  </h3>
                  <p className="font-medium">
                    {record.culturalAuthority?.communityName}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    {getContactDisplay()}
                  </p>
                  <p className="text-sm mt-2 italic text-muted-foreground">
                    Territory: {record.associatedTerritory}
                  </p>
                </div>
              </div>

              {isPublished && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> Citation & Standards
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">DOCID:</span>{' '}
                      {record.docId || 'Pending assignment'}
                    </div>
                    <div>
                      <span className="font-medium">Copyright:</span>{' '}
                      {record.copyrightNotice}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {record.standardsCompliance?.darwinCore && (
                        <Badge variant="outline">Darwin Core Compliant</Badge>
                      )}
                      {record.standardsCompliance?.localContexts && (
                        <Badge variant="outline">Local Contexts Verified</Badge>
                      )}
                      {record.standardsCompliance?.nagoyaProtocol && (
                        <Badge variant="outline">
                          Nagoya Protocol Compliant
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cultural Knowledge & Protocols</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Traditional Uses</h3>
                <ul className="list-disc list-inside space-y-1">
                  {record.traditionalUses?.map((use, i) => (
                    <li key={i}>{use}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Access Protocol</h3>
                <p className="italic p-3 bg-muted rounded-md">
                  {record.accessProtocol}
                </p>
              </div>

              {canViewSensitive('restricted') &&
                record.benefitSharingAgreement && (
                  <div>
                    <h3 className="font-semibold mb-2">Benefit Sharing</h3>
                    <a
                      href={record.benefitSharingAgreement}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" /> View Agreement
                      Document
                    </a>
                  </div>
                )}

              {viewMode === 'admin' && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">
                    Indigenous Knowledge System
                  </h3>
                  <p>
                    {record.culturalAuthority?.indigenousSystem ||
                      'Not specified'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="botanical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Botanical Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <DetailRow label="Family" value={record.family} />
                <DetailRow label="Origin" value={record.origin} />
                <DetailRow
                  label="Parts Used"
                  value={record.partsUsed?.join(', ')}
                />
                <DetailRow
                  label="Local Names"
                  value={record.localNames?.join(', ')}
                />
                <DetailRow
                  label="Other Names"
                  value={record.otherNames?.join(', ')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medicinal Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Qualities</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.medicinalQualities?.map((q, i) => (
                      <Badge key={i} variant="secondary">
                        {q}
                      </Badge>
                    ))}
                  </div>
                </div>

                {record.modernMedicine?.activeCompounds &&
                  record.modernMedicine.activeCompounds.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Active Compounds</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.modernMedicine?.activeCompounds?.map((c, i) => (
                          <Badge key={i} variant="outline">
                            {c}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {record.homeopathicUses?.preparations &&
                  record.homeopathicUses.preparations.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">
                        Traditional Preparations
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {record.homeopathicUses?.preparations.map((prep, i) => (
                          <li key={i}>{prep}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>


        {viewMode === 'admin' && (
          <TabsContent value="audit" className='w-full'>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" /> Verification Audit Trail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VerificationTimeline
                  events={
                    record.verificationStages as VerificationEvent[]

                  }
                  currentStage={record.currentStage ? record.currentStage : 1}
                />

                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> JSON-LD Export
                  </h3>
                  {!record.jsonLdExport ? (
                    <JSONLDPreview
                      jsonLd={JSON.stringify(record.jsonLdExport)}
                    />
                  ) : (
                    <Alert>
                      <AlertDescription>
                        JSON-LD will be generated automatically upon
                        publication. Current status: {record.status}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {viewMode === 'admin' &&
      record.status !== 'published' &&
      record.status !== 'denied' && (
        <div className="mt-8 pt-6 border-t">
          <VerificationPanel
            record={record as Partial<EthnobotanicalMetadata>}
            currentUserRole={userRole as VerificationRole}
            currentUser={{
              id: 'current-user-id',
              name: 'Current User'
            }}
            // onAction={async (action) => {
            //   // TODO: call store/API method await updateRecordStatus(record.id, action);
            //   console.log('Verification action:', action);
            //   alert(`Action ${action.action} submitted successfully!`);
            // }}
          />
        </div>
      )}

      {viewMode === 'public' && isPublished && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-sm">
            <strong>Respectful Use Notice:</strong> This knowledge is shared
            under the consent of {record.culturalAuthority?.communityName}.
            Commercial use requires direct engagement with the community. ©{' '}
            {new Date().getFullYear()} {record.culturalAuthority?.communityName}
            . All rights reserved.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value || value === '') return null;
  return (
    <div className="flex">
      <span className="font-medium w-32 flex-shrink-0">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
