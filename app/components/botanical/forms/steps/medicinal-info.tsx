import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Stethoscope, FlaskConical, Leaf, BookOpen } from 'lucide-react';
import type { PlantFormDraft } from '@/lib/store/plantStore';
import { ArrayInput } from '../array-input';


interface MedicinalInfoStepProps {
  draft: PlantFormDraft;
  onUpdate: (updates: Partial<PlantFormDraft>) => void;
}

const qualitySuggestions = ['Anti-cancer', 'Anti-parasitic', 'Anti-diabetic', 'Antioxidant', 'Hepatoprotective', 'Antimicrobial', 'Anti-inflammatory', 'Analgesic'];
const compoundSuggestions = ['Flavonoids', 'Alkaloids', 'Terpenes', 'Phenolic acids', 'Saponins', 'Tannins'];

export const MedicinalInfoStep = ({ draft, onUpdate }: MedicinalInfoStepProps) => {
  const updateModernMedicine = (field: string, value: string[]) => {
    onUpdate({
      modernMedicine: { ...draft.modernMedicine, [field]: value }
    });
  };

  const updateHomeopathic = (field: string, value: string[] | string) => {
    onUpdate({
      homeopathicUses: { ...draft.homeopathicUses, [field]: value }
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
        <Stethoscope className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Medicinal Information</h2>
      </div>

      <ArrayInput
        label="Medicinal Qualities"
        values={draft.medicinalQualities}
        onChange={(medicinalQualities) => onUpdate({ medicinalQualities })}
        placeholder="Add medicinal quality..."
        suggestions={qualitySuggestions}
      />

      <ArrayInput
        label="Traditional Uses"
        values={draft.traditionalUses}
        onChange={(traditionalUses) => onUpdate({ traditionalUses })}
        placeholder="Describe a traditional use..."
      />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            Modern Medicine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ArrayInput
            label="Active Compounds"
            values={draft.modernMedicine.activeCompounds}
            onChange={(v) => updateModernMedicine('activeCompounds', v)}
            placeholder="Add compound..."
            suggestions={compoundSuggestions}
          />

          <ArrayInput
            label="Clinical Studies"
            values={draft.modernMedicine.clinicalStudies}
            onChange={(v) => updateModernMedicine('clinicalStudies', v)}
            placeholder="Describe a clinical study finding..."
          />

          <ArrayInput
            label="Approved Uses"
            values={draft.modernMedicine.approvedUses}
            onChange={(v) => updateModernMedicine('approvedUses', v)}
            placeholder="Add approved use..."
          />

          <ArrayInput
            label="Contradictions / Warnings"
            values={draft.modernMedicine.contradictions}
            onChange={(v) => updateModernMedicine('contradictions', v)}
            placeholder="Add contradiction or warning..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Homeopathic Uses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ArrayInput
            label="Preparations"
            values={draft.homeopathicUses.preparations}
            onChange={(v) => updateHomeopathic('preparations', v)}
            placeholder="Add preparation method..."
          />

          <ArrayInput
            label="Conditions Treated"
            values={draft.homeopathicUses.conditions}
            onChange={(v) => updateHomeopathic('conditions', v)}
            placeholder="Add condition..."
          />

          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage Information</Label>
            <Textarea
              id="dosage"
              value={draft.homeopathicUses.dosage}
              onChange={(e) => updateHomeopathic('dosage', e.target.value)}
              placeholder="Describe dosage recommendations and preparation methods..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayInput
            label="Sources & References"
            values={draft.references}
            onChange={(references) => onUpdate({ references })}
            placeholder="Add reference (journal, book, URL)..."
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
