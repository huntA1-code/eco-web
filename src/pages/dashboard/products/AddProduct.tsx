import { useForm, useFieldArray } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
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
import { ProductItemForm } from "@/components/product/ProductItemForm";
import { ProductFormData } from "@/types/product";

// Mock discounts data - replace with API call
const mockDiscounts = [
  { id: "1", name: "Summer Sale 20% OFF", rate: 20 },
  { id: "2", name: "Flash Sale 30% OFF", rate: 30 },
];

const productSchema = z.object({
  category_id: z.string().min(1, "Category is required"),
  brand_id: z.string().min(1, "Brand is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  care_instructions: z.string(),
  about: z.string(),
  is_featured: z.boolean().default(false),
  discount_id: z.string().optional(),
  attribute_options: z.array(z.string()),
  product_items: z.array(
    z.object({
      color_id: z.string().min(1, "Color is required"),
      name_details: z.string().min(1, "Name details are required"),
      original_price: z.number().min(0, "Price must be positive"),
      sale_price: z.number().min(0, "Price must be positive"),
      product_code: z.string().min(1, "Product code is required"),
      variations: z.array(
        z.object({
          size_id: z.string().min(1, "Size is required"),
          qty_in_stock: z.number().min(0, "Quantity must be positive"),
        })
      ),
      images: z.array(
        z.object({
          file: z.instanceof(File),
          description: z.string(),
        })
      ),
    })
  ),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      care_instructions: "",
      about: "",
      is_featured: false,
      discount_id: "",
      attribute_options: [],
      product_items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "product_items",
  });

  const onSubmit = async (values: ProductFormData) => {
    try {
      console.log("Creating product:", values);
      // Implement product creation logic here
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
    <div className="space-y-6">
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

          <FormField
            control={form.control}
            name="is_featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured Product</FormLabel>
                  <FormDescription>
                    Display this product in featured sections
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Product Variations</h3>
              <Button
                type="button"
                onClick={() =>
                  append({
                    color_id: "",
                    name_details: "",
                    original_price: 0,
                    sale_price: 0,
                    product_code: "",
                    variations: [],
                    images: [],
                  })
                }
              >
                Add Variation
              </Button>
            </div>

            {fields.map((field, index) => (
              <ProductItemForm
                key={field.id}
                control={form.control}
                index={index}
                onRemove={() => remove(index)}
              />
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/products/view")}
            >
              Cancel
            </Button>
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;