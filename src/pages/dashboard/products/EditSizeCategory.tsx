
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

interface EditSizeCategoryFormValues {
  name: string;
}

const EditSizeCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const form = useForm<EditSizeCategoryFormValues>({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchSizeCategory = async () => {
      try {
        // In a real application, this would be an API call
        // For now, we'll use mock data
        const mockData = {
          id: id,
          name: "Adult Sizes",
        };

        form.reset(mockData);
      } catch (error) {
        console.error("Error fetching size category:", error);
        toast.error("Failed to fetch size category");
      }
    };

    fetchSizeCategory();
  }, [id, form]);

  const onSubmit = async (data: EditSizeCategoryFormValues) => {
    try {
      // In a real application, this would be an API call
      console.log("Updating size category:", { id, ...data });
      await axios.put(`/api/size-categories/${id}`, data);
      
      toast.success("Size category updated successfully");
      navigate("/dashboard/products/sizes/categories");
    } catch (error) {
      console.error("Error updating size category:", error);
      toast.error("Failed to update size category");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Size Category</h2>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/products/sizes/categories")}
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Category</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditSizeCategory;
