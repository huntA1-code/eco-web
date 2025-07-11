
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ProductItemForm } from "@/components/product/ProductItemForm";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { ProductItem } from "@/types/product";

const variationsSchema = z.object({
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
      cart_image: z.string().nullable(),
      images: z.array(
        z.object({
          path: z.string(),
          description: z.string(),
        })
      ),
    })
  ),
});

type VariationsFormData = z.infer<typeof variationsSchema>;

const ProductVariations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [productName, setProductName] = useState("");

  const form = useForm<VariationsFormData>({
    resolver: zodResolver(variationsSchema),
    defaultValues: {
      product_items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "product_items",
  });

  useEffect(() => {
    // Mock loading product data - replace with actual API call
    const loadProductData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProductName("Nike Air Max 270");
        
        // Load existing variations if any
        form.reset({
          product_items: [
            {
              color_id: "1",
              name_details: "Black/White-Solar Red",
              original_price: 150,
              sale_price: 129.99,
              variations: [
                { size_id: "1", qty_in_stock: 15 },
                { size_id: "2", qty_in_stock: 20 },
              ],
              cart_image: "/uploads/cart-image-black.jpg",
              images: [
                { path: "/uploads/black-1.jpg", description: "Front view" },
                { path: "/uploads/black-2.jpg", description: "Side view" },
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error loading product data:", error);
        toast({
          title: "Error",
          description: "Failed to load product data",
          variant: "destructive",
        });
      }
    };

    if (id) {
      loadProductData();
    }
  }, [id, form, toast]);

  const onSubmit = async (values: VariationsFormData) => {
    try {
      console.log("Variations data to be saved:", values);
      
      // Mock API call - replace with actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Product variations updated successfully",
      });
      
      navigate("/dashboard/products/view");
    } catch (error) {
      console.error("Error updating variations:", error);
      toast({
        title: "Error",
        description: "Failed to update product variations",
        variant: "destructive",
      });
    }
  };

  const handleAddVariation = () => {
    append({
      color_id: "",
      name_details: "",
      original_price: 0,
      sale_price: 0,
      variations: [],
      cart_image: null,
      images: [],
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Product Variations</h2>
              <p className="text-muted-foreground">
                Manage variations for: <span className="font-medium">{productName}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard/products/view")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Products
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="gap-2"
                disabled={form.formState.isSubmitting}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Product Variations</h3>
                  <Button
                    type="button"
                    onClick={handleAddVariation}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Variation
                  </Button>
                </div>

                {fields.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg border-dashed">
                    <p className="text-muted-foreground mb-4">No variations added yet</p>
                    <Button onClick={handleAddVariation} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Your First Variation
                    </Button>
                  </div>
                ) : (
                  fields.map((field, index) => (
                    <ProductItemForm
                      key={field.id}
                      control={form.control}
                      index={index}
                      onRemove={() => remove(index)}
                    />
                  ))
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductVariations;
