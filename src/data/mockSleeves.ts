
import { SleeveType, SleeveOption } from "@/types/product";

export const mockSleeveTypes: SleeveType[] = [
  {
    id: "casual",
    name: "Casual Sleeves",
    options: [
      { id: "short-casual", name: "Short Sleeve", sleeve_type_id: "casual" },
      { id: "long-casual", name: "Long Sleeve", sleeve_type_id: "casual" },
      { id: "sleeveless-casual", name: "Sleeveless", sleeve_type_id: "casual" },
      { id: "cap-casual", name: "Cap Sleeve", sleeve_type_id: "casual" },
    ]
  },
  {
    id: "formal",
    name: "Formal Sleeves",
    options: [
      { id: "french-cuff", name: "French Cuff", sleeve_type_id: "formal" },
      { id: "barrel-cuff", name: "Barrel Cuff", sleeve_type_id: "formal" },
      { id: "convertible-cuff", name: "Convertible Cuff", sleeve_type_id: "formal" },
    ]
  },
  {
    id: "special",
    name: "Special Sleeves",
    options: [
      { id: "bell", name: "Bell Sleeve", sleeve_type_id: "special" },
      { id: "bishop", name: "Bishop Sleeve", sleeve_type_id: "special" },
      { id: "butterfly", name: "Butterfly Sleeve", sleeve_type_id: "special" },
      { id: "dolman", name: "Dolman Sleeve", sleeve_type_id: "special" },
      { id: "kimono", name: "Kimono Sleeve", sleeve_type_id: "special" },
      { id: "raglan", name: "Raglan Sleeve", sleeve_type_id: "special" },
    ]
  }
];

// Simulated API call
export const fetchSleeveTypes = async (): Promise<SleeveType[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSleeveTypes;
};

export const fetchSleeveOptions = async (): Promise<SleeveOption[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSleeveTypes.flatMap(type => type.options);
};
