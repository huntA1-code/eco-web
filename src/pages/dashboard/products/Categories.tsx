import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with API call
const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    level: 1,
    path: "/electronics",
    parent: null,
  },
];

const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    console.log("Deleting category:", id);
    // Implement delete functionality here
    toast({
      title: "Category deleted",
      description: "The category has been successfully deleted.",
    });
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/products/categories/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product categories here.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/products/categories/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>

      <div className="table-container">
        <Table className="data-table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.level}</TableCell>
                <TableCell>{category.path}</TableCell>
                <TableCell>{category.parent || "Root"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
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

export default Categories;
