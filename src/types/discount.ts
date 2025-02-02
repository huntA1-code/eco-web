export interface Discount {
  id: string;
  name: string;
  description: string | null;
  rate: number;
  created_at: string;
  products: Product[];
}

export interface DiscountFormData {
  name: string;
  description: string;
  rate: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category_id: string | null;
  brand_id: string | null;
  is_featured: boolean;
}