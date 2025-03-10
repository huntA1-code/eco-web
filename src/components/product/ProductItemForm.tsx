
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
import { Trash2, X } from "lucide-react";
import { Color, SizeCategory, SizeOption, ProductItem, ProductImage, ProductFormData } from "@/types/product";

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
  control: Control<ProductFormData>;
  index: number;
  onRemove: () => void;
}

export const ProductItemForm = ({
  control,
  index,
  onRemove,
}: ProductItemFormProps) => {
  const [selectedSizeCategory, setSelectedSizeCategory] = useState<string>("1");
  const [sizeOptions, setSizeOptions] = useState<SizeOption[]>(
    mockSizeCategories[0].options
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: `product_items.${index}.variations`,
  });

  const handleCartImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = event.target.files?.[0];
    if (file) {
      // Instead of handling the file directly, we'll use a path
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

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Product Variation {index + 1}</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`product_items.${index}.color_id`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockColors.map((color) => (
                    <SelectItem key={color.id} value={color.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={`product_items.${index}.cart_image`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cart Image</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCartImageUpload(e, field)}
                  className="cursor-pointer"
                />
                {field.value && (
                  <div className="flex items-center gap-2 p-2 border rounded">
                    <img
                      src={field.value}
                      alt="Cart preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="flex-1">{field.value}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => field.onChange(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div>
          <FormLabel>Size Category</FormLabel>
          <Select
            value={selectedSizeCategory}
            onValueChange={(value) => {
              setSelectedSizeCategory(value);
              const category = mockSizeCategories.find((c) => c.id === value);
              setSizeOptions(category?.options || []);
            }}
          >
            <SelectTrigger>
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
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Size Variations</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ size_id: "", qty_in_stock: 0 })
              }
            >
              Add Size
            </Button>
          </div>

          {fields.map((field, sizeIndex) => (
            <div key={field.id} className="grid grid-cols-2 gap-4 relative p-4 border rounded-lg">
              <FormField
                control={control}
                name={`product_items.${index}.variations.${sizeIndex}.size_id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => remove(sizeIndex)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      <FormField
        control={control}
        name={`product_items.${index}.images`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Images</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImagesUpload(e, field)}
                  className="cursor-pointer"
                />
                <div className="grid grid-cols-2 gap-4">
                  {field.value?.map((image: ProductImage, imageIndex: number) => (
                    <div key={imageIndex} className="p-4 border rounded flex flex-col gap-2">
                      <img
                        src={image.path}
                        alt={`Preview ${imageIndex + 1}`}
                        className="w-full h-40 object-cover rounded"
                      />
                      <Input
                        placeholder="Image description"
                        value={image.description}
                        onChange={(e) => {
                          const newImages = [...field.value];
                          newImages[imageIndex].description = e.target.value;
                          field.onChange(newImages);
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveImage(field.value, imageIndex, field)}
                        className="self-end"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
