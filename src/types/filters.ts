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
  brand?: string;
  type?: string;
}