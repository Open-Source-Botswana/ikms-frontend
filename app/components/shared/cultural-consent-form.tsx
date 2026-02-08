// components/CulturalConsentForm.tsx
import { useState } from 'react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';

const TK_LABELS = [
  { id: 'tk-verified', label: 'TK Verified', description: 'Appropriate conditions for access and use are in place' },
  { id: 'tk-attribution', label: 'TK Attribution', description: 'Must credit the community as source' },
  { id: 'tk-family-only', label: 'TK Family Only', description: 'Restricted to specific family groups' },
  { id: 'tk-open-collab', label: 'TK Open to Collaboration', description: 'Open to research partnerships' },
];

const BC_LABELS = [
  { id: 'bc-consent-verified', label: 'BC Consent Verified', description: 'Consent conditions in place for use' },
  { id: 'bc-consent-non-verified', label: 'BC Consent Non-Verified', description: 'No formal consent obtained' },
];

interface CulturalConsentFormProps {
  consent: {
    tkLabels: string[];
    bcLabels: string[];
    consentStatus: 'verified' | 'non-verified' | 'pending';
    accessProtocol: string;
    benefitSharingAgreement: string;
  };
  onUpdate: (updates: Partial<any>) => void;
}

export function CulturalConsentForm({ consent, onUpdate }: CulturalConsentFormProps) {
  const toggleLabel = (type: 'tk' | 'bc', labelId: string) => {
    const current = type === 'tk' ? consent.tkLabels : consent.bcLabels;
    const newLabels = current.includes(labelId)
      ? current.filter(id => id !== labelId)
      : [...current, labelId];

    onUpdate({ [`${type}Labels`]: newLabels });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Cultural Consent & Protocols</h3>
        <p className="text-muted-foreground">
          Define how your traditional knowledge should be accessed, used, and protected
        </p>
      </div>

      {/* Consent Status */}
      <Card>
        <CardHeader>
          <CardTitle>Consent Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={consent.consentStatus === 'verified'}
              onCheckedChange={() => onUpdate({ consentStatus: 'verified' })}
            />
            <Label htmlFor="verified">Verified Consent</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="non-verified"
              checked={consent.consentStatus === 'non-verified'}
              onCheckedChange={() => onUpdate({ consentStatus: 'non-verified' })}
            />
            <Label htmlFor="non-verified">Non-Verified (Educational Use Only)</Label>
          </div>
        </CardContent>
      </Card>

      {/* TK Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Traditional Knowledge (TK) Labels</CardTitle>
          <p className="text-sm text-muted-foreground">
            From <a href="https://localcontexts.org" target="_blank" className="text-blue-600">Local Contexts</a>
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {TK_LABELS.map(option => (
            <div key={option.id} className="flex items-start space-x-3">
              <Checkbox
                id={option.id}
                checked={consent.tkLabels.includes(option.id)}
                onCheckedChange={() => toggleLabel('tk', option.id)}
              />
              <div>
                <Label htmlFor={option.id} className="font-medium">{option.label}</Label>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* BC Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Biocultural (BC) Labels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {BC_LABELS.map(option => (
            <div key={option.id} className="flex items-start space-x-3">
              <Checkbox
                id={option.id}
                checked={consent.bcLabels.includes(option.id)}
                onCheckedChange={() => toggleLabel('bc', option.id)}
              />
              <div>
                <Label htmlFor={option.id} className="font-medium">{option.label}</Label>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Access Protocol */}
      <Card>
        <CardHeader>
          <CardTitle>Access & Usage Protocol</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe how this knowledge may be used (e.g., 'For educational purposes only. Commercial use requires direct engagement with our Elders Council.')"
            value={consent.accessProtocol}
            onChange={(e) => onUpdate({ accessProtocol: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Benefit Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Benefit Sharing Agreement (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="url"
            placeholder="https://example.com/benefit-sharing.pdf"
            value={consent.benefitSharingAgreement || ''}
            onChange={(e) => onUpdate({ benefitSharingAgreement: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
          <p className="text-xs text-muted-foreground mt-2">
            URL to formal agreement on benefit sharing (e.g., revenue, capacity building)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
