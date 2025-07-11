
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CategorySelect } from "@/components/product/CategorySelect";
import { AttributeMultiSelect } from "@/components/product/AttributeMultiSelect";
import { ArrowLeft, Package, Save, Sparkles, Tag, FileText, Palette } from "lucide-react";

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

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Create a new product listing with all the details
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard/products/view")}
                  className="gap-2 hover:bg-muted/80"
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Products
                </Button>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Basic Information</CardTitle>
                      <CardDescription>
                        Enter the basic details of your product
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <CategorySelect control={form.control} name="category_id" />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Product Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter product name" 
                              {...field} 
                              className="h-11 bg-background border-border focus:border-primary transition-colors"
                            />
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
                          <FormLabel className="text-sm font-medium">Brand</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-background border-border focus:border-primary">
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
                          <FormLabel className="text-sm font-medium">Discount (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-background border-border focus:border-primary">
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
                </CardContent>
              </Card>

              {/* Product Details Section */}
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Product Details</CardTitle>
                      <CardDescription>
                        Provide detailed information about your product
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description..."
                            className="min-h-[120px] bg-background border-border focus:border-primary resize-none transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="care_instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Care Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter care instructions..."
                              className="min-h-[100px] bg-background border-border focus:border-primary resize-none transition-colors"
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
                          <FormLabel className="text-sm font-medium">About Product</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter additional information..."
                              className="min-h-[100px] bg-background border-border focus:border-primary resize-none transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Attributes Section */}
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Product Attributes</CardTitle>
                      <CardDescription>
                        Select the attributes that apply to your product
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AttributeMultiSelect
                    control={form.control}
                    name="attribute_options"
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      <span>All fields marked with * are required</span>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/dashboard/products/view")}
                        className="min-w-[120px]"
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="min-w-[120px] gap-2 bg-gradient-primary hover:opacity-90 shadow-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Creating...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Create Product
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
