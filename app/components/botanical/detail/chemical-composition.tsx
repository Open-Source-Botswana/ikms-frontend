import { useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, Atom, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChemicalCompound } from '@/lib/types/ethnobotanical';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';

interface ChemicalCompositionProps {
  compounds: ChemicalCompound[];
}

const categoryColors: Record<string, string> = {
  'Flavonoid': 'bg-emerald-500',
  'Sesquiterpene Lactone': 'bg-amber-500',
  'Phenolic Acid': 'bg-rose-500',
  'Triterpene': 'bg-violet-500'
};

export function ChemicalComposition({ compounds }: ChemicalCompositionProps) {
  const [selectedCompound, setSelectedCompound] = useState<ChemicalCompound | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalPercentage = compounds.reduce((acc, c) => acc + (c.percentage || 0), 0);

  return (
    <div className="space-y-6">
      {/* Interactive Bar Chart */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Beaker className="w-4 h-4" />
          Compound Distribution
        </h4>

        <div className="h-8 rounded-full overflow-hidden bg-muted flex">
          {compounds.map((compound, index) => {
            const width = ((compound.percentage || 0) / totalPercentage) * 100;
            return (
              <TooltipProvider>
              <Tooltip key={compound.name}>
                <TooltipTrigger asChild>
                  <motion.div
                    className={cn(
                      "h-full cursor-pointer transition-opacity relative",
                      categoryColors[compound.category] || 'bg-primary',
                      hoveredIndex !== null && hoveredIndex !== index && "opacity-40"
                    )}
                    style={{ width: `${width}%` }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onClick={() => setSelectedCompound(compound)}
                    whileHover={{ scale: 1.02 }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{compound.name}</p>
                  <p className="text-xs text-muted-foreground">{compound.percentage}%</p>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-1.5 text-xs">
              <div className={cn("w-3 h-3 rounded-full", color)} />
              <span className="text-muted-foreground">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compound Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {compounds.map((compound, index) => (
          <motion.div
            key={compound.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCompound(
              selectedCompound?.name === compound.name ? null : compound
            )}
            className={cn(
              "p-4 rounded-lg border cursor-pointer transition-all",
              selectedCompound?.name === compound.name
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h5 className="font-medium text-sm">{compound.name}</h5>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {compound.formula}
                </p>
              </div>
              <div className={cn(
                "px-2 py-1 rounded-md text-xs font-medium",
                categoryColors[compound.category]?.replace('bg-', 'bg-') + '/10',
                categoryColors[compound.category]?.replace('bg-', 'text-').replace('-500', '-600')
              )}>
                {compound.percentage}%
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: selectedCompound?.name === compound.name ? 'auto' : 0,
                opacity: selectedCompound?.name === compound.name ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Atom className="w-3 h-3" />
                  <span>{compound.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {compound.properties.map(prop => (
                    <span
                      key={prop}
                      className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
