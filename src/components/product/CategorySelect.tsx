
import { useState, useEffect } from "react";
import { CategoryTree } from "@/components/CategoryTree";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category } from "@/types/product";

// Mock data - replace with API call
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    children: [
      { id: "2", name: "Men's Clothing" },
      { id: "3", name: "Women's Clothing" },
    ],
  },
  {
    id: "4",
    name: "Accessories",
  },
];

interface CategorySelectProps {
  control: any;
  name: string;
}

export const CategorySelect = ({ control, name }: CategorySelectProps) => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  useEffect(() => {
    // Fetch categories from API
    console.log("Fetching categories...");
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <div className="border rounded-md p-4 max-h-60 overflow-y-auto bg-white shadow-sm">
              {categories.map((category) => (
                <CategoryTree
                  key={category.id}
                  node={category}
                  selectedCategory={field.value}
                  onSelect={(categoryId) => field.onChange(categoryId)}
                />
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
