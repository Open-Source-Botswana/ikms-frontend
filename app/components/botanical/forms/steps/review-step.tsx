import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle2, AlertCircle, XCircle, Send, Leaf, Stethoscope, Users, FileCheck, Beaker } from 'lucide-react';
import type { PlantFormDraft } from '@/lib/store/plantStore';

interface ReviewStepProps {
  draft: PlantFormDraft;
}

interface SectionReviewProps {
  title: string;
  icon: React.ReactNode;
  items: { label: string; value: string | string[] | boolean | undefined; required?: boolean }[];
}

const SectionReview = ({ title, icon, items }: SectionReviewProps) => {
  const hasAllRequired = items
    .filter(item => item.required)
    .every(item => {
      if (Array.isArray(item.value)) return item.value.length > 0;
      if (typeof item.value === 'boolean') return true;
      return !!item.value;
    });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
          {hasAllRequired ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, index) => {
          const isEmpty = Array.isArray(item.value)
            ? item.value.length === 0
            : !item.value;

          return (
            <div key={index} className="flex items-start justify-between gap-2 text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                {item.label}
                {item.required && <span className="text-destructive">*</span>}
              </span>
              <span className="text-right max-w-[60%]">
                {Array.isArray(item.value) ? (
                  item.value.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {item.value.slice(0, 3).map((v, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{v}</Badge>
                      ))}
                      {item.value.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{item.value.length - 3}</Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground italic">Not provided</span>
                  )
                ) : typeof item.value === 'boolean' ? (
                  item.value ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 inline" />
                  ) : (
                    <XCircle className="w-4 h-4 text-muted-foreground inline" />
                  )
                ) : isEmpty ? (
                  <span className="text-muted-foreground italic">Not provided</span>
                ) : (
                  <span className="truncate block">{item.value}</span>
                )}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export const ReviewStep = ({ draft }: ReviewStepProps) => {
  const isComplete = !!(
    draft.name &&
    draft.scientificName &&
    draft.family &&
    draft.description &&
    draft.culturalAuthority.communityName &&
    draft.culturalAuthority.territory
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Send className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Review & Submit</h2>
      </div>

      <div className={`p-4 rounded-lg border ${isComplete ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-700 dark:text-green-400">Ready to submit</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-yellow-700 dark:text-yellow-400">Please complete all required fields</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionReview
          title="Basic Information"
          icon={<Leaf className="w-4 h-4" />}
          items={[
            { label: 'Name', value: draft.name, required: true },
            { label: 'Scientific Name', value: draft.scientificName, required: true },
            { label: 'Family', value: draft.family, required: true },
            { label: 'Origin', value: draft.origin },
            { label: 'Parts Used', value: draft.partsUsed },
            { label: 'Local Names', value: draft.localNames }
          ]}
        />

        <SectionReview
          title="Medicinal Info"
          icon={<Stethoscope className="w-4 h-4" />}
          items={[
            { label: 'Qualities', value: draft.medicinalQualities },
            { label: 'Traditional Uses', value: draft.traditionalUses },
            { label: 'Active Compounds', value: draft.modernMedicine.activeCompounds },
            { label: 'Preparations', value: draft.homeopathicUses.preparations }
          ]}
        />

        <SectionReview
          title="Cultural Authority"
          icon={<Users className="w-4 h-4" />}
          items={[
            { label: 'Community', value: draft.culturalAuthority.communityName, required: true },
            { label: 'Territory', value: draft.culturalAuthority.territory, required: true },
            { label: 'Representative', value: draft.culturalAuthority.representative },
            { label: 'TK Labels', value: draft.tkLabels },
            { label: 'BC Labels', value: draft.bcLabels }
          ]}
        />

        <SectionReview
          title="Compliance"
          icon={<FileCheck className="w-4 h-4" />}
          items={[
            { label: 'Consent Status', value: draft.consentStatus },
            { label: 'Sensitivity', value: draft.sensitivityLevel },
            { label: 'IP Metadata', value: draft.ipMetadata },
            { label: 'UNESCO Site', value: draft.location.unescoSite },
            { label: 'UNDP Supported', value: draft.location.undpSupported }
          ]}
        />

        <SectionReview
          title="Research"
          icon={<Beaker className="w-4 h-4" />}
          items={[
            { label: 'Studies', value: draft.research.recentStudies.map(s => s.title) },
            { label: 'Future Directions', value: draft.research.futureDirections },
            { label: 'References', value: draft.references }
          ]}
        />
      </div>
    </motion.div>
  );
};
