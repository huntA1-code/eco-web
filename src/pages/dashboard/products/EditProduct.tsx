import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ProductFormData } from "@/types/product";
import { ArrowLeft, Loader2, Save, Plus, Trash2 } from "lucide-react";
import { getMockProduct } from "@/data/mockProducts";

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
  product_items: z.array(
    z.object({
      color_id: z.string().min(1, "Color is required"),
      name_details: z.string().min(1, "Name details are required"),
      original_price: z.number().min(0, "Price must be positive"),
      sale_price: z.number().min(0, "Price must be positive"),
      variations: z.array(
        z.object({
          size_id: z.string().min(1, "Size is required"),
          qty_in_stock: z.number().min(0, "Quantity must be positive"),
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

const EditProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: "",
      brand_id: "",
      name: "",
      description: "",
      care_instructions: "",
      about: "",
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
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = getMockProduct(id || "1");
        form.reset(response);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to fetch product data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
          <p className="text-lg font-medium text-gray-700">Loading product data...</p>
        </div>
      </div>
    );
  }

  const handleFileUpload = (file: File): string => {
    return `/uploads/${file.name}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
              <p className="mt-1 text-sm text-gray-500">Update your product details</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/products/view")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </button>
              <button
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </button>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    {...form.register("name")}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter product name"
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    {...form.register("brand_id")}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="">Select brand</option>
                    {mockBrands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.brand_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.brand_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    {...form.register("category_id")}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="">Select category</option>
                    <option value="1">Men's Shoes</option>
                    <option value="2">Women's Shoes</option>
                  </select>
                  {form.formState.errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.category_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount
                  </label>
                  <select
                    {...form.register("discount_id")}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="">Select discount</option>
                    {mockDiscounts.map((discount) => (
                      <option key={discount.id} value={discount.id}>
                        {discount.name} ({discount.rate}% OFF)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...form.register("description")}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter product description"
                  />
                  {form.formState.errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Care Instructions
                  </label>
                  <textarea
                    {...form.register("care_instructions")}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter care instructions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <textarea
                    {...form.register("about")}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter additional information"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Attributes</h3>
              <select
                multiple
                {...form.register("attribute_options")}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="1">Cotton</option>
                <option value="2">Mesh</option>
                <option value="3">Leather</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Product Variations</h3>
                <button
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
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Variation
                </button>
              </div>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border border-gray-200 rounded-lg p-6 bg-white relative"
                  >
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <select
                          {...form.register(`product_items.${index}.color_id`)}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                          <option value="">Select color</option>
                          <option value="1">Black</option>
                          <option value="2">White</option>
                          <option value="3">Gray</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name Details
                        </label>
                        <input
                          {...form.register(`product_items.${index}.name_details`)}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Enter name details"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Original Price
                        </label>
                        <input
                          type="number"
                          {...form.register(`product_items.${index}.original_price`)}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sale Price
                        </label>
                        <input
                          type="number"
                          {...form.register(`product_items.${index}.sale_price`)}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Size Variations</h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Size
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {field.variations.map((variation, vIndex) => (
                            <tr key={vIndex}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  {...form.register(
                                    `product_items.${index}.variations.${vIndex}.size_id`
                                  )}
                                  className="rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                >
                                  <option value="">Select size</option>
                                  <option value="1">US 7</option>
                                  <option value="2">US 8</option>
                                  <option value="3">US 9</option>
                                  <option value="4">US 10</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  {...form.register(
                                    `product_items.${index}.variations.${vIndex}.qty_in_stock`
                                  )}
                                  className="w-24 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const variations = [...field.variations];
                                    variations.splice(vIndex, 1);
                                    form.setValue(
                                      `product_items.${index}.variations`,
                                      variations
                                    );
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        type="button"
                        onClick={() => {
                          const variations = [...field.variations];
                          variations.push({ size_id: "", qty_in_stock: 0 });
                          form.setValue(`product_items.${index}.variations`, variations);
                        }}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Size
                      </button>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Images</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cart Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const path = handleFileUpload(file);
                                form.setValue(`product_items.${index}.cart_image`, path);
                              }
                            }}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Images
                          </label>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              const newImages = files.map((file) => ({
                                path: handleFileUpload(file),
                                description: "",
                              }));
                              const currentImages = form.getValues(`product_items.${index}.images`) || [];
                              form.setValue(`product_items.${index}.images`, [
                                ...currentImages,
                                ...newImages,
                              ]);
                            }}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                        </div>

                        {field.images && field.images.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                            {field.images.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="relative rounded-lg overflow-hidden group"
                              >
                                <img
                                  src={image.path}
                                  alt={image.description}
                                  className="w-full h-32 object-cover"
                                />
                                <input
                                  type="text"
                                  value={image.description}
                                  onChange={(e) => {
                                    const newImages = [...field.images];
                                    newImages[imgIndex].description = e.target.value;
                                    form.setValue(
                                      `product_items.${index}.images`,
                                      newImages
                                    );
                                  }}
                                  placeholder="Image description"
                                  className="w-full mt-2 text-sm rounded-md border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newImages = [...field.images];
                                    newImages.splice(imgIndex, 1);
                                    form.setValue(
                                      `product_items.${index}.images`,
                                      newImages
                                    );
                                  }}
                                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
