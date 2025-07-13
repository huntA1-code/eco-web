
import { Product, ProductResponse } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";

export const mockProducts: Product[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  brand: ["Nike", "Adidas", "Puma", "Under Armour", "Zara", "H&M"][Math.floor(Math.random() * 6)],
  price: 29.99 + Math.floor(Math.random() * 200),
  image: "/placeholder.svg",
  colors: ["Red", "Blue", "Black", "White", "Gray"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  description: `High-quality product ${index + 1} with excellent features and comfortable fit.`,
  category: ["Casual Style", "Formal Wear", "Sports", "Accessories"][Math.floor(Math.random() * 4)],
  rating: 3.5 + Math.random() * 1.5,
  reviews: Math.floor(Math.random() * 500) + 10,
  discount: Math.random() > 0.7 ? {
    rate: Math.floor(Math.random() * 30) + 10,
    type: 'percentage' as const
  } : undefined
}));

export const mockFilters: FiltersResponse = {
  categories: [
    {
      id: "clothing",
      name: "Clothing",
      children: [
        {
          id: "mens",
          name: "Men's Clothing",
          children: [
            { id: "shirts", name: "Shirts" },
            { id: "pants", name: "Pants" },
            { id: "casual", name: "Casual Style" }
          ]
        },
        {
          id: "womens",
          name: "Women's Clothing",
          children: [
            { id: "dresses", name: "Dresses" },
            { id: "tops", name: "Tops" },
            { id: "formal", name: "Formal Wear" }
          ]
        }
      ]
    },
    {
      id: "shoes",
      name: "Shoes",
      children: [
        { id: "running", name: "Running Shoes" },
        { id: "casual-shoes", name: "Casual Shoes" }
      ]
    },
    { id: "accessories", name: "Accessories" },
    { id: "sports", name: "Sports" }
  ],
  types: ["Casual", "Sport", "Formal", "Business"],
  colors: [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "red", name: "Red", hex: "#FF0000" },
    { id: "blue", name: "Blue", hex: "#0000FF" },
    { id: "gray", name: "Gray", hex: "#808080" }
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  priceRange: [0, 500],
  styles: ["Casual", "Formal", "Sport", "Vintage", "Modern"],
  occasions: ["Daily", "Work", "Party", "Sport", "Travel"],
  brands: ["Nike", "Adidas", "Puma", "Under Armour", "Zara", "H&M"]
};

export const getMockProductsPage = (
  currentPage: number,
  productsPerPage: number
): ProductResponse => {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  return {
    products: mockProducts.slice(start, end),
    total: mockProducts.length,
    totalPages: Math.ceil(mockProducts.length / productsPerPage),
    currentPage,
    hasNextPage: currentPage < Math.ceil(mockProducts.length / productsPerPage),
    hasPreviousPage: currentPage > 1
  };
};
