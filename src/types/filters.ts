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
  brands?: string[]; // Changed from brand to brands to match the filter usage
  type?: string;
}