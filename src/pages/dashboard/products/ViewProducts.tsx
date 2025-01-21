import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProductFormData } from "@/types/product";

// Mock data type
interface Product {
  id: number;
  name: string;
  description: string;
  sale_price: number;
  qty_in_stock: number;
  is_featured: boolean;
  category: string;
  image: string;
}

// Mock data - replace with API call
const products: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt",
    sale_price: 29.99,
    qty_in_stock: 100,
    is_featured: true,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 2,
    name: "Denim Jeans",
    description: "Classic blue denim jeans",
    sale_price: 59.99,
    qty_in_stock: 75,
    is_featured: false,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
  },
];

const ViewProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    console.log("Deleting product:", id);
    // Implement delete functionality here
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    });
  };

  const handleEdit = async (id: number) => {
    try {
      console.log("Fetching product details for ID:", id);
      
      // Mock API call - replace with actual API call
      const response = await fetchProductDetails(id);
      
      // Store the full product data in localStorage for the edit page
      localStorage.setItem('editProductData', JSON.stringify(response));
      
      // Navigate to edit page with the product ID
      navigate(`/dashboard/products/edit/${id}`);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch product details",
        variant: "destructive",
      });
    }
  };

  // Mock function to fetch product details - replace with actual API call
  const fetchProductDetails = async (id: number): Promise<ProductFormData> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response - replace with actual API data
    return {
      category_id: "1",
      brand_id: "1",
      name: "Classic T-Shirt",
      description: "Comfortable cotton t-shirt",
      care_instructions: "Machine wash cold",
      about: "Premium quality cotton t-shirt",
      is_featured: true,
      discount_id: "1",
      attribute_options: ["1", "2"],
      product_items: [
        {
          color_id: "1",
          name_details: "Black Classic T-Shirt",
          original_price: 39.99,
          sale_price: 29.99,
          product_code: "TSH001-BLK",
          variations: [
            {
              size_id: "1",
              qty_in_stock: 50,
            },
            {
              size_id: "2",
              qty_in_stock: 30,
            },
          ],
          images: [],
        },
      ],
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory here.
          </p>
        </div>
        <Link to="/dashboard/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.sale_price}</TableCell>
                <TableCell>{product.qty_in_stock}</TableCell>
                <TableCell>
                  {product.is_featured ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ViewProducts;