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
const attributeTypes = [
  {
    id: 1,
    name: "Material",
    optionsCount: 4,
  },
  {
    id: 2,
    name: "Style",
    optionsCount: 3,
  },
];

const AttributeTypes = () => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      console.log("Deleting attribute type:", id);
      // TODO: Implement API call
      toast.success("Attribute type deleted successfully");
    } catch (error) {
      console.error("Error deleting attribute type:", error);
      toast.error("Failed to delete attribute type");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attribute Types</h2>
        <Button
          onClick={() => navigate("/dashboard/products/attributes/types/add")}
        >
          Add New Type
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="border-r">Name</TableHead>
              <TableHead className="border-r">Number of Options</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributeTypes.map((type) => (
              <TableRow key={type.id} className="border-b">
                <TableCell className="font-medium border-r">{type.name}</TableCell>
                <TableCell className="border-r">{type.optionsCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/dashboard/products/attributes/types/edit/${type.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(type.id)}
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

export default AttributeTypes;