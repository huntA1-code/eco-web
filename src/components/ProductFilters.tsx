import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { CategoryTree } from "@/components/CategoryTree";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryNode, FilterState } from "@/types/filters";

const categoryTree: CategoryNode[] = [
  {
    id: "women",
    name: "Women Apparel",
    children: [
      {
        id: "women-clothing",
        name: "Women Clothing",
        children: [
          {
            id: "women-bottoms",
            name: "Women Bottoms",
            children: [
              {
                id: "women-pants",
                name: "Women Pants"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sports",
    name: "Sports & Outdoor",
    children: [
      {
        id: "women-activewear",
        name: "Women Activewear",
        children: [
          {
            id: "women-active-tops",
            name: "Women Active Tops",
            children: [
              {
                id: "women-sports-tees",
                name: "Women Sports Tees & Tanks"
              },
              {
                id: "women-sports-sweatshirts",
                name: "Women Sports Sweatshirts"
              }
            ]
          }
        ]
      }
    ]
  }
];

interface ProductFiltersProps {
  selectedFilters: FilterState;
  onFilterChange: (filterType: string, value: any) => void;
  onClearFilter: (filterType: string) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  filters: {
    categories: string[];
    types: string[];
    colors: string[];
    sizes: string[];
    priceRange: number[];
    styles: string[];
    occasions: string[];
  };
}

export const ProductFilters = ({
  selectedFilters,
  onFilterChange,
  onClearFilter,
  showMobileFilters,
  setShowMobileFilters,
  filters,
}: ProductFiltersProps) => {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div
        className={`
          fixed inset-0 lg:static lg:block
          ${showMobileFilters ? 'block' : 'hidden'}
          lg:w-64 bg-background lg:bg-transparent
          z-50 lg:z-0 overflow-auto
          scrollbar-hide
        `}
      >
        <div className="p-4 lg:p-0">
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-muted-foreground"
            >
              <Filter size={24} />
            </button>
          </div>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem value="categories">
              <AccordionTrigger className="text-base font-medium">
                Categories
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2">
                  {categoryTree.map((node) => (
                    <CategoryTree
                      key={node.id}
                      node={node}
                      selectedCategory={selectedFilters.category}
                      onSelect={(categoryId) => onFilterChange('category', categoryId)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger className="text-base font-medium">
                Price Range
              </AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={1}
                  onValueChange={(value) => onFilterChange('priceRange', value)}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${selectedFilters.priceRange?.[0] || 0}</span>
                  <span>${selectedFilters.priceRange?.[1] || 200}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};