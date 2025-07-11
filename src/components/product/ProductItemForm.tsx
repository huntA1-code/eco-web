
import { useState } from "react";
import { useFieldArray, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, X, Plus, Save, Edit } from "lucide-react";
import { Color, SizeCategory, SizeOption, ProductItem, ProductImage } from "@/types/product";

const mockColors: Color[] = [
  { id: "1", name: "Black", hexa: "#000000" },
  { id: "2", name: "White", hexa: "#FFFFFF" },
  { id: "3", name: "Gray", hexa: "#808080" },
];

const mockSizeCategories: SizeCategory[] = [
  {
    id: "1",
    name: "Clothing",
    options: [
      { id: "1", name: "US 7", category_id: "1" },
      { id: "2", name: "US 8", category_id: "1" },
      { id: "3", name: "US 9", category_id: "1" },
      { id: "4", name: "US 10", category_id: "1" },
    ],
  },
];

interface ProductItemFormProps {
  control: Control<any>;
  index: number;
  onRemove: () => void;
  onUpdate?: (data: any) => Promise<void>;
  onCreate?: (data: any) => Promise<void>;
  onDelete?: (itemId: string) => Promise<void>;
  isLoading?: boolean;
}

export const ProductItemForm = ({
  control,
  index,
  onRemove,
  onUpdate,
  onCreate,
  onDelete,
  isLoading = false,
}: ProductItemFormProps) => {
  const [selectedSizeCategory, setSelectedSizeCategory] = useState<string>("1");
  const [sizeOptions, setSizeOptions] = useState<SizeOption[]>(
    mockSizeCategories[0].options
  );
  const [isEditing, setIsEditing] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `product_items.${index}.variations`,
  });

  const handleCartImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const fakePath = `/uploads/${file.name}`;
      field.onChange(fakePath);
    }
  };

  const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        path: `/uploads/${file.name}`,
        description: "",
      }));
      field.onChange([...(field.value || []), ...newImages]);
    }
  };

  const handleRemoveImage = (images: ProductImage[], imgIndex: number, field: any) => {
    const newImages = [...images];
    newImages.splice(imgIndex, 1);
    field.onChange(newImages);
  };

  const handleSaveVariation = async () => {
    if (onUpdate) {
      const formData = control._getWatch(`product_items.${index}`);
      await onUpdate(formData);
    }
    setIsEditing(false);
  };

  const handleDeleteSizeVariation = async (sizeIndex: number) => {
    const variation = control._getWatch(`product_items.${index}.variations.${sizeIndex}`);
    if (variation.id && onDelete) {
      await onDelete(variation.id);
    }
    remove(sizeIndex);
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Product Variation {index + 1}
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              Configure colors, sizes, pricing, and images for this variation
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && onUpdate && (
              <Button
                type="button"
                size="sm"
                onClick={handleSaveVariation}
                className="gap-2 bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            )}
            <Button 
              type="button"
              variant="outline" 
              size="sm" 
              onClick={onRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b pb-2">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`product_items.${index}.color_id`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockColors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: color.hexa }}
                            />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`product_items.${index}.name_details`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Details</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`product_items.${index}.original_price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      disabled={!isEditing}
                      className="bg-background"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`product_items.${index}.sale_price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      disabled={!isEditing}
                      className="bg-background"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Cart Image */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b pb-2">Cart Image</h4>
          <FormField
            control={control}
            name={`product_items.${index}.cart_image`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCartImageUpload(e, field)}
                      className="cursor-pointer bg-background"
                      disabled={!isEditing}
                    />
                    {field.value && (
                      <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                        <img
                          src={field.value}
                          alt="Cart preview"
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <p className="font-medium">Cart Image</p>
                          <p className="text-sm text-muted-foreground">{field.value}</p>
                        </div>
                        {isEditing && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => field.onChange(null)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Size Variations */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="font-medium text-foreground">Size Variations</h4>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ size_id: "", qty_in_stock: 0 })}
                className="gap-2"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
                Add Size
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <FormLabel>Size Category</FormLabel>
            <Select
              value={selectedSizeCategory}
              onValueChange={(value) => {
                setSelectedSizeCategory(value);
                const category = mockSizeCategories.find((c) => c.id === value);
                setSizeOptions(category?.options || []);
              }}
              disabled={!isEditing}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select size category" />
              </SelectTrigger>
              <SelectContent>
                {mockSizeCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {fields.map((field, sizeIndex) => (
              <div key={field.id} className="relative p-4 border rounded-lg bg-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`product_items.${index}.variations.${sizeIndex}.size_id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sizeOptions.map((size) => (
                              <SelectItem key={size.id} value={size.id}>
                                {size.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`product_items.${index}.variations.${sizeIndex}.qty_in_stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity in Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            disabled={!isEditing}
                            className="bg-background"
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isEditing && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteSizeVariation(sizeIndex)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            {fields.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                <p className="text-muted-foreground">No size variations added yet</p>
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ size_id: "", qty_in_stock: 0 })}
                    className="gap-2 mt-2"
                    disabled={isLoading}
                  >
                    <Plus className="h-4 w-4" />
                    Add First Size
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b pb-2">Product Images</h4>
          <FormField
            control={control}
            name={`product_items.${index}.images`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-4">
                    {isEditing && (
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImagesUpload(e, field)}
                        className="cursor-pointer bg-background"
                      />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {field.value?.map((image: ProductImage, imageIndex: number) => (
                        <div key={imageIndex} className="p-4 border rounded-lg bg-muted/20 space-y-3">
                          <img
                            src={image.path}
                            alt={`Preview ${imageIndex + 1}`}
                            className="w-full h-40 object-cover rounded-lg border"
                          />
                          <Input
                            placeholder="Image description"
                            value={image.description}
                            disabled={!isEditing}
                            className="bg-background"
                            onChange={(e) => {
                              const newImages = [...field.value];
                              newImages[imageIndex].description = e.target.value;
                              field.onChange(newImages);
                            }}
                          />
                          {isEditing && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveImage(field.value, imageIndex, field)}
                              className="w-full gap-2"
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove Image
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {(!field.value || field.value.length === 0) && (
                      <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                        <p className="text-muted-foreground">No images added yet</p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
