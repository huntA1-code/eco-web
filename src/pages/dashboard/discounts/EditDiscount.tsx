import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
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

const EditDiscount = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        // API call to fetch discount
        const mockDiscount = {
          name: "Summer Sale",
          description: "20% off on summer collection",
          rate: 20,
        };
        form.reset(mockDiscount);
      } catch (error) {
        console.error("Error fetching discount:", error);
        toast({
          title: "Error",
          description: "Failed to fetch discount details",
          variant: "destructive",
        });
      }
    };

    if (id) {
      fetchDiscount();
    }
  }, [id, form, toast]);

  const onSubmit = async (values: DiscountFormData) => {
    try {
      console.log("Updating discount:", id, values);
      toast({
        title: "Success",
        description: "Discount updated successfully",
      });
      navigate("/dashboard/discounts");
    } catch (error) {
      console.error("Error updating discount:", error);
      toast({
        title: "Error",
        description: "Failed to update discount",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Discount</h2>
        <p className="text-muted-foreground">Modify discount details</p>
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
            <Button type="submit">Update Discount</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditDiscount;