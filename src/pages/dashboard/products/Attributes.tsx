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
const attributes = [
  {
    id: 1,
    type: "Material",
    name: "Cotton",
  },
  {
    id: 2,
    type: "Material",
    name: "Polyester",
  },
];

const Attributes = () => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      console.log("Deleting attribute:", id);
      // TODO: Implement API call
      toast.success("Attribute deleted successfully");
    } catch (error) {
      console.error("Error deleting attribute:", error);
      toast.error("Failed to delete attribute");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attributes</h2>
        <div className="space-x-4">
          <Button 
            variant="outline"
            onClick={() => navigate("/dashboard/products/attributes/types")}
          >
            Manage Types
          </Button>
          <Button
            onClick={() => navigate("/dashboard/products/attributes/add")}
          >
            Add New Attribute
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table className="data-table">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="border-r">Type</TableHead>
              <TableHead className="border-r">Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attribute) => (
              <TableRow key={attribute.id} className="border-b">
                <TableCell className="border-r">{attribute.type}</TableCell>
                <TableCell className="font-medium border-r">{attribute.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => navigate(`/dashboard/products/attributes/edit/${attribute.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(attribute.id)}
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

export default Attributes;
