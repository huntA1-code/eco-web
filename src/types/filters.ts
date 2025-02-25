
export interface CategoryNode {
  id: string;
  name: string;
  children?: CategoryNode[];
}

export interface FilterState {
  category?: string;
  color?: string;
  size?: string;
  priceRange?: number[];
  brands?: string[];
  sleeve?: string; // Added this line to support sleeve filtering
}
