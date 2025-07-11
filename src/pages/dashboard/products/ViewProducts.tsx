
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
import { Edit, Plus, Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

// Mock data - replace with actual data fetching
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

  const handleEdit = () => {
    navigate(`/dashboard/products/edit`);
  };

  const handleManageVariations = (id: number) => {
    navigate(`/dashboard/products/${id}/variations`);
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

      <div className="table-container">
        <Table className="data-table">
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
                      onClick={() => handleManageVariations(product.id)}
                      title="Manage Variations"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit()}
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
