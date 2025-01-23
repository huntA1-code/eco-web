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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock data - replace with actual data fetching
const colors = [
  {
    id: 1,
    name: "Classic Black",
    hexa: "#000000",
  },
  {
    id: 2,
    name: "Pure White",
    hexa: "#FFFFFF",
  },
];

const Colors = () => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      // TODO: Implement API call to delete color
      console.log("Deleting color:", id);
      toast.success("Color deleted successfully");
    } catch (error) {
      console.error("Error deleting color:", error);
      toast.error("Failed to delete color");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Colors</h2>
        <Button onClick={() => navigate("/dashboard/products/colors/add")}>
          Add New Color
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Hex Code</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colors.map((color) => (
              <TableRow key={color.id}>
                <TableCell>
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: color.hexa }}
                  />
                </TableCell>
                <TableCell className="font-medium">{color.name}</TableCell>
                <TableCell>{color.hexa}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/dashboard/products/colors/edit/${color.id}`)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(color.id)}
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

export default Colors;