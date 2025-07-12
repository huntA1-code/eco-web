
export interface DropdownFilterData {
  id: string;
  title: string;
  options: Array<{
    id: string;
    name: string;
    count?: number;
  }>;
}

export const mockDropdownFilters: DropdownFilterData[] = [
  {
    id: "material",
    title: "Material",
    options: [
      { id: "cotton", name: "Cotton", count: 156 },
      { id: "polyester", name: "Polyester", count: 89 },
      { id: "wool", name: "Wool", count: 34 },
      { id: "silk", name: "Silk", count: 22 },
      { id: "linen", name: "Linen", count: 45 },
      { id: "denim", name: "Denim", count: 67 },
      { id: "leather", name: "Leather", count: 28 },
    ]
  },
  {
    id: "pattern",
    title: "Pattern",
    options: [
      { id: "solid", name: "Solid", count: 234 },
      { id: "striped", name: "Striped", count: 78 },
      { id: "checked", name: "Checked", count: 45 },
      { id: "floral", name: "Floral", count: 32 },
      { id: "geometric", name: "Geometric", count: 23 },
      { id: "polka-dot", name: "Polka Dot", count: 18 },
    ]
  },
  {
    id: "fit",
    title: "Fit",
    options: [
      { id: "slim", name: "Slim Fit", count: 145 },
      { id: "regular", name: "Regular Fit", count: 167 },
      { id: "loose", name: "Loose Fit", count: 89 },
      { id: "tailored", name: "Tailored", count: 56 },
      { id: "oversized", name: "Oversized", count: 34 },
    ]
  },
  {
    id: "length",
    title: "Length",
    options: [
      { id: "short", name: "Short", count: 78 },
      { id: "regular", name: "Regular", count: 156 },
      { id: "long", name: "Long", count: 89 },
      { id: "extra-long", name: "Extra Long", count: 23 },
    ]
  },
  {
    id: "season",
    title: "Season",
    options: [
      { id: "spring", name: "Spring", count: 98 },
      { id: "summer", name: "Summer", count: 134 },
      { id: "fall", name: "Fall", count: 112 },
      { id: "winter", name: "Winter", count: 87 },
      { id: "all-season", name: "All Season", count: 145 },
    ]
  }
];

// Simulate API call
export const fetchDropdownFilterData = async (filterId: string): Promise<DropdownFilterData | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockDropdownFilters.find(filter => filter.id === filterId) || null;
};

// Simulate fetching all filters
export const fetchAllDropdownFilters = async (): Promise<DropdownFilterData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockDropdownFilters;
};
