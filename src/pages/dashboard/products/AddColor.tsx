import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  hexa: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color code"),
});

const AddColor = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hexa: "#000000",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting color data:", values);
    try {
      // TODO: Implement API call to save color
      toast.success("Color added successfully");
      navigate("/dashboard/products/colors");
    } catch (error) {
      console.error("Error adding color:", error);
      toast.error("Failed to add color");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Add New Color</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter color name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hexa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Code</FormLabel>
                <div className="flex gap-4 items-center">
                  <FormControl>
                    <Input type="color" {...field} className="w-24 h-10" />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="Enter hex color code"
                      {...field}
                      className="w-32"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit">Add Color</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/products/colors")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddColor;