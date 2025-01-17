import React, { useState } from 'react';
import { Truck, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Adidas Originals",
      size: "Black / UK3.5(EUR36)",
      price: 88.00,
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Nike Air Max",
      size: "White / UK4(EUR37)",
      price: 120.00,
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Puma RS-X",
      size: "Gray / UK5(EUR38)",
      price: 95.00,
      quantity: 1,
      image: "/placeholder.svg"
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Shipping Information */}
      <div className="bg-neutral-light p-4 rounded-lg shadow-sm mb-8 flex items-center gap-3">
        <Truck className="w-6 h-6 text-primary" />
        <div>
          <span className="font-semibold">Shipping fee - </span>
          <span className="text-primary">Enjoy FREE shipping! Checkout Now!</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-4">
          {/* All Items Checkbox */}
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
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
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
                    <span className="font-semibold">£{item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Estimated Price:</span>
                <span className="font-semibold">£{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full mb-4">
              Checkout Now ({selectedItems.length})
            </Button>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Enter voucher code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4">We Accept:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <img src="/visa.svg" alt="Visa" className="h-6" />
                </div>
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                </div>
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <img src="/paypal.svg" alt="PayPal" className="h-6" />
                </div>
                <div className="bg-neutral-light rounded p-3 flex items-center justify-center">
                  <img src="/apple-pay.svg" alt="Apple Pay" className="h-6" />
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