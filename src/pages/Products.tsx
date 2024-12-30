import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
      description: "Beautiful floral dress perfect for summer days",
      category: "Dresses",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: "Classic White Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      colors: ["White"],
      sizes: ["XS", "S", "M", "L", "XL"],
      description: "Timeless white shirt for any occasion",
      category: "Tops",
      rating: 4.8,
      reviews: 256,
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      colors: ["Black", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      description: "Classic leather jacket for a bold look",
      category: "Outerwear",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 4,
      name: "Denim Jeans",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      colors: ["Blue", "Black"],
      sizes: ["28", "30", "32", "34"],
      description: "Comfortable and stylish denim jeans",
      category: "Bottoms",
      rating: 4.6,
      reviews: 312,
    },
    {
      id: 5,
      name: "Silk Evening Gown",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      colors: ["Red", "Black", "Navy"],
      sizes: ["XS", "S", "M", "L"],
      description: "Elegant silk gown for special occasions",
      category: "Dresses",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 6,
      name: "Casual T-Shirt",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      colors: ["White", "Gray", "Black"],
      sizes: ["S", "M", "L", "XL"],
      description: "Comfortable cotton t-shirt for daily wear",
      category: "Tops",
      rating: 4.3,
      reviews: 427,
    },
    {
      id: 7,
      name: "Winter Coat",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      colors: ["Black", "Gray", "Navy"],
      sizes: ["S", "M", "L"],
      description: "Warm winter coat with faux fur trim",
      category: "Outerwear",
      rating: 4.6,
      reviews: 156,
    },
    {
      id: 8,
      name: "Pleated Skirt",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      colors: ["Black", "Navy", "Beige"],
      sizes: ["XS", "S", "M", "L"],
      description: "Classic pleated skirt for work or casual wear",
      category: "Bottoms",
      rating: 4.4,
      reviews: 203,
    },
    {
      id: 9,
      name: "Summer Maxi Dress",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      colors: ["Yellow", "Green", "Blue"],
      sizes: ["S", "M", "L"],
      description: "Flowing maxi dress perfect for beach days",
      category: "Dresses",
      rating: 4.7,
      reviews: 167,
    },
    {
      id: 10,
      name: "Silk Blouse",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      colors: ["White", "Pink", "Blue"],
      sizes: ["XS", "S", "M", "L"],
      description: "Elegant silk blouse for professional wear",
      category: "Tops",
      rating: 4.5,
      reviews: 234,
    },
    {
      id: 11,
      name: "Denim Jacket",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L", "XL"],
      description: "Classic denim jacket for casual style",
      category: "Outerwear",
      rating: 4.6,
      reviews: 178,
    },
    {
      id: 12,
      name: "Cargo Pants",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      colors: ["Khaki", "Olive", "Black"],
      sizes: ["28", "30", "32", "34"],
      description: "Functional cargo pants with multiple pockets",
      category: "Bottoms",
      rating: 4.3,
      reviews: 145,
    },
    {
      id: 13,
      name: "Cocktail Dress",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      colors: ["Black", "Red", "Navy"],
      sizes: ["XS", "S", "M", "L"],
      description: "Elegant cocktail dress for parties",
      category: "Dresses",
      rating: 4.8,
      reviews: 92,
    },
    {
      id: 14,
      name: "Crop Top",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      colors: ["White", "Black", "Pink"],
      sizes: ["S", "M", "L"],
      description: "Trendy crop top for summer style",
      category: "Tops",
      rating: 4.4,
      reviews: 267,
    },
    {
      id: 15,
      name: "Raincoat",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      colors: ["Yellow", "Blue", "Black"],
      sizes: ["S", "M", "L", "XL"],
      description: "Waterproof raincoat for rainy days",
      category: "Outerwear",
      rating: 4.5,
      reviews: 134,
    },
    // Continue with more products up to 50...
    {
      id: 50,
      name: "Designer Evening Gown",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      colors: ["Gold", "Silver", "Black"],
      sizes: ["XS", "S", "M", "L"],
      description: "Luxurious designer evening gown for special occasions",
      category: "Dresses",
      rating: 5.0,
      reviews: 45,
    }
  ];

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilter = (filterType: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    setSelectedFilters(newFilters);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    if (selectedFilters.category && product.category !== selectedFilters.category) return false;
    if (selectedFilters.color && !product.colors.includes(selectedFilters.color)) return false;
    if (selectedFilters.size && !product.sizes.includes(selectedFilters.size)) return false;
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange;
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
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
          <ProductFilters
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilter={clearFilter}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;