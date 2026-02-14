import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EthnobotanicalMetadata, PlantImages, VerificationEvent } from '@/lib/types/ethnobotanical';
import { mockPlants } from '@/app/utils/data/ethnobotany'

export interface PlantFormDraft {
  // Basic Info
  name: string;
  scientificName: string;
  otherNames: string[];
  localNames: string[];
  family: string;
  origin: string;
  partsUsed: string[];
  image: string;
  description: string;

  // Medicinal Info
  medicinalQualities: string[];
  traditionalUses: string[];
  modernMedicine: {
    activeCompounds: string[];
    clinicalStudies: string[];
    approvedUses: string[];
    contradictions: string[];
  };
  homeopathicUses: {
    preparations: string[];
    conditions: string[];
    dosage: string;
  };

  // Research
  research: {
    recentStudies: Array<{
      title: string;
      year: number;
      findings: string;
      source: string;
    }>;
    futureDirections: string[];
  };
  references: string[];

  // Cultural Authority
  culturalAuthority: {
    communityName: string;
    territory: string;
    representative: string;
    contactEmail: string;
    indigenousSystem: string;
  };
  labelDomain: 'traditional' | 'biocultural' | 'research';
  tkLabels: string[];
  bcLabels: string[];
  customCulturalId: string;

  // Compliance & Consent
  consentStatus: 'verified' | 'pending' | 'expired';
  consentExpiry: string;
  accessProtocol: string;
  benefitSharingAgreement: string;
  associatedTerritory: string;
  copyrightNotice: string;
  sensitivityLevel: 'public' | 'restricted' | 'confidential';
  ipMetadata: string;

  // Location
  location: {
    unescoSite: boolean;
    undpSupported: boolean;
  };

  galleryImages: PlantImages[];
}

const createEmptyDraft = (): PlantFormDraft => ({
  name: '',
  scientificName: '',
  otherNames: [],
  localNames: [],
  family: '',
  origin: '',
  partsUsed: [],
  image: '',
  description: '',
  medicinalQualities: [],
  traditionalUses: [],
  modernMedicine: {
    activeCompounds: [],
    clinicalStudies: [],
    approvedUses: [],
    contradictions: []
  },
  homeopathicUses: {
    preparations: [],
    conditions: [],
    dosage: ''
  },
  research: {
    recentStudies: [],
    futureDirections: []
  },
  references: [],
  culturalAuthority: {
    communityName: '',
    territory: '',
    representative: '',
    contactEmail: '',
    indigenousSystem: ''
  },
  labelDomain: 'traditional',
  tkLabels: [],
  bcLabels: [],
  customCulturalId: '',
  consentStatus: 'pending',
  consentExpiry: '',
  accessProtocol: '',
  benefitSharingAgreement: '',
  associatedTerritory: '',
  copyrightNotice: '',
  sensitivityLevel: 'public',
  ipMetadata: '',
  location: {
    unescoSite: false,
    undpSupported: false
  },
  galleryImages: []
});

interface PlantStore {

  plants: EthnobotanicalMetadata[];
  currentStep: number;
  draft: PlantFormDraft;
  isEditing: boolean;
  editingId: string | null;

  // Actions
  setPlants: (plants: EthnobotanicalMetadata[]) => void;
  addPlant: (plant: EthnobotanicalMetadata) => void;
  updatePlant: (id: string, updates: Partial<EthnobotanicalMetadata>) => void;
  deletePlant: (id: string) => void;
  getPlantById: (id: string) => EthnobotanicalMetadata | undefined;

  // Form actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateDraft: (updates: Partial<PlantFormDraft>) => void;
  resetDraft: () => void;
  startEditing: (id: string) => void;
  submitDraft: () => void;
}

const generateVerificationEvents = (plantName: string): VerificationEvent[] => {
  return [
    { stage: 1, stageName: 'Initial Submission', status: 'completed', completedAt: new Date().toISOString(), completedBy: 'admin-001', comments: `Initial submission for ${plantName}` },
    { stage: 2, stageName: 'Cultural Authority Review', status: 'in_progress', completedBy: undefined },
    { stage: 3, stageName: 'Scientific Verification', status: 'pending' },
    { stage: 4, stageName: 'Final Approval', status: 'pending' }
  ];
};

export const usePlantStore = create<PlantStore>()(
  persist(
    (set, get) => ({


      //plants: [typeof window !== 'undefined' && localStorage.getItem('plant-store-a00001a') ? JSON.parse(localStorage.getItem('plant-store-a00001a') || '[]').plants : initialMockPlants],
      plants: [],
      currentStep: 0,
      draft: createEmptyDraft(),
      isEditing: false,
      editingId: null,

      setPlants: (plants) => set({ plants }),

      addPlant: plant => set((state) => ({
        plants: [...state.plants, plant],
      })),

      updatePlant: (id, updates) => set((state) => ({
        plants: state.plants.map(p =>
          p.id === id ? { ...p, ...updates, lastUpdated: new Date().toISOString() } : p
        )
      })),

      deletePlant: (id) => set((state) => ({
        plants: state.plants.filter(p => p.id !== id)
      })),

      getPlantById: (id) => {
        const plant = get().plants.find(p => p.id === id);
        return plant;
      },

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      updateDraft: (updates) => set((state) => ({
        draft: { ...state.draft, ...updates }
      })),

      resetDraft: () => set({
        draft: createEmptyDraft(),
        currentStep: 0,
        isEditing: false,
        editingId: null
      }),

      startEditing: (id) => {
        const plant = get().plants.find(p => p.id === id);
        if (plant) {
          set({
            isEditing: true,
            editingId: id,
            currentStep: 0,
            draft: {
              name: plant.name,
              scientificName: plant.scientificName,
              otherNames: plant.otherNames,
              localNames: plant.localNames,
              family: plant.family,
              origin: plant.origin,
              partsUsed: plant.partsUsed,
              image: plant.image,
              description: plant.description,
              medicinalQualities: plant.medicinalQualities,
              traditionalUses: plant.traditionalUses,
              modernMedicine: plant.modernMedicine,
              homeopathicUses: plant.homeopathicUses,
              research: plant.research,
              references: plant.references,
              culturalAuthority: plant.culturalAuthority,
              labelDomain: plant.labelDomain,
              tkLabels: plant.tkLabels || [],
              bcLabels: plant.bcLabels || [],
              customCulturalId: plant.customCulturalId,
              consentStatus: plant.consentStatus,
              consentExpiry: plant.consentExpiry,
              accessProtocol: plant.accessProtocol,
              benefitSharingAgreement: plant.benefitSharingAgreement,
              associatedTerritory: plant.associatedTerritory,
              copyrightNotice: plant.copyrightNotice,
              sensitivityLevel: plant.sensitivityLevel,
              ipMetadata: plant.ipMetadata || '',
              location: {
                unescoSite: plant.location?.unescoSite || false,
                undpSupported: plant.location?.undpSupported || false
              },
              galleryImages: plant.galleryImages || []
            }
          });
        }
      },

      submitDraft: () => {
        const { draft, isEditing, editingId, plants } = get();
        const now = new Date().toISOString();

        if (isEditing && editingId) {
          // Update existing plant
          set({
            plants: plants.map(p => p.id === editingId ? {
              ...p,
              ...draft,
              lastUpdated: now
            } : p),
            draft: createEmptyDraft(),
            currentStep: 0,
            isEditing: false,
            editingId: null
          });
        } else {
          // Create new plant
          const newPlant: EthnobotanicalMetadata = {
            id: `plant-${Date.now()}`,
            ...draft,
            docId: `doi:10.5281/ethnoflora.${draft.customCulturalId || Date.now()}`,
            status: 'pending_review',
            currentStage: 1,
            verificationStages: generateVerificationEvents(draft.name),
            feedback: '',
            hasRequiredLabels: draft.tkLabels.length > 0 || draft.bcLabels.length > 0,
            hasConsentDocumentation: draft.consentStatus === 'verified',
            hasGeographicPrecision: true,
            standardsCompliance: {
              darwinCore: true,
              localContexts: draft.tkLabels.length > 0,
              nagoyaProtocol: draft.consentStatus === 'verified',
              berneConvention: !!draft.copyrightNotice
            },
            dateCreated: now,
            lastUpdated: now,
            createdBy: 'current-user'
          };

          set({
            plants: [...plants, newPlant],
            draft: createEmptyDraft(),
            currentStep: 0
          });
        }
      }
    }),
    {
      name: 'plant-store-a00010a',
      partialize: (state) => ({ plants: state.plants }),

    }
  )
);
