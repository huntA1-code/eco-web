import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

interface AddSizeCategoryFormValues {
  name: string;
}

const AddSizeCategory = () => {
  const navigate = useNavigate();
  const form = useForm<AddSizeCategoryFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AddSizeCategoryFormValues) => {
    try {
      console.log("Submitting size category data:", data);
      // TODO: Implement API call
      toast.success("Size category created successfully");
      navigate("/dashboard/products/sizes/categories");
    } catch (error) {
      console.error("Error creating size category:", error);
      toast.error("Failed to create size category");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add New Size Category</h2>
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

            <Button type="submit">Create Category</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddSizeCategory;