import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Color, SizeCategory, SizeOption, ProductItem } from "@/types/product";

// Mock data - replace with API calls
const mockColors: Color[] = [
  { id: "1", name: "Black", hexa: "#000000" },
  { id: "2", name: "White", hexa: "#FFFFFF" },
];

const mockSizeCategories: SizeCategory[] = [
  {
    id: "1",
    name: "Clothing",
    options: [
      { id: "1", name: "S", category_id: "1" },
      { id: "2", name: "M", category_id: "1" },
      { id: "3", name: "L", category_id: "1" },
    ],
  },
];

interface ProductItemFormProps {
  control: any;
  index: number;
  onRemove: () => void;
}

export const ProductItemForm = ({
  control,
  index,
  onRemove,
}: ProductItemFormProps) => {
  const [selectedSizeCategory, setSelectedSizeCategory] = useState<string>("");
  const [sizeOptions, setSizeOptions] = useState<SizeOption[]>([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `product_items.${index}.variations`,
  });

  const handleSizeCategoryChange = (categoryId: string) => {
    setSelectedSizeCategory(categoryId);
    const category = mockSizeCategories.find((c) => c.id === categoryId);
    setSizeOptions(category?.options || []);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        description: "",
      }));
      field.onChange(newImages);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Product Variation {index + 1}</h3>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          Remove
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

        <FormField
          control={control}
          name={`product_items.${index}.product_code`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <div>
          <FormLabel>Size Category</FormLabel>
          <Select
            onValueChange={handleSizeCategoryChange}
            value={selectedSizeCategory}
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

        {selectedSizeCategory && (
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
              <div key={field.id} className="grid grid-cols-2 gap-4">
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
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <FormLabel>Images</FormLabel>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name={`product_items.${index}.images`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, field)}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name={`product_items.${index}.images`}
          render={({ field }) => (
            <div>
              {field.value?.map((image: any, imageIndex: number) => (
                <div key={imageIndex} className="mt-2 flex items-center gap-2">
                  <span>{image.file.name}</span>
                  <Input
                    placeholder="Image description"
                    value={image.description}
                    onChange={(e) => {
                      const newImages = [...field.value];
                      newImages[imageIndex].description = e.target.value;
                      field.onChange(newImages);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};