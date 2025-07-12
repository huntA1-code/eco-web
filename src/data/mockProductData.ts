
import { Product, ProductResponse } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";

export const mockProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  brand: ["Nike", "Adidas", "Puma", "Under Armour"][Math.floor(Math.random() * 4)],
  price: 99.99 + Math.floor(Math.random() * 100),
  image: "/placeholder.svg",
  colors: ["Red", "Blue", "Black"],
  sizes: ["S", "M", "L", "XL"],
  description: "Product description",
  category: "Category",
  rating: 4 + Math.random(),
  reviews: Math.floor(Math.random() * 100)
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
            { id: "pants", name: "Pants" }
          ]
        },
        {
          id: "womens",
          name: "Women's Clothing",
          children: [
            { id: "dresses", name: "Dresses" },
            { id: "tops", name: "Tops" }
          ]
        }
      ]
    },
    {
      id: "shoes",
      name: "Shoes",
      children: [
        { id: "running", name: "Running Shoes" },
        { id: "casual", name: "Casual Shoes" }
      ]
    },
    { id: "accessories", name: "Accessories" }
  ],
  types: ["Casual", "Sport", "Formal"],
  colors: [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "red", name: "Red", hex: "#FF0000" }
  ],
  sizes: ["S", "M", "L", "XL"],
  priceRange: [0, 1000],
  styles: ["Casual", "Formal", "Sport"],
  occasions: ["Casual", "Formal", "Sport"],
  brands: ["Nike", "Adidas", "Puma"]
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
