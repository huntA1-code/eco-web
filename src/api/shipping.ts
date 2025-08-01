import axios from 'axios';

// Configure axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface ShippingAddress {
  id?: number;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

export interface ShippingApiResponse {
  addresses: ShippingAddress[];
  defaultAddress?: ShippingAddress;
}

// Mock data for development
const mockAddresses: ShippingAddress[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    streetAddress: '123 Main Street',
    city: 'London',
    postalCode: 'SW1A 1AA',
    country: 'United Kingdom',
    isDefault: true,
    phoneNumber: '+44 20 7946 0958'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    streetAddress: '456 Oak Avenue',
    city: 'Manchester',
    postalCode: 'M1 1AA',
    country: 'United Kingdom',
    isDefault: false,
    phoneNumber: '+44 161 496 0000'
  }
];


// Configuration
const USE_MOCK_DATA = true; // Set to false when real API is available

// API Functions
export const getShippingAddresses = async (): Promise<ShippingApiResponse> => {
  console.log('📥 INPUT - Fetching shipping addresses');
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock shipping addresses');
    const defaultAddress = mockAddresses.find(addr => addr.isDefault);
    const result = {
      addresses: mockAddresses,
      defaultAddress
    };
    console.log('📤 OUTPUT - Shipping addresses:', result);
    return result;
  }

  try {
    const response = await apiClient.get<ShippingApiResponse>('/shipping/addresses');
    console.log('📤 OUTPUT - Shipping addresses from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching shipping addresses:', error);
    // Fallback to mock data on error
    const defaultAddress = mockAddresses.find(addr => addr.isDefault);
    return {
      addresses: mockAddresses,
      defaultAddress
    };
  }
};

export const addShippingAddress = async (address: Omit<ShippingAddress, 'id' | 'isDefault'>): Promise<ShippingAddress> => {
  console.log('📥 INPUT - Adding shipping address:', address);
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock data for adding address');
    const newAddress: ShippingAddress = {
      ...address,
      id: mockAddresses.length + 1,
      isDefault: false,
      phoneNumber: address.phoneNumber || '',
    };
    mockAddresses.push(newAddress);
    console.log('📤 OUTPUT - Address added:', newAddress);
    return newAddress;
  }

  try {
    const response = await apiClient.post<ShippingAddress>('/shipping/addresses', address);
    console.log('📤 OUTPUT - Address added via API:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error adding shipping address:', error);
    throw error;
  }
};

export const setDefaultAddress = async (addressId: number): Promise<void> => {
  console.log('📥 INPUT - Setting default address:', addressId);
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock data for setting default address');
    mockAddresses.forEach(addr => {
      addr.isDefault = addr.id === addressId;
    });
    console.log('📤 OUTPUT - Default address set');
    return;
  }

  try {
    await apiClient.put(`/shipping/addresses/${addressId}/default`);
    console.log('📤 OUTPUT - Default address set via API');
  } catch (error) {
    console.error('❌ Error setting default address:', error);
    throw error;
  }
};

export const sendOrderData = async (orderData: {
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  items: any[];
  subtotal: number;
  total: number;
}): Promise<{ orderNumber: string; timestamp: string }> => {
  console.log('📥 INPUT - Sending order data:', orderData);
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock data for order submission');
    const result = {
      orderNumber: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    console.log('📤 OUTPUT - Order submitted:', result);
    return result;
  }

  try {
    const response = await apiClient.post('/orders', orderData);
    console.log('📤 OUTPUT - Order submitted via API:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error submitting order:', error);
    throw error;
  }
};