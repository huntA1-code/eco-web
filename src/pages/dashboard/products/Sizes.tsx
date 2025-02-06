import { useNavigate } from "react-router-dom";
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

// Mock data - replace with API call
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
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard/products/sizes/categories")}
          >
            Manage Categories
          </Button>
          <Button onClick={() => navigate("/dashboard/products/sizes/add")}>
            Add New Size
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table className="data-table">
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
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
