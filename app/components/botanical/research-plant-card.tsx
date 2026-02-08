
import { MedicinalPlant, ResearchArea } from "@/lib/types/botanical";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ResearchCardProps {
  research: MedicinalPlant;
  index: number;
}

export function ResearchCard({ research, index }: ResearchCardProps) {
  return (
    <Link
      href={`/research/${research.id}`}
      className="group relative overflow-hidden rounded-lg card-hover block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={research.image}
          alt={research.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 image-overlay" />


      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {research.image}
        </h3>
        <p className="text-sm text-foreground/70 line-clamp-2 mb-3">
          {research.description}
        </p>
        <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
