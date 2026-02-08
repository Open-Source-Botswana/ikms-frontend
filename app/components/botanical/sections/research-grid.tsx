import { MedicinalPlant, ResearchArea } from '@/lib/types/botanical';

import PlantCard from '../plant-card';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import BotanicalSearchBar from '../search-bar';
import { PlantModal } from '../plant-modal';
import { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical';

interface ResearchGridProps {
  areas: EthnobotanicalMetadata[];
  title?: string;
}

export function ResearchGrid({ areas, title }: ResearchGridProps) {
  const [selectedPlant, setSelectedPlant] =
    useState<EthnobotanicalMetadata | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('All Families');
  const [selectedOrigin, setSelectedOrigin] = useState('All Origins');
  const [selectedPartUsed, setSelectedPartUsed] = useState('All Parts');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedFamily,
    selectedOrigin,
    selectedPartUsed,
    selectedCondition,
  ]);
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFamily('All Families');
    setSelectedOrigin('All Origins');
    setSelectedPartUsed('All Parts');
    setSelectedCondition('All Conditions');
  };

  const filteredPlants = useMemo(() => {
    return areas.filter(plant => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.medicinalQualities.some(quality =>
          quality.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        plant.traditionalUses.some(use =>
          use.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFamily =
        selectedFamily === 'All Families' || plant.family === selectedFamily;
      const matchesOrigin =
        selectedOrigin === 'All Origins' || plant.origin === selectedOrigin;
      const matchesPartUsed =
        selectedPartUsed === 'All Parts' ||
        plant.partsUsed.some(part => part === selectedPartUsed);

      return matchesSearch && matchesFamily && matchesOrigin && matchesPartUsed;
    });
  }, [areas, searchTerm, selectedFamily, selectedOrigin, selectedPartUsed]);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="section-title text-foreground mb-10 text-white">
            {title}
          </h2>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1">
              <BotanicalSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedFamily={selectedFamily}
                onFamilyChange={setSelectedFamily}
                selectedOrigin={selectedOrigin}
                onOriginChange={setSelectedOrigin}
                selectedPartUsed={selectedPartUsed}
                onPartUsedChange={setSelectedPartUsed}
                selectedCondition={selectedCondition}
                onConditionChange={setSelectedCondition}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-white text-muted-foreground">
            Showing {areas.length} of {filteredPlants.length} plants
            {filteredPlants.length !== areas.length &&
              ` (filtered from ${areas.length} total)`}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant, index) => (
            <PlantCard
              key={index + plant.id}
              plant={plant}
              onCardClick={setSelectedPlant}
              index={index}
            />
            // <ResearchCard key={area.id} research={area} index={index} />
          ))}
        </div>

        <PlantModal
          plant={selectedPlant}
          isOpen={!!selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      </div>
    </section>
  );
}
