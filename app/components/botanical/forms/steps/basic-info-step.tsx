import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Leaf, FileText } from 'lucide-react';
import { PlantFormDraft } from '@/lib/store/plantStore';
import { ArrayInput } from '../array-input';

interface BasicInfoStepProps {
  draft: PlantFormDraft;
  onUpdate: (updates: Partial<PlantFormDraft>) => void;
}

const familySuggestions = ['Asteraceae', 'Fabaceae', 'Lamiaceae', 'Solanaceae', 'Apiaceae', 'Rosaceae'];
const partsSuggestions = ['Roots', 'Leaves', 'Bark', 'Flowers', 'Seeds', 'Stems', 'Fruit', 'Rhizomes'];

export const BasicInfoStep = ({ draft, onUpdate }: BasicInfoStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Basic Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Common Name *</Label>
          <Input
            id="name"
            value={draft.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g., Fever bush"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scientificName">Scientific Name *</Label>
          <Input
            id="scientificName"
            value={draft.scientificName}
            onChange={(e) => onUpdate({ scientificName: e.target.value })}
            placeholder="e.g., Dicoma anomala"
            className="italic"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="family">Plant Family *</Label>
          <Input
            id="family"
            value={draft.family}
            onChange={(e) => onUpdate({ family: e.target.value })}
            placeholder="e.g., Asteraceae"
            list="family-suggestions"
          />
          <datalist id="family-suggestions">
            {familySuggestions.map(f => <option key={f} value={f} />)}
          </datalist>
        </div>

        <div className="space-y-2">
          <Label htmlFor="origin">Origin / Region *</Label>
          <Input
            id="origin"
            value={draft.origin}
            onChange={(e) => onUpdate({ origin: e.target.value })}
            placeholder="e.g., Sub-Saharan Africa"
          />
        </div>
      </div>

      <ArrayInput
        label="Other Common Names"
        values={draft.otherNames}
        onChange={(otherNames) => onUpdate({ otherNames })}
        placeholder="Add another name..."
      />

      <ArrayInput
        label="Local / Indigenous Names"
        values={draft.localNames}
        onChange={(localNames) => onUpdate({ localNames })}
        placeholder="Add local name..."
      />

      <ArrayInput
        label="Parts Used"
        values={draft.partsUsed}
        onChange={(partsUsed) => onUpdate({ partsUsed })}
        placeholder="Add plant part..."
        suggestions={partsSuggestions}
      />

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={draft.image}
          onChange={(e) => onUpdate({ image: e.target.value })}
          placeholder="https://example.com/plant-image.jpg"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="description">Description *</Label>
        </div>
        <Textarea
          id="description"
          value={draft.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Provide a detailed description of the plant, its characteristics, habitat, and significance..."
          rows={5}
        />
      </div>
    </motion.div>
  );
};
