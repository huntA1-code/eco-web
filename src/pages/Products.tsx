import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filters = {
    categories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"],
    types: ["Casual", "Formal", "Party", "Workwear", "Vacation"],
    colors: ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    priceRange: [0, 200],
    styles: ["Bohemian", "Classic", "Streetwear", "Minimalist", "Vintage"],
    occasions: ["Daily", "Work", "Party", "Beach", "Sports"],
  };

  const products = [
    {
      id: 1,
      name: "Floral Summer Dress",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      colors: ["Pink", "Blue"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 2,
      name: "Casual T-Shirt",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      colors: ["White", "Black"],
      sizes: ["XS", "S", "M", "L"],
    },
    // Add more products as needed
  ];

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilter = (filterType: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    setSelectedFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
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

      <div className="container px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-serif font-semibold">
            {category || "All Products"}
          </h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([type, value]) => (
              <Badge
                key={type}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-2"
              >
                {type}: {value}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => clearFilter(type)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className={`
            fixed inset-0 lg:static lg:block
            ${showMobileFilters ? 'block' : 'hidden'}
            lg:w-64 bg-background lg:bg-transparent
            z-50 lg:z-0 overflow-auto
          `}>
            <div className="p-4 lg:p-0">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-muted-foreground"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {filters.categories.map(cat => (
                      <div key={cat} className="flex items-center gap-2">
                        <Checkbox
                          id={cat}
                          checked={selectedFilters.category === cat}
                          onCheckedChange={() => handleFilterChange('category', cat)}
                        />
                        <label htmlFor={cat} className="text-sm cursor-pointer">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-medium mb-3">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.colors.map(color => (
                      <div
                        key={color}
                        onClick={() => handleFilterChange('color', color)}
                        className={`
                          w-8 h-8 rounded-full cursor-pointer
                          border-2 transition-all duration-200
                          ${selectedFilters.color === color ? 'ring-2 ring-primary ring-offset-2' : ''}
                        `}
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="font-medium mb-3">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.sizes.map(size => (
                      <div
                        key={size}
                        onClick={() => handleFilterChange('size', size)}
                        className={`
                          px-3 py-1 border rounded-md cursor-pointer
                          transition-all duration-200
                          ${selectedFilters.size === size
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                          }
                        `}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={1}
                    onValueChange={(value) => handleFilterChange('priceRange', value)}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${selectedFilters.priceRange?.[0] || 0}</span>
                    <span>${selectedFilters.priceRange?.[1] || 200}</span>
                  </div>
                </div>

                {/* Style */}
                <div>
                  <h3 className="font-medium mb-3">Style</h3>
                  <Select onValueChange={(value) => handleFilterChange('style', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {filters.styles.map(style => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <div key={product.id} className="card group animate-fade-up">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full btn-primary">
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-primary font-semibold mt-1">
                      ${product.price}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {product.colors.map(color => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;