import { useState, useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AttributeType, AttributeOption } from "@/types/product";

// Mock data - replace with API call
const mockAttributeTypes: AttributeType[] = [
  {
    id: "1",
    name: "Material",
    options: [
      { id: "1", name: "Cotton", attribute_type_id: "1" },
      { id: "2", name: "Polyester", attribute_type_id: "1" },
    ],
  },
];

interface AttributeSelectProps {
  control: any;
  name: string;
}

export const AttributeSelect = ({ control, name }: AttributeSelectProps) => {
  const [attributeTypes, setAttributeTypes] = useState<AttributeType[]>(mockAttributeTypes);
  const [selectedType, setSelectedType] = useState<string>("");
  const [options, setOptions] = useState<AttributeOption[]>([]);

  useEffect(() => {
    // Fetch attribute types from API
    console.log("Fetching attribute types...");
  }, []);

  useEffect(() => {
    if (selectedType) {
      const type = attributeTypes.find((t) => t.id === selectedType);
      setOptions(type?.options || []);
    }
  }, [selectedType, attributeTypes]);

  return (
    <div className="space-y-4">
      <Select onValueChange={setSelectedType} value={selectedType}>
        <SelectTrigger>
          <SelectValue placeholder="Select attribute type" />
        </SelectTrigger>
        <SelectContent>
          {attributeTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedType && (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Options</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-4">
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), option.id]
                            : field.value?.filter((id: string) => id !== option.id);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{option.name}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};