
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AddressForm from "./AddressForm";

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function Address() {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+1 234 567 8900",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
      isDefault: true,
    },
    {
      id: "2",
      name: "John Doe",
      phone: "+1 234 567 8901",
      street: "456 Market Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
      isDefault: false,
    },
  ]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = (newAddress: Omit<Address, "id" | "isDefault">) => {
    const address: Address = {
      ...newAddress,
      id: Math.random().toString(36).substr(2, 9),
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, address]);
    toast({
      title: "Address added",
      description: "Your new address has been added successfully.",
    });
  };

  const handleEditAddress = (updatedAddress: Address) => {
    setAddresses(addresses.map(addr => 
      addr.id === updatedAddress.id ? updatedAddress : addr
    ));
    setEditingAddress(null);
    toast({
      title: "Address updated",
      description: "Your address has been updated successfully.",
    });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully.",
    });
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
    toast({
      title: "Default address updated",
      description: "Your default address has been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">MY ADDRESS BOOK</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              ADD NEW ADDRESS
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm onSubmit={handleAddAddress} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className="relative border-l-4 border-l-primary p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{address.name}</h3>
                <p className="text-muted-foreground">{address.phone}</p>
              </div>
              {address.isDefault && (
                <Badge variant="outline" className="bg-[#F2FCE2] text-foreground border-none">
                  Default Address
                </Badge>
              )}
            </div>
            
            <div className="space-y-1 text-sm">
              <p>{address.street}</p>
              <p>{`${address.city}, ${address.state} ${address.postalCode}`}</p>
              <p>{address.country}</p>
            </div>

            <div className="flex justify-end items-center gap-4 mt-4">
              {!address.isDefault && (
                <Button
                  variant="link"
                  onClick={() => handleSetDefault(address.id)}
                  className="text-primary hover:text-primary/90"
                >
                  Make Default
                </Button>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/90"
                    onClick={() => setEditingAddress(address)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Edit Address</DialogTitle>
                  </DialogHeader>
                  {editingAddress && (
                    <AddressForm
                      initialData={editingAddress}
                      onSubmit={(data) => handleEditAddress({ ...editingAddress, ...data })}
                    />
                  )}
                </DialogContent>
              </Dialog>
              <Button
                variant="link"
                className="text-destructive hover:text-destructive/90"
                onClick={() => handleDeleteAddress(address.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
