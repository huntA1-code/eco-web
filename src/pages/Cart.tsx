
import React, { useState, useEffect } from 'react';
import { Truck, Trash2, ShoppingCart, Package, CreditCard, CheckCircle, Circle, Minus, Plus, Heart, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getCartItems, updateItemQuantity, removeCartItem, sendCartToPlaceOrder, CartItem, CartApiResponse } from '@/api/cart';

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for cart data
  const [cartData, setCartData] = useState<CartApiResponse | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  // Load cart data on component mount
  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      setLoading(true);
      const data = await getCartItems();
      setCartData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handlers for cart operations
  const handleSelectAll = (checked: boolean) => {
    if (checked && cartData) {
      setSelectedItems(cartData.items.map(item => item.id));
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

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    
    try {
      setUpdating(itemId);
      await updateItemQuantity({ itemId, quantity: newQuantity });
      await loadCartData(); // Refresh cart data
      toast({
        title: "Success",
        description: "Quantity updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeCartItem(itemId);
      await loadCartData(); // Refresh cart data
      setSelectedItems(prev => prev.filter(id => id !== itemId));
      toast({
        title: "Success",
        description: "Item removed from cart"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    }
  };

  const calculateSelectedTotal = () => {
    if (!cartData) return 0;
    return cartData.items
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select items to checkout"
      });
      return;
    }
    
    try {
      const orderData = await sendCartToPlaceOrder(selectedItems);
      // Store order data in sessionStorage for PlaceOrder page
      sessionStorage.setItem('orderData', JSON.stringify(orderData));
      navigate('/place-order');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to proceed to checkout",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-6 bg-muted rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-6 bg-muted rounded w-1/2 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some items to get started!</p>
          <Button onClick={() => navigate('/products')} className="hover-scale">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20 animate-fade-in">
      {/* Enhanced Order Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="bg-gradient-primary text-white p-3 rounded-full shadow-lg">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div className="absolute -top-1 -right-1 bg-accent-new text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartData?.itemCount || 0}
              </div>
            </div>
            <span className="text-sm mt-2 font-semibold text-primary">Cart</span>
          </div>
          <div className="flex-1 h-0.5 bg-muted mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-3 rounded-full">
              <Package className="h-6 w-6" />
            </div>
            <span className="text-sm mt-2 text-muted-foreground">Place Order</span>
          </div>
          <div className="flex-1 h-0.5 bg-muted mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-3 rounded-full">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="text-sm mt-2 text-muted-foreground">Payment</span>
          </div>
          <div className="flex-1 h-0.5 bg-muted mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="bg-muted text-muted-foreground p-3 rounded-full">
              <CheckCircle className="h-6 w-6" />
            </div>
            <span className="text-sm mt-2 text-muted-foreground">Complete</span>
          </div>
        </div>
        <Progress value={25} className="h-2" />
      </div>
      
      {/* Enhanced Shipping Banner */}
      <div className="bg-gradient-primary p-6 rounded-xl shadow-sm mb-8 flex items-center gap-4 text-white">
        <div className="bg-white/20 p-3 rounded-lg">
          <Truck className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Free Shipping Available!</h3>
          <p className="text-white/90">Orders over $100 qualify for free shipping</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <Tag className="w-4 h-4" />
          <span className="text-sm font-medium">Save $10</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Select All Header */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={selectedItems.length === cartData.items.length}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  className="w-5 h-5"
                />
                <span className="font-bold text-lg">Select All Items</span>
                <span className="text-sm text-muted-foreground">({cartData.items.length} items)</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4" />
                <span>Save for later</span>
              </div>
            </div>
          </div>

          {/* Enhanced Cart Items */}
          {cartData.items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-muted/20 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-6">
                <Checkbox 
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                  className="w-5 h-5 mt-3"
                />
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-28 h-28 object-cover rounded-xl shadow-sm"
                  />
                  {item.brand && (
                    <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {item.brand}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-muted-foreground mb-2">{item.size}</p>
                  {item.color && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground">Color:</span>
                      <div className="w-4 h-4 rounded-full border border-muted" style={{backgroundColor: item.color.toLowerCase()}}></div>
                      <span className="text-sm">{item.color}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Enhanced Quantity Controls */}
                      <div className="flex items-center border border-muted rounded-lg overflow-hidden">
                        <button 
                          className="px-4 py-2 hover:bg-muted/50 transition-colors disabled:opacity-50"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={updating === item.id || item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-muted bg-muted/20 min-w-[60px] text-center font-medium">
                          {updating === item.id ? '...' : item.quantity}
                        </span>
                        <button 
                          className="px-4 py-2 hover:bg-muted/50 transition-colors disabled:opacity-50"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={updating === item.id}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/10"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                      <p className="text-sm text-muted-foreground">per item</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-muted/20 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Items ({selectedItems.length}):</span>
                <span className="font-semibold">${calculateSelectedTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-semibold text-accent-trending">
                  {calculateSelectedTotal() > 100 ? 'FREE' : '$10.00'}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${(calculateSelectedTotal() + (calculateSelectedTotal() > 100 ? 0 : 10)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full mb-4 text-lg py-6 hover-scale"
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Checkout ({selectedItems.length} items)
            </Button>

            {/* Enhanced Voucher Section */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter voucher code" 
                  className="flex-1" 
                />
                <Button variant="outline" className="px-6">
                  Apply
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                🎟️ Apply valid coupon codes for extra savings
              </p>
            </div>

            {/* Enhanced Payment Methods */}
            <div className="pt-6 border-t">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Secure Payment Options:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-3 flex items-center justify-center hover:bg-muted/50 transition-colors">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
