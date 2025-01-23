import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect } from "react";

interface EditAttributeTypeFormValues {
  name: string;
}

const EditAttributeType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const form = useForm<EditAttributeTypeFormValues>({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchAttributeType = async () => {
      try {
        console.log("Fetching attribute type data for ID:", id);
        // TODO: Implement API call
        // Mock data for now
        const mockData = {
          name: "Material",
        };
        form.reset(mockData);
      } catch (error) {
        console.error("Error fetching attribute type:", error);
        toast.error("Failed to fetch attribute type data");
      }
    };

    if (id) {
      fetchAttributeType();
    }
  }, [id, form]);

  const onSubmit = async (data: EditAttributeTypeFormValues) => {
    try {
      console.log("Updating attribute type data:", data);
      // TODO: Implement API call
      toast.success("Attribute type updated successfully");
      navigate("/dashboard/products/attributes/types");
    } catch (error) {
      console.error("Error updating attribute type:", error);
      toast.error("Failed to update attribute type");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Attribute Type</h2>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/products/attributes/types")}
        >
          Cancel
        </Button>
      </div>

      <div className="rounded-lg border p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter type name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Type</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAttributeType;