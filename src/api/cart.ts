import axios, { AxiosError } from 'axios';

const API_URL = "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 10000;
const USE_MOCK_DATA = true; // Switch to false when real API is ready

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Adidas Originals",
    size: "Black / UK3.5(EUR36)",
    price: 88.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    color: "Black",
    brand: "Adidas"
  },
  {
    id: 2,
    name: "Nike Air Max",
    size: "White / UK4(EUR37)",
    price: 120.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    color: "White",
    brand: "Nike"
  },
  {
    id: 3,
    name: "Puma RS-X",
    size: "Gray / UK5(EUR38)",
    price: 95.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
    color: "Gray",
    brand: "Puma"
  }
];

export interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  brand?: string;
}

export interface CartApiResponse {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  itemCount: number;
}

export interface UpdateQuantityRequest {
  itemId: number;
  quantity: number;
}

// Get cart items
export const getCartItems = async (): Promise<CartApiResponse> => {
  console.log('📥 INPUT - Fetching cart items');
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock cart data');
    const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal > 100 ? 0 : 10;
    const total = subtotal + shippingFee;
    const itemCount = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    const response = {
      items: mockCartItems,
      subtotal,
      shippingFee,
      total,
      itemCount
    };
    
    console.log('📤 OUTPUT - Cart data:', response);
    return response;
  }
  
  try {
    const response = await apiClient.get('/cart');
    console.log('📤 OUTPUT - Cart items fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - Failed to fetch cart items, using mock data:', error);
    const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal > 100 ? 0 : 10;
    const total = subtotal + shippingFee;
    const itemCount = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      items: mockCartItems,
      subtotal,
      shippingFee,
      total,
      itemCount
    };
  }
};

// Update item quantity
export const updateItemQuantity = async (request: UpdateQuantityRequest): Promise<CartItem> => {
  console.log('📥 INPUT - Updating item quantity:', request);
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock data for quantity update');
    const item = mockCartItems.find(item => item.id === request.itemId);
    if (item) {
      item.quantity = request.quantity;
      console.log('📤 OUTPUT - Updated item:', item);
      return item;
    }
    throw new Error('Item not found');
  }
  
  try {
    const response = await apiClient.put(`/cart/items/${request.itemId}`, {
      quantity: request.quantity
    });
    console.log('📤 OUTPUT - Item quantity updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - Failed to update quantity:', error);
    throw error;
  }
};

// Remove item from cart
export const removeCartItem = async (itemId: number): Promise<void> => {
  console.log('📥 INPUT - Removing cart item:', itemId);
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock data for item removal');
    const index = mockCartItems.findIndex(item => item.id === itemId);
    if (index > -1) {
      mockCartItems.splice(index, 1);
      console.log('📤 OUTPUT - Item removed from mock data');
      return;
    }
    throw new Error('Item not found');
  }
  
  try {
    await apiClient.delete(`/cart/items/${itemId}`);
    console.log('📤 OUTPUT - Item removed successfully');
  } catch (error) {
    console.error('❌ ERROR - Failed to remove item:', error);
    throw error;
  }
};

// Send cart to place order
export const sendCartToPlaceOrder = async (selectedItemIds: number[]): Promise<any> => {
  console.log('📥 INPUT - Sending cart to place order:', selectedItemIds);
  
  const cartData = await getCartItems();
  const selectedItems = cartData.items.filter(item => selectedItemIds.includes(item.id));
  const orderData = {
    items: selectedItems,
    subtotal: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    timestamp: new Date().toISOString(),
    orderNumber: `ORD-${Date.now()}`
  };
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock data for place order');
    console.log('📤 OUTPUT - Order data prepared:', orderData);
    return orderData;
  }
  
  try {
    const response = await apiClient.post('/orders/prepare', orderData);
    console.log('📤 OUTPUT - Order prepared:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - Failed to prepare order, using mock data:', error);
    return orderData;
  }
};