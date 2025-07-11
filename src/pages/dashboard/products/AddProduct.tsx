
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CategorySelect } from "@/components/product/CategorySelect";
import { AttributeMultiSelect } from "@/components/product/AttributeMultiSelect";

const mockDiscounts = [
  { id: "1", name: "Summer Sale 20% OFF", rate: 20 },
  { id: "2", name: "Flash Sale 30% OFF", rate: 30 },
];

const mockBrands = [
  { id: "1", name: "Nike" },
  { id: "2", name: "Adidas" },
  { id: "3", name: "Puma" },
];

const productSchema = z.object({
  category_id: z.string().min(1, "Category is required"),
  brand_id: z.string().min(1, "Brand is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  care_instructions: z.string(),
  about: z.string(),
  discount_id: z.string().optional(),
  attribute_options: z.array(z.string()),
});

type BasicProductFormData = z.infer<typeof productSchema>;

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<BasicProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      care_instructions: "",
      about: "",
      discount_id: "",
      brand_id: "",
      attribute_options: [],
    },
  });

  const onSubmit = async (values: BasicProductFormData) => {
    try {
      console.log("Product data to be submitted:", values);
      
      // Mock successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Product created successfully",
      });
      
      navigate("/dashboard/products/view");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <p className="text-muted-foreground">Create a new product listing</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <CategorySelect control={form.control} name="category_id" />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockBrands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
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
                name="discount_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select discount" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockDiscounts.map((discount) => (
                          <SelectItem key={discount.id} value={discount.id}>
                            {discount.name} ({discount.rate}% OFF)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
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
              name="care_instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Care Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter care instructions"
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
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter additional information"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Attributes</h3>
                <AttributeMultiSelect
                  control={form.control}
                  name="attribute_options"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/products/view")}
              >
                Cancel
              </button>
              <button type="submit">Create Product</button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
