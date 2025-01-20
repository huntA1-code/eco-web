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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
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

interface AttributeMultiSelectProps {
  control: any;
  name: string;
}

export const AttributeMultiSelect = ({ control, name }: AttributeMultiSelectProps) => {
  const [attributeTypes, setAttributeTypes] = useState<AttributeType[]>(mockAttributeTypes);
  const [selectedType, setSelectedType] = useState<string>("");
  const [options, setOptions] = useState<AttributeOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<AttributeOption[]>([]);

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

  const handleOptionSelect = (optionId: string) => {
    const option = options.find((o) => o.id === optionId);
    if (option && !selectedOptions.some((so) => so.id === option.id)) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      const optionIds = newSelectedOptions.map((o) => o.id);
      control.setValue(name, optionIds);
    }
  };

  const handleRemoveOption = (optionId: string) => {
    const newSelectedOptions = selectedOptions.filter((o) => o.id !== optionId);
    setSelectedOptions(newSelectedOptions);
    const optionIds = newSelectedOptions.map((o) => o.id);
    control.setValue(name, optionIds);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem>
            <FormLabel>Select Attributes</FormLabel>
            <FormControl>
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
                  <Select onValueChange={handleOptionSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select options" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <div className="flex flex-wrap gap-2">
                  {selectedOptions.map((option) => (
                    <Badge key={option.id} variant="secondary" className="flex items-center gap-1">
                      {option.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveOption(option.id)}
                      />
                    </Badge>
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