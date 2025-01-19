import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

// Mock data - replace with actual data fetching
const sizes = [
  {
    id: 1,
    category: "Clothing",
    name: "Small",
    sortOrder: 1,
  },
  {
    id: 2,
    category: "Clothing",
    name: "Medium",
    sortOrder: 2,
  },
];

const Sizes = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="space-x-4">
          <Button variant="outline">Manage Categories</Button>
          <Button>Add New Size</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((size) => (
              <TableRow key={size.id}>
                <TableCell>{size.category}</TableCell>
                <TableCell className="font-medium">{size.name}</TableCell>
                <TableCell>{size.sortOrder}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
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

export default Sizes;