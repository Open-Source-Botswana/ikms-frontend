// components/forms/CulturalConsentSection.tsx
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { EthnobotanicalMetadata } from '@/lib/types/botanical';


const TK_LABELS = [
  { id: 'TK Verified', desc: 'Appropriate conditions for access/use are in place' },
  { id: 'TK Attribution', desc: 'Must credit the community as source' },
  { id: 'TK Family Only', desc: 'Restricted to specific family groups' },
  { id: 'TK Open to Collaboration', desc: 'Open to research partnerships' },
];

const BC_LABELS = [
  { id: 'BC Consent Verified', desc: 'Consent conditions in place for use' },
  { id: 'BC Consent Non-Verified', desc: 'No formal consent obtained' },
];

interface CulturalConsentSectionProps {
  data: Partial<EthnobotanicalMetadata>;
  onUpdate: (field: keyof EthnobotanicalMetadata, value: any) => void;
}

export function CulturalConsentSection({ data, onUpdate }: CulturalConsentSectionProps) {


  const toggleLabel = (type: 'tkLabels' | 'bcLabels', label: string) => {
    const current = data[type] || [];
    const newLabels = current.includes(label)
      ? current.filter(l => l !== label)
      : [...current, label];
    onUpdate(type, newLabels);
  };

  return (
    <div className="space-y-6">
      {/* Cultural Authority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Community Name *</Label>
          <Input
            value={data.culturalAuthority?.communityName || ''}
            onChange={e => onUpdate('culturalAuthority', {
              ...data.culturalAuthority,
              communityName: e.target.value
            })}
            placeholder="e.g., Batswana Traditional Healers Association"
          />
        </div>
        <div>
          <Label>Territory *</Label>
          <Input
            value={data.culturalAuthority?.territory || ''}
            onChange={e => onUpdate('culturalAuthority', {
              ...data.culturalAuthority,
              territory: e.target.value
            })}
            placeholder="e.g., Kalahari Desert Region, Botswana"
          />
        </div>
      </div>

      {/* Custom ID & DOCID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Custom Cultural ID *</Label>
          <Input
            value={data.customCulturalId || ''}
            onChange={e => onUpdate('customCulturalId', e.target.value)}
            placeholder="e.g., BTSA-MED-2024-001"
          />
        </div>
        <div>
          <Label>DOI / Persistent ID</Label>
          <Input
            value={data.docId || ''}
            onChange={e => onUpdate('docId', e.target.value)}
            placeholder="e.g., doi:10.5281/zenodo.1234567"
          />
        </div>
      </div>

      {/* Labels */}
      <div>
        <Label>Traditional Knowledge (TK) Labels</Label>
        <div className="mt-2 space-y-2">
          {TK_LABELS.map(opt => (
            <div key={opt.id} className="flex items-start space-x-2">
              <Checkbox
                checked={data.tkLabels?.includes(opt.id)}
                onCheckedChange={() => toggleLabel('tkLabels', opt.id)}
              />
              <div>
                <Label>{opt.id}</Label>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Biocultural (BC) Labels</Label>
        <div className="mt-2 space-y-2">
          {BC_LABELS.map(opt => (
            <div key={opt.id} className="flex items-start space-x-2">
              <Checkbox
                checked={data.bcLabels?.includes(opt.id)}
                onCheckedChange={() => toggleLabel('bcLabels', opt.id)}
              />
              <div>
                <Label>{opt.id}</Label>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consent & Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Consent Status *</Label>
          <select
            value={data.consentStatus || 'pending'}
            onChange={e => onUpdate('consentStatus', e.target.value as any)}
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="non-verified">Non-Verified</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
        <div>
          <Label>Associated Territory *</Label>
          <Input
            value={data.associatedTerritory || ''}
            onChange={e => onUpdate('associatedTerritory', e.target.value)}
            placeholder="e.g., Oceti Sakowin (Great Sioux Nation)"
          />
        </div>
      </div>

      <div>
        <Label>Access Protocol *</Label>
        <Textarea
          value={data.accessProtocol || ''}
          onChange={e => onUpdate('accessProtocol', e.target.value)}
          placeholder="Describe usage terms (e.g., 'For educational use only...')"
          rows={3}
        />
      </div>

      <div>
        <Label>Copyright Notice *</Label>
        <Textarea
          value={data.copyrightNotice || ''}
          onChange={e => onUpdate('copyrightNotice', e.target.value)}
          placeholder="© Community Name, Year. All rights reserved under Berne Convention."
          rows={2}
        />
      </div>
    </div>
  );
}
