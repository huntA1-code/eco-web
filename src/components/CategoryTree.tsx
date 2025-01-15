import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CategoryNode } from "@/types/filters";
import { cn } from "@/lib/utils";

interface CategoryTreeProps {
  node: CategoryNode;
  level?: number;
  selectedCategory?: string;
  onSelect: (categoryId: string) => void;
}

export const CategoryTree = ({
  node,
  level = 0,
  selectedCategory,
  onSelect,
}: CategoryTreeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="w-full">
      <div 
        className={cn(
          "flex items-center gap-2 py-2 px-2 hover:bg-secondary/50 rounded-md cursor-pointer",
          selectedCategory === node.id && "bg-secondary",
          level > 0 && "ml-4"
        )}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          }
          onSelect(node.id);
        }}
      >
        {hasChildren && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-secondary rounded-sm"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        <span className="text-sm">{node.name}</span>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-2">
          {node.children.map((child) => (
            <CategoryTree
              key={child.id}
              node={child}
              level={level + 1}
              selectedCategory={selectedCategory}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};