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

interface AddAttributeTypeFormValues {
  name: string;
}

const AddAttributeType = () => {
  const navigate = useNavigate();
  const form = useForm<AddAttributeTypeFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AddAttributeTypeFormValues) => {
    try {
      console.log("Submitting attribute type data:", data);
      // TODO: Implement API call
      toast.success("Attribute type created successfully");
      navigate("/dashboard/products/attributes/types");
    } catch (error) {
      console.error("Error creating attribute type:", error);
      toast.error("Failed to create attribute type");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add New Attribute Type</h2>
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

            <Button type="submit">Create Type</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddAttributeType;