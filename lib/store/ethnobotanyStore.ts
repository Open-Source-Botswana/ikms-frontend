import { create } from 'zustand';
import { EthnobotanicalMetadata } from '../types/botanical';
import { persist } from 'zustand/middleware';

interface EthnobotanyStore {
  plants: EthnobotanicalMetadata[];
  currentPlant: Partial<EthnobotanicalMetadata> | null;

  addPlant: (plant: EthnobotanicalMetadata) => void;
  updatePlant: (id: string, updates: Partial<EthnobotanicalMetadata>) => void;
  deletePlant: (id: string) => void;
  setCurrentPlant: (plant: Partial<EthnobotanicalMetadata> | null) => void;
  resetCurrentPlant: () => void;
  getPlantById: (id: string) =>  Partial<EthnobotanicalMetadata> | undefined;

  // Utility
  clearAllPlants: () => void; // For development/testing
}

export const useEthnobotanyStore = create<EthnobotanyStore>()(

  persist(
    (set, get) => ({
      plants: [],
      currentPlant: null,

      addPlant: plant => {
        if (get().plants.some(p => p.id === plant.id)) {
          console.error(`[Store] Duplicate plant ID detected: ${plant.id}`);
          throw new Error('Plant with this ID already exists');
        }
        set(state => ({ plants: [...state.plants, plant] }));
        console.log(`[Store] Added plant: ${plant.id} (${plant.name})`);
      },

      updatePlant: (id, updates) => {
        set(state => ({
          plants: state.plants.map(p =>
            p.id === id ? { ...p, ...updates, lastUpdated: new Date().toISOString() } : p
          )
        }));
        console.log(`[Store] Updated plant ${id}:`, updates);
      },



      deletePlant: (id) => set(state => ({
        plants: state.plants.filter(p => p.id !== id)
      })),

      setCurrentPlant: plant => set({ currentPlant: plant }),

      resetCurrentPlant: () => set({
        currentPlant: {
          // id: crypto.randomUUID(),
          id: '',
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
          // Cultural fields
          culturalAuthority: {
            communityName: '',
            territory: '',
            representative: '',
            contactEmail: ''
          },
          labelDomain: 'traditional',
          tkLabels: [],
          bcLabels: [],
          customCulturalId: '',
          consentStatus: 'pending',
          accessProtocol: '',
          associatedTerritory: '',
          copyrightNotice: ''
        }
      }),

      getPlantById: (id) => {
        const plant = get().plants.find(p => p.id === id);
        if (!plant) {
          console.warn(`[Store] Plant not found: ${id}`);
        }
        return plant;
      },

      clearAllPlants: () => set({ plants: [] })
    }), { name: 'ethobotany-store-a00001a' }

  )
)
