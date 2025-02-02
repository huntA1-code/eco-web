import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/types/discount";

// Mock data - replace with API calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt",
    category_id: "1",
    brand_id: "1",
    is_featured: true,
  },
  {
    id: "2",
    name: "Denim Jeans",
    description: "Classic blue denim jeans",
    category_id: "1",
    brand_id: "2",
    is_featured: false,
  },
];

const DiscountProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleRemoveProduct = async (productId: string) => {
    try {
      console.log("Removing product from discount:", id, productId);
      // API call to remove product from discount
      toast({
        title: "Success",
        description: "Product removed from discount",
      });
    } catch (error) {
      console.error("Error removing product:", error);
      toast({
        title: "Error",
        description: "Failed to remove product",
        variant: "destructive",
      });
    }
  };

  const handleAddProducts = async () => {
    try {
      console.log("Adding products to discount:", id, selectedProducts);
      // API call to add products to discount
      toast({
        title: "Success",
        description: "Products added to discount",
      });
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error adding products:", error);
      toast({
        title: "Error",
        description: "Failed to add products",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Discount Products</h2>
          <p className="text-muted-foreground">
            Manage products for this discount
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/discounts")}>
          Back to Discounts
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            onClick={handleAddProducts}
            disabled={selectedProducts.length === 0}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Selected Products
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(filteredProducts.map((p) => p.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts([...selectedProducts, product.id]);
                        } else {
                          setSelectedProducts(
                            selectedProducts.filter((id) => id !== product.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category_id}</TableCell>
                  <TableCell>{product.brand_id}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;