import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Beaker, Plus, Trash2, BookOpen, Lightbulb } from 'lucide-react';
import { ArrayInput } from '../array-input';
import type { PlantFormDraft } from '@/lib/store/plantStore';

interface ResearchStepProps {
  draft: PlantFormDraft;
  onUpdate: (updates: Partial<PlantFormDraft>) => void;
}

interface StudyForm {
  title: string;
  year: number | '';
  findings: string;
  source: string;
}

const emptyStudy: StudyForm = { title: '', year: '', findings: '', source: '' };

export const ResearchStep = ({ draft, onUpdate }: ResearchStepProps) => {
  const [newStudy, setNewStudy] = useState<StudyForm>(emptyStudy);

  const addStudy = () => {
    if (newStudy.title && newStudy.year && newStudy.findings && newStudy.source) {
      onUpdate({
        research: {
          ...draft.research,
          recentStudies: [
            ...draft.research.recentStudies,
            { ...newStudy, year: Number(newStudy.year) }
          ]
        }
      });
      setNewStudy(emptyStudy);
    }
  };

  const removeStudy = (index: number) => {
    onUpdate({
      research: {
        ...draft.research,
        recentStudies: draft.research.recentStudies.filter((_, i) => i !== index)
      }
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
        <Beaker className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Research & Studies</h2>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Recent Studies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing studies */}
          {draft.research.recentStudies.length > 0 && (
            <div className="space-y-3">
              {draft.research.recentStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-muted/50 rounded-lg relative group"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                    onClick={() => removeStudy(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                  <h4 className="font-medium text-sm pr-8">{study.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{study.year}</Badge>
                    <span className="text-xs text-muted-foreground">{study.source}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{study.findings}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Add new study form */}
          <div className="border border-dashed border-border rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Study Title</Label>
                <Input
                  value={newStudy.title}
                  onChange={(e) => setNewStudy({ ...newStudy, title: e.target.value })}
                  placeholder="Research title..."
                  className="text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Year</Label>
                  <Input
                    type="number"
                    value={newStudy.year}
                    onChange={(e) => setNewStudy({ ...newStudy, year: e.target.value ? parseInt(e.target.value) : '' })}
                    placeholder="2024"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Source</Label>
                  <Input
                    value={newStudy.source}
                    onChange={(e) => setNewStudy({ ...newStudy, source: e.target.value })}
                    placeholder="Journal name..."
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Key Findings</Label>
              <Input
                value={newStudy.findings}
                onChange={(e) => setNewStudy({ ...newStudy, findings: e.target.value })}
                placeholder="Main findings from the study..."
                className="text-sm"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addStudy}
              disabled={!newStudy.title || !newStudy.year || !newStudy.findings || !newStudy.source}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Study
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Future Research Directions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayInput
            label=""
            values={draft.research.futureDirections}
            onChange={(futureDirections) => onUpdate({
              research: { ...draft.research, futureDirections }
            })}
            placeholder="Add a future research direction..."
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
