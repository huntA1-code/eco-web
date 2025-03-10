import { useForm, useFieldArray } from "react-hook-form";
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

interface SizeOption {
  name: string;
  sort_order: number;
}

interface AddSizeFormValues {
  size_category_id: string;
  size_options: SizeOption[];
}

const AddSize = () => {
  const navigate = useNavigate();
  const form = useForm<AddSizeFormValues>({
    defaultValues: {
      size_category_id: "",
      size_options: [{ name: "", sort_order: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "size_options",
  });

  const onSubmit = async (data: AddSizeFormValues) => {
    try {
      console.log("Submitting size data:", data);
      // Example of the API request body structure:
      // {
      //   size_category_id: "1",
      //   size_options: [
      //     { name: "S", sort_order: 1 },
      //     { name: "M", sort_order: 2 },
      //     { name: "L", sort_order: 3 }
      //   ]
      // }
      
      // TODO: Implement API call to create sizes
      toast.success("Sizes created successfully");
      navigate("/dashboard/products/sizes");
    } catch (error) {
      console.error("Error creating sizes:", error);
      toast.error("Failed to create sizes");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add New Sizes</h2>
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

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Size Options</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ name: "", sort_order: 0 })}
                >
                  Add Size Option
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`size_options.${index}.name`}
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
                    name={`size_options.${index}.sort_order`}
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

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="col-span-2"
                    >
                      Remove Size Option
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button type="submit">Create Sizes</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddSize;