"use client"

import { EthnobotanicalMetadata } from "@/lib/types/botanical";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

interface BotanicalInfoSectionProps {
  data: Partial<EthnobotanicalMetadata>;
  onUpdate: (field: keyof EthnobotanicalMetadata, value: any) => void;
}

export function BotanicalInfoSection({ data, onUpdate }: BotanicalInfoSectionProps) {


  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Common Name *</Label>
          <Input
            value={data.name || ''}
            onChange={e => onUpdate('name', e.target.value)}
            placeholder="e.g., Fever bush"
          />
        </div>
        <div>
          <Label>Scientific Name *</Label>
          <Input
            value={data.scientificName || ''}
            onChange={e => onUpdate('scientificName', e.target.value)}
            placeholder="e.g., Dicoma anomala"
          />
        </div>
      </div>

      <div>
        <Label>Other Names</Label>
        <Input
          value={data.otherNames?.join(', ') || ''}
          onChange={e => onUpdate('otherNames', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="Comma-separated (e.g., Stomach bush, Wild fever)"
        />
      </div>

      <div>
        <Label>Local/Indigenous Names</Label>
        <Input
          value={data.localNames?.join(', ') || ''}
          onChange={e => onUpdate('localNames', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="Comma-separated (e.g., Pelobotlhoko, Tlhonya)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Family</Label>
          <Input
            value={data.family || ''}
            onChange={e => onUpdate('family', e.target.value)}
            placeholder="e.g., Asteraceae"
          />
        </div>
        <div>
          <Label>Origin</Label>
          <Input
            value={data.origin || ''}
            onChange={e => onUpdate('origin', e.target.value)}
            placeholder="e.g., Sub-Saharan Africa"
          />
        </div>
        <div>
          <Label>Parts Used</Label>
          <Input
            value={data.partsUsed?.join(', ') || ''}
            onChange={e => onUpdate('partsUsed', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="e.g., Roots, Leaves"
          />
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={data.description || ''}
          onChange={e => onUpdate('description', e.target.value)}
          placeholder="Describe the plant and its significance..."
          rows={3}
        />
      </div>
    </div>
  );
}
