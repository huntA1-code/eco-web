import React from 'react';
import { Truck, Info, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const cartItem = {
    name: "Adidas Originals",
    size: "Black / UK3.5(EUR36)",
    price: 88.00,
    quantity: 1,
    image: "/placeholder.svg"
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
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <input type="checkbox" className="mt-2" />
              <img src={cartItem.image} alt={cartItem.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-medium">{cartItem.name}</h3>
                <p className="text-sm text-neutral mt-1">{cartItem.size}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button className="px-3 py-1 hover:bg-neutral-light">-</button>
                      <span className="px-4 py-1 border-x">{cartItem.quantity}</span>
                      <button className="px-3 py-1 hover:bg-neutral-light">+</button>
                    </div>
                    <button className="text-neutral hover:text-neutral-dark">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="font-semibold">£{cartItem.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Estimated Price:</span>
                <span className="font-semibold">£88.00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <span>Reward 106 SHEIN Points</span>
                <Info className="w-4 h-4" />
              </div>
            </div>

            <Button className="w-full mb-4">
              Checkout Now (1)
            </Button>

            <div className="space-y-3">
              <p className="text-sm text-neutral">Apply a Voucher Code, SHEIN Points on the next step.</p>
              <div className="flex gap-2">
                <Input placeholder="Enter voucher code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4">We Accept:</h3>
              <div className="grid grid-cols-4 gap-4">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div key={method} className="bg-neutral-light rounded p-2 text-center text-xs">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;