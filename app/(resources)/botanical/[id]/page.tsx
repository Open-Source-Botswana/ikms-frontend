'use client';

//import { useParams } from 'next/navigation';

import { useEthnobotanyStore } from '@/lib/store/ethnobotanyStore';

import { RecordDetailView } from '@/app/components/botanical/plant-detail-view';
import { useAdmin } from '@/app/hooks/use-admin';
import React, { use } from 'react';
import { Button } from '@/app/components/ui/button';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

    //check role via clerk

//    const resolvedParams = React.use(params);
//    const id = resolvedParams.id;

 const {id} = use(params);

  console.warn(`[Plant ID] checking plant Id : ${params}`);
  const plant = useEthnobotanyStore(state => state.getPlantById(id));

  if (!plant) {
    return (
      <div className="container py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4">Loading plant record...</p>
      </div>
    );
  }

  if (plant.status !== 'published') {
    return (
      <div className="container py-8 mt-28">
        <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h1 className="text-xl font-bold mb-2">
            Record Not Publicly Available
          </h1>
          <p className="text-muted-foreground">
            This record is currently in verification workflow (Status:{' '}
            {plant.status}). Only published records are visible to the public.
          </p>
          <p className="mt-4 text-sm text-yellow-800">
            Admins: Use the admin verification panel to progress this record.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-7xl mx-auto mt-28">
      <RecordDetailView record={plant} userRole="public" viewMode="public" />

      <div className="mt-8 text-center text-sm text-muted-foreground border-t pt-6">
        <p>
          Data provided by {plant.culturalAuthority?.communityName} • Published:{' '}
          {plant?.publishedAt &&
            new Date(plant?.publishedAt).toLocaleDateString()}
        </p>
        <p className="mt-1">Respectful use required per access protocol</p>

              {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="text-center"
      >
        <div className="glass-card leaf-shadow rounded-3xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join our community of knowledge keepers, researchers, and advocates
            working to preserve ethnobotanical wisdom while building bridges to a
            unified and modern society.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {}}
              size="lg"
              className="gap-3 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              🌿 Share Your Knowledge
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-3 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-full px-8 py-4"
            >
              <Target className="w-5 h-5" />
              Subscribe for more exclusive insights
            </Button>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
