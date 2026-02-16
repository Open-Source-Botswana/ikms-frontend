import { usePlantStore } from "@/lib/store/plantStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BasicInfoStep } from "./steps/basic-info-step";
import Layout from "@/app/(admin)/ethnobotany/layout";
import { AnimatePresence, motion } from "framer-motion";
import { FormProgress } from "./form-progress";
import { FormNavigation } from "./form-navigation";
import { Button } from "../../ui/button";
import { LucideArrowLeft } from "lucide-react";
import { on } from "events";
import { MedicinalInfoStep } from "./steps/medicinal-info";
import { CulturalAuthorityStep } from "./steps/cultural-authority";
import { ComplianceStep } from "./steps/compliance";
import { ResearchStep } from "./steps/research";
import { ReviewStep } from "./steps/review-step";
import { ImagesStep } from "./steps/images-step";
import { DocumentsStep } from "./steps/documents-step";



const FORM_STEPS = [
  { title: 'Basic Info', description: 'Plant identification and description' },
  { title: 'Medicinal', description: 'Traditional and modern medicinal uses' },
  { title: 'Cultural', description: 'Cultural authority and labels' },
  { title: 'Compliance', description: 'Consent and IP metadata' },
  { title: 'Research', description: 'Studies and references' },
  { title: 'Images', description: 'Upload and manage plant images' },
  { title: 'Documents', description: 'Upload research papers, consent forms, etc.' },
  { title: 'Review', description: 'Review and submit' }
];

interface PlantFormProps {
  onClose: () => void;
  onSuccess: () => void;
}


export default function PlanForm(
    {onClose, onSuccess}: PlantFormProps
) {

      const navigate = useRouter();
  const {
    currentStep,
    draft,
    isEditing,
    setCurrentStep,
    nextStep,
    prevStep,
    updateDraft,
    submitDraft,
    resetDraft
  } = usePlantStore();

  const handleSubmit = () => {

    submitDraft();
    toast.success(
      isEditing ? 'Plant record updated successfully!' : 'Plant submitted for verification!',
      { description: 'You can track its progress in the dashboard.' }
    );
    onSuccess();
    resetDraft();
  };

  const handleSave = () => {
    toast.info('Draft saved', { description: 'Your progress has been saved locally.' });
  };

    const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!(draft.name && draft.scientificName && draft.family && draft.description);
      case 1:
        return true;
      case 2:
        return !!(draft.culturalAuthority.communityName && draft.culturalAuthority.territory);
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return !!(
          draft.name &&
          draft.scientificName &&
          draft.family &&
          draft.description &&
          draft.culturalAuthority.communityName &&
          draft.culturalAuthority.territory
        );
      default:
        return true;
    }
  };

    const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep draft={draft} onUpdate={updateDraft} />;
      case 1:
        return <MedicinalInfoStep draft={draft} onUpdate={updateDraft} />;
      case 2:
        return <CulturalAuthorityStep draft={draft} onUpdate={updateDraft} />;
      case 3:
        return <ComplianceStep draft={draft} onUpdate={updateDraft} />;
      case 4:
        return <ResearchStep draft={draft} onUpdate={updateDraft} />;
      case 5:
        return <ImagesStep draft={draft} onUpdate={updateDraft} />;
      case 6:
        return <DocumentsStep draft={draft} onUpdate={updateDraft} />;
      case 7:
        return <ReviewStep draft={draft} />;
      default:
        return null;
    }
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
    <Button
        onClick={() => onClose()}
        variant={'ghost'}
        size="icon"
        className="mb-9"
      >
        <LucideArrowLeft size={20} />
       Close
      </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {isEditing ? 'Edit Plant Record' : 'Submit New Plant Record'}
            </h1>
            <p className="text-muted-foreground">
              Complete the form to submit ethnobotanical data for verification
            </p>
          </div>

          <FormProgress
            steps={FORM_STEPS}
            currentStep={currentStep}
            onStepClick={(step) => {
              if (step <= currentStep) setCurrentStep(step);
            }}
          />

          <div className="bg-card border border-border rounded-xl p-6 min-h-[400px]">
            <AnimatePresence mode="wait">
              <div key={currentStep}>
                {renderStep()}
              </div>
            </AnimatePresence>
          </div>

          <FormNavigation
            currentStep={currentStep}
            totalSteps={FORM_STEPS.length}
            onNext={nextStep}
            onPrev={prevStep}
            onSave={handleSave}
            onSubmit={handleSubmit}
            isValid={isStepValid()}
          />
        </motion.div>
      </div>
    </Layout>
  )
}
