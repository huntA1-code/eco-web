
export interface Category {
  id: string;
  name: string;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
}

export interface AttributeType {
  id: string;
  name: string;
  options: AttributeOption[];
}

export interface AttributeOption {
  id: string;
  name: string;
  attribute_type_id: string;
}

export interface SizeCategory {
  id: string;
  name: string;
  options: SizeOption[];
}

export interface SizeOption {
  id: string;
  name: string;
  category_id: string;
}

export interface Color {
  id: string;
  name: string;
  hexa: string;
}

export interface ProductVariation {
  size_id: string;
  qty_in_stock: number;
}

export interface ProductImage {
  file: File;
  description: string;
  bytes?: string;
}

export interface ProductItem {
  color_id: string;
  name_details: string;
  original_price: number;
  sale_price: number;
  variations: ProductVariation[];
  cart_image: ProductImage | null;
  images: ProductImage[];
}

export interface ProductFormData {
  category_id: string;
  brand_id: string;
  name: string;
  description: string;
  care_instructions: string;
  about: string;
  is_featured: boolean;
  discount_id?: string;
  attribute_options: string[];
  product_items: ProductItem[];
}
