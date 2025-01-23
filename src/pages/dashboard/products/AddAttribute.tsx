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
const mockAttributeTypes = [
  { id: "1", name: "Material" },
  { id: "2", name: "Style" },
];

interface AttributeOption {
  name: string;
  sort_order: number;
}

interface AddAttributeFormValues {
  attribute_type_id: string;
  attribute_options: AttributeOption[];
}

const AddAttribute = () => {
  const navigate = useNavigate();
  const form = useForm<AddAttributeFormValues>({
    defaultValues: {
      attribute_type_id: "",
      attribute_options: [{ name: "", sort_order: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attribute_options",
  });

  const onSubmit = async (data: AddAttributeFormValues) => {
    try {
      console.log("Submitting attribute data:", data);
      // TODO: Implement API call
      toast.success("Attribute created successfully");
      navigate("/dashboard/products/attributes");
    } catch (error) {
      console.error("Error creating attribute:", error);
      toast.error("Failed to create attribute");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add New Attribute</h2>
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attribute type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockAttributeTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
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
                <h3 className="text-lg font-semibold">Attribute Options</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ name: "", sort_order: 0 })}
                >
                  Add Option
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`attribute_options.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
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
                    name={`attribute_options.${index}.sort_order`}
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
                      Remove Option
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button type="submit">Create Attribute</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddAttribute;