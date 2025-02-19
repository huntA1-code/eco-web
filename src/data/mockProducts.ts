
import { ProductFormData } from "@/types/product";

export const getMockProduct = (id: string): ProductFormData => ({
  category_id: "1", // Men's Shoes
  brand_id: "1", // Nike
  name: "Nike Air Max 270",
  description: "The Nike Air Max 270 delivers modern comfort with a design inspired by Air Max icons. The shoe features Nike's biggest heel Air unit yet, providing all-day comfort while giving you an elevated look.",
  care_instructions: "- Clean with a soft, dry cloth\n- Avoid direct sunlight and heat\n- Store in a cool, dry place\n- Use shoe trees to maintain shape",
  about: "The Nike Air Max 270 men's shoe is inspired by two icons of Air: the Air Max 180 and Air Max 93. It features Nike's biggest heel Air unit yet, offering a super-soft ride that feels as impossible as it looks.",
  discount_id: "1", // Summer Sale
  attribute_options: ["1", "2"], // Cotton, Mesh
  product_items: [
    {
      color_id: "1", // Black
      name_details: "Black/White-Solar Red",
      original_price: 150,
      sale_price: 129.99,
      variations: [
        { size_id: "1", qty_in_stock: 15 }, // US 7
        { size_id: "2", qty_in_stock: 20 }, // US 8
        { size_id: "3", qty_in_stock: 18 }, // US 9
        { size_id: "4", qty_in_stock: 12 }, // US 10
      ],
      cart_image: "/uploads/black-cart.jpg",
      images: [
        { path: "/uploads/black-1.jpg", description: "Front view" },
        { path: "/uploads/black-2.jpg", description: "Side view" },
      ],
    },
    {
      color_id: "2", // White
      name_details: "White/University Blue-Pure Platinum",
      original_price: 150,
      sale_price: 129.99,
      variations: [
        { size_id: "1", qty_in_stock: 10 }, // US 7
        { size_id: "2", qty_in_stock: 25 }, // US 8
        { size_id: "3", qty_in_stock: 22 }, // US 9
        { size_id: "4", qty_in_stock: 15 }, // US 10
      ],
      cart_image: "/uploads/white-cart.jpg",
      images: [
        { path: "/uploads/white-1.jpg", description: "Front view" },
        { path: "/uploads/white-2.jpg", description: "Side view" },
      ],
    },
    {
      color_id: "3", // Gray
      name_details: "Wolf Grey/Cool Grey-Pure Platinum",
      original_price: 150,
      sale_price: 129.99,
      variations: [
        { size_id: "1", qty_in_stock: 8 }, // US 7
        { size_id: "2", qty_in_stock: 16 }, // US 8
        { size_id: "3", qty_in_stock: 20 }, // US 9
        { size_id: "4", qty_in_stock: 14 }, // US 10
      ],
      cart_image: "/uploads/gray-cart.jpg",
      images: [
        { path: "/uploads/gray-1.jpg", description: "Front view" },
        { path: "/uploads/gray-2.jpg", description: "Side view" },
      ],
    },
  ],
});
