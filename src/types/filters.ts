
export interface CategoryNode {
  id: string;
  name: string;
  children?: CategoryNode[];
}

export interface FilterState {
  category?: string;
  colors?: string[];
  sizes?: string[];
  priceRange?: number[];
  brands?: string[];
  sleeves?: string[];
  neckline?: string[];
  height?: string[];
  types?: string[];
  styles?: string[];
  occasions?: string[];
  // Dynamic dropdown filter properties
  material?: string[];
  pattern?: string[];
  fit?: string[];
  length?: string[];
  season?: string[];
  [key: string]: any; // Allow additional dynamic properties
}
