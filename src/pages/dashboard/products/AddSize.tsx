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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data - replace with API call
const mockSizeCategories = [
  { id: "1", name: "Adult Sizes" },
  { id: "2", name: "Children Sizes" },
];

interface AddSizeFormValues {
  name: string;
  size_category_id: string;
  sort_order: number;
}

const AddSize = () => {
  const navigate = useNavigate();
  const form = useForm<AddSizeFormValues>({
    defaultValues: {
      name: "",
      size_category_id: "",
      sort_order: 0,
    },
  });

  const onSubmit = async (data: AddSizeFormValues) => {
    try {
      console.log("Submitting size data:", data);
      // TODO: Implement API call to create size
      toast.success("Size created successfully");
      navigate("/dashboard/products/sizes");
    } catch (error) {
      console.error("Error creating size:", error);
      toast.error("Failed to create size");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add New Size</h2>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/products/sizes")}
        >
          Cancel
        </Button>
      </div>

      <div className="rounded-lg border p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="size_category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockSizeCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter size name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sort_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter sort order"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create Size</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddSize;