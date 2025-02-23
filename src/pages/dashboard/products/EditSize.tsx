
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { AxiosError } from "axios";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

// Mock data - replace with API call
const mockSizeCategories = [
  { id: "1", name: "Adult Sizes" },
  { id: "2", name: "Children Sizes" },
];

interface SizeOption {
  name: string;
  sort_order: number;
}

interface EditSizeFormValues {
  size_category_id: string;
  size_options: SizeOption[];
}

const EditSize = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const form = useForm<EditSizeFormValues>({
    defaultValues: {
      size_category_id: "",
      size_options: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "size_options",
  });

  useEffect(() => {
    const fetchSizeData = async () => {
      try {
        // In a real application, this would be an API call
        // For now, we'll use mock data
        const mockData = {
          size_category_id: "1",
          size_options: [
            { name: "Small", sort_order: 1 },
            { name: "Medium", sort_order: 2 },
            { name: "Large", sort_order: 3 },
          ],
        };

        form.reset(mockData);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching size data:", axiosError);
        toast.error("Failed to fetch size data");
      }
    };

    fetchSizeData();
  }, [id, form]);

  const onSubmit = async (data: EditSizeFormValues) => {
    try {
      console.log("Updating size data:", data);
      await axios.put(`/api/sizes/${id}`, data);
      
      toast.success("Sizes updated successfully");
      navigate("/dashboard/products/sizes");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error updating sizes:", axiosError);
      toast.error("Failed to update sizes");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Sizes</h2>
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

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="col-span-2"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Size Option
                  </Button>
                </div>
              ))}
            </div>

            <Button type="submit">Update Sizes</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditSize;
