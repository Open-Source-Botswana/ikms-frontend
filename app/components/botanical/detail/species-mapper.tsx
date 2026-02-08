import { motion } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SpeciesRelation } from '@/lib/types/ethnobotanical';

interface SpeciesMapperProps {
  currentSpecies: {
    name?: string;
    scientificName?: string;
  };
  relatedSpecies: SpeciesRelation[];
}

const relationshipColors: Record<string, string> = {
  parent: 'border-amber-500 bg-amber-500/10',
  sibling: 'border-primary bg-primary/10',
  child: 'border-emerald-500 bg-emerald-500/10',
  related: 'border-violet-500 bg-violet-500/10'
};

export function SpeciesMapper({ currentSpecies, relatedSpecies }: SpeciesMapperProps) {
  return (
    <div className="space-y-4">
      {/* Central Species */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative p-4 rounded-xl border-2 border-primary bg-primary/5 text-center"
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-card text-xs text-primary font-medium">
          Current Species
        </div>
        <h4 className="font-semibold text-foreground">{currentSpecies.name}</h4>
        <p className="text-sm text-muted-foreground italic">{currentSpecies.scientificName}</p>
      </motion.div>

      {/* Relationship Tree */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 w-0.5 h-4 bg-border -translate-x-1/2" />

        <div className="pt-4 space-y-2">
          {relatedSpecies.map((species, index) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer",
                relationshipColors[species.relationship]
              )}
            >

              <div className="absolute -top-2 left-6 w-0.5 h-2 bg-border" />

              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium text-sm truncate">{species.name}</h5>
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded capitalize",
                    species.relationship === 'sibling' && "bg-primary/20 text-primary",
                    species.relationship === 'related' && "bg-violet-500/20 text-violet-600"
                  )}>
                    {species.relationship}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground italic truncate">
                  {species.scientificName}
                </p>
              </div>


              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-foreground">{species.similarity}%</span>
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${species.similarity}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>


      <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
        {Object.entries(relationshipColors).map(([rel, color]) => (
          <div key={rel} className="flex items-center gap-1.5 text-xs">
            <div className={cn("w-3 h-3 rounded border-2", color)} />
            <span className="capitalize text-muted-foreground">{rel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
