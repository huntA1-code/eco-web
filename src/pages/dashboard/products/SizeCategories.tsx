
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
import { toast } from "sonner";

// Mock data - replace with API call
const sizeCategories = [
  {
    id: 1,
    name: "Adult Sizes",
    sizesCount: 6,
  },
  {
    id: 2,
    name: "Children Sizes",
    sizesCount: 4,
  },
];

const SizeCategories = () => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      console.log("Deleting size category:", id);
      // TODO: Implement API call
      toast.success("Size category deleted successfully");
    } catch (error) {
      console.error("Error deleting size category:", error);
      toast.error("Failed to delete size category");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/products/sizes/categories/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Size Categories</h2>
        <Button onClick={() => navigate("/dashboard/products/sizes/categories/add")}>
          Add New Category
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Number of Sizes</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizeCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.sizesCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
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

export default SizeCategories;
