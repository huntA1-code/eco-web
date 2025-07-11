
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
      id: z.string().optional(),
      color_id: z.string().min(1, "Color is required"),
      name_details: z.string().min(1, "Name details are required"),
      original_price: z.coerce.number().min(0, "Price must be positive"),
      sale_price: z.coerce.number().min(0, "Price must be positive"),
      variations: z.array(
        z.object({
          id: z.string().optional(),
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
  const [isLoading, setIsLoading] = useState(false);

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
    const loadProductData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProductName("Nike Air Max 270");
        
        form.reset({
          product_items: [
            {
              id: "item-1",
              color_id: "1",
              name_details: "Black/White-Solar Red",
              original_price: 150,
              sale_price: 129.99,
              variations: [
                { id: "var-1", size_id: "1", qty_in_stock: 15 },
                { id: "var-2", size_id: "2", qty_in_stock: 20 },
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
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProductData();
    }
  }, [id, form, toast]);

  const handleUpdateVariation = async (itemIndex: number, variationData: any) => {
    try {
      setIsLoading(true);
      console.log(`Updating variation for item ${itemIndex}:`, variationData);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Success",
        description: "Variation updated successfully",
      });
    } catch (error) {
      console.error("Error updating variation:", error);
      toast({
        title: "Error",
        description: "Failed to update variation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVariation = async (itemId: string) => {
    try {
      setIsLoading(true);
      console.log(`Deleting variation with ID: ${itemId}`);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Success",
        description: "Variation deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting variation:", error);
      toast({
        title: "Error",
        description: "Failed to delete variation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateVariation = async (variationData: any) => {
    try {
      setIsLoading(true);
      console.log("Creating new variation:", variationData);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Success",
        description: "New variation created successfully",
      });
    } catch (error) {
      console.error("Error creating variation:", error);
      toast({
        title: "Error",
        description: "Failed to create variation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: VariationsFormData) => {
    try {
      setIsLoading(true);
      console.log("Bulk update variations:", values);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "All variations updated successfully",
      });
      
      navigate("/dashboard/products/view");
    } catch (error) {
      console.error("Error updating variations:", error);
      toast({
        title: "Error",
        description: "Failed to update product variations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  if (isLoading && fields.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product variations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Product Variations</h1>
                <p className="text-muted-foreground text-lg">
                  Manage variations for: <span className="font-semibold text-foreground">{productName}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard/products/view")}
                  className="gap-2 hover:bg-muted/80"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Products
                </Button>
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  className="gap-2 bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save All Changes"}
                </Button>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Add Variation Header */}
              <div className="bg-card rounded-xl shadow-sm border p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Product Variations</h2>
                    <p className="text-muted-foreground mt-1">
                      Add different colors, sizes, and pricing options for your product
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={handleAddVariation}
                    className="gap-2 bg-gradient-primary hover:opacity-90"
                    disabled={isLoading}
                  >
                    <Plus className="h-4 w-4" />
                    Add New Variation
                  </Button>
                </div>
              </div>

              {/* Variations List */}
              {fields.length === 0 ? (
                <div className="bg-card rounded-xl shadow-sm border">
                  <div className="text-center py-16 px-6">
                    <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No variations added yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Start by adding your first product variation with different colors, sizes, and pricing
                    </p>
                    <Button 
                      onClick={handleAddVariation} 
                      className="gap-2 bg-gradient-primary hover:opacity-90"
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4" />
                      Add Your First Variation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div key={field.id} className="bg-card rounded-xl shadow-sm border overflow-hidden">
                      <ProductItemForm
                        control={form.control}
                        index={index}
                        onRemove={() => remove(index)}
                        onUpdate={(data) => handleUpdateVariation(index, data)}
                        onCreate={handleCreateVariation}
                        onDelete={(itemId) => handleDeleteVariation(itemId)}
                        isLoading={isLoading}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {fields.length > 0 && (
                <div className="bg-card rounded-xl shadow-sm border p-6">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {fields.length} variation{fields.length !== 1 ? 's' : ''} configured
                    </p>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/dashboard/products/view")}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="gap-2 bg-gradient-primary hover:opacity-90"
                        disabled={isLoading}
                      >
                        <Save className="h-4 w-4" />
                        {isLoading ? "Saving..." : "Save All Changes"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductVariations;
