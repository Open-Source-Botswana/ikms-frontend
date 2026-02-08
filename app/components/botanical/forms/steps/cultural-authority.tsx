import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Users, Shield, Globe } from 'lucide-react';
import { ArrayInput } from '../array-input';
import type { PlantFormDraft } from '@/lib/store/plantStore';

interface CulturalAuthorityStepProps {
  draft: PlantFormDraft;
  onUpdate: (updates: Partial<PlantFormDraft>) => void;
}

const tkLabelSuggestions = ['TK Verified', 'TK Open to Collaboration', 'TK Attribution', 'TK Non-Commercial'];
const bcLabelSuggestions = ['BC Consent Verified', 'BC Provenance', 'BC Multiple Communities'];

export const CulturalAuthorityStep = ({ draft, onUpdate }: CulturalAuthorityStepProps) => {
  const updateAuthority = (field: string, value: string) => {
    onUpdate({
      culturalAuthority: { ...draft.culturalAuthority, [field]: value }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Cultural Authority</h2>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Community Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="communityName">Community Name *</Label>
              <Input
                id="communityName"
                value={draft.culturalAuthority.communityName}
                onChange={(e) => updateAuthority('communityName', e.target.value)}
                placeholder="e.g., Batswana Traditional Healers Association"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="territory">Territory / Region *</Label>
              <Input
                id="territory"
                value={draft.culturalAuthority.territory}
                onChange={(e) => updateAuthority('territory', e.target.value)}
                placeholder="e.g., Kalahari Desert Region, Botswana"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="representative">Representative Name</Label>
              <Input
                id="representative"
                value={draft.culturalAuthority.representative}
                onChange={(e) => updateAuthority('representative', e.target.value)}
                placeholder="e.g., Dr. Mma Kgosi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={draft.culturalAuthority.contactEmail}
                onChange={(e) => updateAuthority('contactEmail', e.target.value)}
                placeholder="contact@example.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="indigenousSystem">Indigenous Governance System</Label>
            <Input
              id="indigenousSystem"
              value={draft.culturalAuthority.indigenousSystem}
              onChange={(e) => updateAuthority('indigenousSystem', e.target.value)}
              placeholder="e.g., Traditional Healing Council Governance"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Labels & Domain
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Label Domain *</Label>
            <RadioGroup
              value={draft.labelDomain}
              onValueChange={(value: 'traditional' | 'biocultural' | 'research') =>
                onUpdate({ labelDomain: value })
              }
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="traditional" id="traditional" />
                <Label htmlFor="traditional" className="cursor-pointer">Traditional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biocultural" id="biocultural" />
                <Label htmlFor="biocultural" className="cursor-pointer">Biocultural</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="research" id="research" />
                <Label htmlFor="research" className="cursor-pointer">Research</Label>
              </div>
            </RadioGroup>
          </div>

          <ArrayInput
            label="Traditional Knowledge Labels"
            values={draft.tkLabels}
            onChange={(tkLabels) => onUpdate({ tkLabels })}
            placeholder="Add TK label..."
            suggestions={tkLabelSuggestions}
          />

          <ArrayInput
            label="Biocultural Labels"
            values={draft.bcLabels}
            onChange={(bcLabels) => onUpdate({ bcLabels })}
            placeholder="Add BC label..."
            suggestions={bcLabelSuggestions}
          />

          <div className="space-y-2">
            <Label htmlFor="customCulturalId">Custom Cultural ID</Label>
            <Input
              id="customCulturalId"
              value={draft.customCulturalId}
              onChange={(e) => onUpdate({ customCulturalId: e.target.value })}
              placeholder="e.g., BTSA-MED-2024-001"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
