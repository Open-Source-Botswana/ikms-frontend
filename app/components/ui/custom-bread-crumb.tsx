
import { BreadcrumbItem } from "@/lib/types/botanical";
import { ChevronRight } from "lucide-react";
import Link from "next/link";


interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-white" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-white text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
