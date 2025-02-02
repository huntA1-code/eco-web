import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { DiscountFormData } from "@/types/discount";

const discountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  rate: z.number().min(0).max(100, "Rate must be between 0 and 100"),
});

const AddDiscount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      name: "",
      description: "",
      rate: 0,
    },
  });

  const onSubmit = async (values: DiscountFormData) => {
    try {
      console.log("Creating discount:", values);
      toast({
        title: "Success",
        description: "Discount created successfully",
      });
      navigate("/dashboard/discounts");
    } catch (error) {
      console.error("Error creating discount:", error);
      toast({
        title: "Error",
        description: "Failed to create discount",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Add New Discount</h2>
        <p className="text-muted-foreground">Create a new discount promotion</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter discount name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter discount description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter discount rate"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Enter a percentage between 0 and 100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/discounts")}
            >
              Cancel
            </Button>
            <Button type="submit">Create Discount</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddDiscount;