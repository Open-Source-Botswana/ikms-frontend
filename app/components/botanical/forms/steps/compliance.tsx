import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { FileCheck, Lock, MapPin } from 'lucide-react';
import type { PlantFormDraft } from '@/lib/store/plantStore';

interface ComplianceStepProps {
  draft: PlantFormDraft;
  onUpdate: (updates: Partial<PlantFormDraft>) => void;
}

const ipMetadataOptions = ['CC BY-NC-ND 4.0', 'CC BY-NC-SA 4.0', 'CC BY 4.0', 'All Rights Reserved'];

export const ComplianceStep = ({ draft, onUpdate }: ComplianceStepProps) => {
  const updateLocation = (field: string, value: boolean) => {
    onUpdate({
      location: { ...draft.location, [field]: value }
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
        <FileCheck className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Compliance & Consent</h2>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Consent & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Consent Status *</Label>
            <RadioGroup
              value={draft.consentStatus}
              onValueChange={(value: 'verified' | 'pending' | 'expired') =>
                onUpdate({ consentStatus: value })
              }
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending" className="cursor-pointer">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="verified" id="verified" />
                <Label htmlFor="verified" className="cursor-pointer">Verified</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expired" id="expired" />
                <Label htmlFor="expired" className="cursor-pointer">Expired</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="consentExpiry">Consent Expiry Date</Label>
              <Input
                id="consentExpiry"
                type="date"
                value={draft.consentExpiry}
                onChange={(e) => onUpdate({ consentExpiry: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefitSharing">Benefit Sharing Agreement URL</Label>
              <Input
                id="benefitSharing"
                value={draft.benefitSharingAgreement}
                onChange={(e) => onUpdate({ benefitSharingAgreement: e.target.value })}
                placeholder="https://example.com/agreement.pdf"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessProtocol">Access Protocol</Label>
            <Textarea
              id="accessProtocol"
              value={draft.accessProtocol}
              onChange={(e) => onUpdate({ accessProtocol: e.target.value })}
              placeholder="Describe the protocol for accessing and using this data..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="associatedTerritory">Associated Territory</Label>
            <Input
              id="associatedTerritory"
              value={draft.associatedTerritory}
              onChange={(e) => onUpdate({ associatedTerritory: e.target.value })}
              placeholder="e.g., Kalahari Desert Region, Botswana"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            Intellectual Property
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Sensitivity Level</Label>
            <RadioGroup
              value={draft.sensitivityLevel}
              onValueChange={(value: 'public' | 'restricted' | 'confidential') =>
                onUpdate({ sensitivityLevel: value })
              }
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="cursor-pointer">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="restricted" id="restricted" />
                <Label htmlFor="restricted" className="cursor-pointer">Restricted</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confidential" id="confidential" />
                <Label htmlFor="confidential" className="cursor-pointer">Confidential</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipMetadata">License / IP Metadata</Label>
            <Input
              id="ipMetadata"
              value={draft.ipMetadata}
              onChange={(e) => onUpdate({ ipMetadata: e.target.value })}
              placeholder="e.g., CC BY-NC-ND 4.0"
              list="ip-suggestions"
            />
            <datalist id="ip-suggestions">
              {ipMetadataOptions.map(opt => <option key={opt} value={opt} />)}
            </datalist>
          </div>

          <div className="space-y-2">
            <Label htmlFor="copyrightNotice">Copyright Notice</Label>
            <Textarea
              id="copyrightNotice"
              value={draft.copyrightNotice}
              onChange={(e) => onUpdate({ copyrightNotice: e.target.value })}
              placeholder="© Community Name, Year. All rights reserved..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location Designations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="unesco">UNESCO World Heritage Site</Label>
              <p className="text-sm text-muted-foreground">Is this location a UNESCO designated site?</p>
            </div>
            <Switch
              id="unesco"
              checked={draft.location.unescoSite}
              onCheckedChange={(checked) => updateLocation('unescoSite', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="undp">UNDP Supported Project</Label>
              <p className="text-sm text-muted-foreground">Is this part of a UNDP supported initiative?</p>
            </div>
            <Switch
              id="undp"
              checked={draft.location.undpSupported}
              onCheckedChange={(checked) => updateLocation('undpSupported', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
