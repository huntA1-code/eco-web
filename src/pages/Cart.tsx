
import React, { useState } from 'react';
import { Truck, Trash2, ShoppingCart, Package, CreditCard, CheckCircle, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// API interface placeholders (for future integration)
interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartApiResponse {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

const Cart = () => {
  const navigate = useNavigate();
  
  // State for cart items (prepared for API integration)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Adidas Originals",
      size: "Black / UK3.5(EUR36)",
      price: 88.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    },
    {
      id: 2,
      name: "Nike Air Max",
      size: "White / UK4(EUR37)",
      price: 120.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
    },
    {
      id: 3,
      name: "Puma RS-X",
      size: "Gray / UK5(EUR38)",
      price: 95.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Handlers for cart operations (prepared for API integration)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (itemId: number) => {
    // In a real implementation, this would call an API
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      return;
    }
    // This would normally save cart state to an API before navigation
    navigate('/place-order');
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Order Progress with icons */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white p-2 rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1 font-semibold">Cart</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-2 rounded-full">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1 text-muted-foreground">Place Order</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-2 rounded-full">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1 text-muted-foreground">Pay</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1 text-muted-foreground">Complete</span>
          </div>
        </div>
        <Progress value={25} className="h-2" />
      </div>
      
      <div className="bg-neutral-light p-4 rounded-lg shadow-sm mb-8 flex items-center gap-3">
        <Truck className="w-6 h-6 text-primary" />
        <div>
          <span className="font-semibold">Shipping fee - </span>
          <span className="text-primary">Enjoy FREE shipping! Checkout Now!</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={selectedItems.length === cartItems.length}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                className="w-5 h-5"
              />
              <span className="font-bold text-lg">ALL ITEMS</span>
            </div>
          </div>

          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Checkbox 
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                  className="w-5 h-5 mt-2"
                />
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-neutral mt-1">{item.size}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button 
                          className="px-3 py-1 hover:bg-neutral-light"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 hover:bg-neutral-light"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="text-neutral hover:text-neutral-dark"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Estimated Price:</span>
                <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full mb-4"
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              Checkout Now ({selectedItems.length})
            </Button>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Enter voucher code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4">We Accept:</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
