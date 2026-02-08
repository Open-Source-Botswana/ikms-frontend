import { RotateCcw } from "lucide-react";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange
}: CategoryNavProps) {
  return (
    <nav className="bg-black/80 backdrop-blur-sm border-y border-border sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onCategoryChange(categories[0])}
            className="flex items-center gap-2 text-sm text-white text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-white" />
            <span>Reset</span>
          </button>

          <div className="w-px h-6 bg-border mx-2" />

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 text-sm text-white font-medium rounded-full transition-all shrink-0 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
