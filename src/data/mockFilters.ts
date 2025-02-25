
import { NeckType, HeightType, NeckOption, HeightOption } from "@/types/product";

export const mockNeckTypes: NeckType[] = [
  {
    id: "casual-neck",
    name: "Casual Necklines",
    options: [
      { id: "crew", name: "Crew Neck", neck_type_id: "casual-neck" },
      { id: "v-neck", name: "V-Neck", neck_type_id: "casual-neck" },
      { id: "scoop", name: "Scoop Neck", neck_type_id: "casual-neck" },
      { id: "boat", name: "Boat Neck", neck_type_id: "casual-neck" },
    ]
  },
  {
    id: "formal-neck",
    name: "Formal Necklines",
    options: [
      { id: "collar", name: "Collared", neck_type_id: "formal-neck" },
      { id: "mandarin", name: "Mandarin", neck_type_id: "formal-neck" },
      { id: "turtleneck", name: "Turtleneck", neck_type_id: "formal-neck" },
    ]
  }
];

export const mockHeightTypes: HeightType[] = [
  {
    id: "petite",
    name: "Petite",
    options: [
      { id: "petite-xs", name: "Petite XS (5'0\" - 5'2\")", height_type_id: "petite" },
      { id: "petite-s", name: "Petite S (5'2\" - 5'4\")", height_type_id: "petite" },
    ]
  },
  {
    id: "regular",
    name: "Regular",
    options: [
      { id: "reg-xs", name: "Regular XS (5'4\" - 5'6\")", height_type_id: "regular" },
      { id: "reg-s", name: "Regular S (5'6\" - 5'8\")", height_type_id: "regular" },
      { id: "reg-m", name: "Regular M (5'8\" - 5'10\")", height_type_id: "regular" },
    ]
  },
  {
    id: "tall",
    name: "Tall",
    options: [
      { id: "tall-m", name: "Tall M (5'10\" - 6'0\")", height_type_id: "tall" },
      { id: "tall-l", name: "Tall L (6'0\" - 6'2\")", height_type_id: "tall" },
    ]
  }
];

// Simulated API calls
export const fetchNeckOptions = async (): Promise<NeckOption[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNeckTypes.flatMap(type => type.options);
};

export const fetchHeightOptions = async (): Promise<HeightOption[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHeightTypes.flatMap(type => type.options);
};
