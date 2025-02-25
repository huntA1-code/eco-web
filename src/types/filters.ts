
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
}
