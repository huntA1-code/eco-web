
import { CategoryNode } from "@/types/filters";
import { CategoryTree } from "@/components/CategoryTree";

interface CategoriesFilterProps {
  categories: CategoryNode[];
  selectedCategory?: string;
  onSelect: (categoryId: string) => void;
}

export const CategoriesFilter = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoriesFilterProps) => {
  return (
    <div className="pt-2">
      {categories.map((node) => (
        <CategoryTree
          key={node.id}
          node={node}
          selectedCategory={selectedCategory}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
