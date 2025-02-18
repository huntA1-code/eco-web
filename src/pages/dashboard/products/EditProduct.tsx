import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
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
import { ArrowLeft, Loader2, Save } from "lucide-react";

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
  is_featured: z.boolean().default(false),
  discount_id: z.string().optional(),
  attribute_options: z.array(z.string()),
  product_items: z.array(
    z.object({
      color_id: z.string().min(1, "Color is required"),
      name_details: z.string().min(1, "Name details are required"),
      original_price: z.coerce.number().min(0, "Price must be positive"),
      sale_price: z.coerce.number().min(0, "Price must be positive"),
      variations: z.array(
        z.object({
          size_id: z.string().min(1, "Size is required"),
          qty_in_stock: z.coerce.number().min(0, "Quantity must be positive"),
        })
      ),
      cart_image: z.object({
        file: z.instanceof(File),
        description: z.string(),
        bytes: z.string().optional(),
      }).nullable(),
      images: z.array(
        z.object({
          file: z.instanceof(File),
          description: z.string(),
          bytes: z.string().optional(),
        })
      ),
    })
  ),
});

const EditProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: "",
      brand_id: "",
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await new Promise<ProductFormData>((resolve) => {
          setTimeout(() => {
            resolve({
              category_id: "1", // Men's Shoes
              brand_id: "1", // Nike
              name: "Nike Air Max 270",
              description: "The Nike Air Max 270 delivers modern comfort with a design inspired by Air Max icons. The shoe features Nike's biggest heel Air unit yet, providing all-day comfort while giving you an elevated look.",
              care_instructions: "- Clean with a soft, dry cloth\n- Avoid direct sunlight and heat\n- Store in a cool, dry place\n- Use shoe trees to maintain shape",
              about: "The Nike Air Max 270 men's shoe is inspired by two icons of Air: the Air Max 180 and Air Max 93. It features Nike's biggest heel Air unit yet, offering a super-soft ride that feels as impossible as it looks.",
              is_featured: true,
              discount_id: "1", // Summer Sale
              attribute_options: ["1", "2"], // Cotton, Mesh
              product_items: [
                {
                  color_id: "1", // Black
                  name_details: "Black/White-Solar Red",
                  original_price: 150,
                  sale_price: 129.99,
                  variations: [
                    { size_id: "1", qty_in_stock: 15 }, // US 7
                    { size_id: "2", qty_in_stock: 20 }, // US 8
                    { size_id: "3", qty_in_stock: 18 }, // US 9
                    { size_id: "4", qty_in_stock: 12 }, // US 10
                  ],
                  cart_image: null,
                  images: [],
                },
                {
                  color_id: "2", // White
                  name_details: "White/University Blue-Pure Platinum",
                  original_price: 150,
                  sale_price: 129.99,
                  variations: [
                    { size_id: "1", qty_in_stock: 10 }, // US 7
                    { size_id: "2", qty_in_stock: 25 }, // US 8
                    { size_id: "3", qty_in_stock: 22 }, // US 9
                    { size_id: "4", qty_in_stock: 15 }, // US 10
                  ],
                  cart_image: null,
                  images: [],
                },
                {
                  color_id: "3", // Gray
                  name_details: "Wolf Grey/Cool Grey-Pure Platinum",
                  original_price: 150,
                  sale_price: 129.99,
                  variations: [
                    { size_id: "1", qty_in_stock: 8 }, // US 7
                    { size_id: "2", qty_in_stock: 16 }, // US 8
                    { size_id: "3", qty_in_stock: 20 }, // US 9
                    { size_id: "4", qty_in_stock: 14 }, // US 10
                  ],
                  cart_image: null,
                  images: [],
                },
              ],
            });
          }, 1000);
        });

        form.reset(response);
        
        console.log("Form data after reset:", form.getValues());
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to fetch product data",
          variant: "destructive",
        });
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, form, toast]);

  const onSubmit = async (values: ProductFormData) => {
    try {
      console.log("Product data to be updated:", values);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      
      navigate("/dashboard/products/view");
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Edit Product</h2>
            <p className="text-muted-foreground">Update your product details</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/products/view")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="gap-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>
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
                      variations: [],
                      cart_image: null,
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
