import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface AttributeOption {
  name: string;
  sort_order: number;
}

interface EditAttributeFormValues {
  attribute_type_id: string;
  options: AttributeOption[];
}

const EditAttribute = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const form = useForm<EditAttributeFormValues>({
    defaultValues: {
      attribute_type_id: "",
      options: [{ name: "", sort_order: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  useEffect(() => {
    const fetchAttribute = async () => {
      try {
        console.log("Fetching attribute data for ID:", id);
        // TODO: Implement API call
        // Mock data for now
        const mockData = {
          attribute_type_id: "1",
          options: [
            { name: "Option 1", sort_order: 1 },
            { name: "Option 2", sort_order: 2 },
          ],
        };
        form.reset(mockData);
      } catch (error) {
        console.error("Error fetching attribute:", error);
        toast.error("Failed to fetch attribute data");
      }
    };

    if (id) {
      fetchAttribute();
    }
  }, [id, form]);

  const onSubmit = async (data: EditAttributeFormValues) => {
    try {
      console.log("Updating attribute data:", data);
      // TODO: Implement API call
      toast.success("Attribute updated successfully");
      navigate("/dashboard/products/attributes");
    } catch (error) {
      console.error("Error updating attribute:", error);
      toast.error("Failed to update attribute");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Attribute</h2>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/products/attributes")}
        >
          Cancel
        </Button>
      </div>

      <div className="rounded-lg border p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="attribute_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attribute Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attribute type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Material</SelectItem>
                      <SelectItem value="2">Style</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Options</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", sort_order: 0 })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <FormField
                    control={form.control}
                    name={`options.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Option Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter option name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`options.${index}.sort_order`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
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
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button type="submit">Update Attribute</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAttribute;