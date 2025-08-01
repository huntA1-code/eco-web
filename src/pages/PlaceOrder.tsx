
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, CreditCard, CheckCircle, Plus, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getShippingAddresses, addShippingAddress, setDefaultAddress, ShippingAddress } from "@/api/shipping";
import { getCartItems } from "@/api/cart";

// Form validation schema
const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().optional(),
});

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('standard');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<any>(null);
  
  // Form for new address
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      country: 'United Kingdom',
      phoneNumber: '',
    },
  });
  
  // Mock shipping methods (would come from API)
  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '2-4 Business Days',
      price: 0,
      estimatedDays: '2-4 Business Days'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '1-2 Business Days',
      price: 9.99,
      estimatedDays: '1-2 Business Days'
    }
  ];
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [shippingData, cartResult] = await Promise.all([
          getShippingAddresses(),
          getCartItems()
        ]);
        
        setAddresses(shippingData.addresses);
        setCartData(cartResult);
        
        if (shippingData.defaultAddress) {
          setSelectedAddressId(shippingData.defaultAddress.id!);
        }
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Please try again",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  // Handler functions
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(Number(addressId));
  };

  const handleShippingMethodChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
  };

  const handleAddNewAddress = async (data: z.infer<typeof addressSchema>) => {
    try {
      const newAddress = await addShippingAddress({
        firstName: data.firstName,
        lastName: data.lastName,
        streetAddress: data.streetAddress,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        phoneNumber: data.phoneNumber || '',
      });
      setAddresses(prev => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id!);
      setIsAddingNew(false);
      form.reset();
      
      toast({
        title: "Address added",
        description: "New shipping address has been saved",
      });
    } catch (error) {
      toast({
        title: "Error adding address",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSetDefault = async (addressId: number) => {
    try {
      await setDefaultAddress(addressId);
      setAddresses(prev => 
        prev.map(addr => ({ ...addr, isDefault: addr.id === addressId }))
      );
      
      toast({
        title: "Default address updated",
        description: "Address has been set as default",
      });
    } catch (error) {
      toast({
        title: "Error updating default",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleContinueToPayment = () => {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    
    if (!selectedAddress) {
      toast({
        title: "Please select an address",
        description: "Choose a shipping address to continue",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Shipping information saved",
      description: "Proceeding to payment",
    });
    
    navigate('/pay');
  };

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
  const shippingCost = selectedShippingMethod === 'standard' ? 0 : 9.99;
  const subtotal = cartData?.subtotal || 0;
  const total = subtotal + shippingCost;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
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
            <div className="bg-muted text-muted-foreground p-3 rounded-full">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <span className="text-sm mt-2 text-muted-foreground">Cart</span>
          </div>
          <div className="flex-1 h-0.5 bg-muted mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="bg-gradient-primary text-white p-3 rounded-full shadow-lg">
                <Package className="h-6 w-6" />
              </div>
            </div>
            <span className="text-sm mt-2 font-semibold text-primary">Place Order</span>
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
        <Progress value={50} className="h-2" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Address */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border/50 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>
              
              <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddNewAddress)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                <SelectItem value="United States">United States</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1">
                          Save Address
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsAddingNew(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Choose Address</Label>
                  <Select 
                    value={selectedAddressId?.toString() || ""} 
                    onValueChange={handleAddressSelect}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select a shipping address" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem key={address.id} value={address.id!.toString()}>
                          <div className="flex items-center justify-between w-full">
                            <span>
                              {address.firstName} {address.lastName} - {address.city}
                            </span>
                            {address.isDefault && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-2">
                                Default
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedAddress && (
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {selectedAddress.firstName} {selectedAddress.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedAddress.streetAddress}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedAddress.city}, {selectedAddress.postalCode}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedAddress.country}
                        </p>
                        {selectedAddress.phoneNumber && (
                          <p className="text-sm text-muted-foreground">
                            {selectedAddress.phoneNumber}
                          </p>
                        )}
                      </div>
                      {!selectedAddress.isDefault && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSetDefault(selectedAddress.id!)}
                          className="text-xs"
                        >
                          Set Default
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No addresses found</p>
                <Button onClick={() => setIsAddingNew(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Address
                </Button>
              </div>
            )}
          </Card>

          {/* Shipping Method */}
          <Card className="p-6 border-border/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Shipping Method</h2>
            </div>
            <div className="space-y-3">
              {shippingMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer ${
                    selectedShippingMethod === method.id 
                      ? "bg-primary/5 border-primary shadow-sm" 
                      : "hover:bg-muted/50 hover:border-border"
                  }`}
                  onClick={() => handleShippingMethodChange(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedShippingMethod === method.id 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground"
                    }`}>
                      {selectedShippingMethod === method.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.estimatedDays}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {method.price === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `£${method.price.toFixed(2)}`
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24 border-border/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            
            {cartData && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartData.itemCount} items)</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                    {shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Including VAT</p>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full mt-6 h-12 text-base font-medium"
              onClick={handleContinueToPayment}
              disabled={!selectedAddress}
            >
              Continue to Payment
            </Button>
            
            {!selectedAddress && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Please select a shipping address to continue
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
