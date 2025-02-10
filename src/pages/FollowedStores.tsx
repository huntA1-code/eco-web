
import { useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stores = [
  {
    id: 1,
    name: "CHARMNG Kids",
    logo: "https://images.unsplash.com/photo-1562157873-818bc0726f68",
    category: "Trends",
    rating: 4.86,
    followers: "4.3K",
    isNew: true,
    products: [
      { id: 1, image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6", price: 8.49 },
      { id: 2, image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6", price: 8.07 },
      { id: 3, image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6", price: 8.99 },
      { id: 4, image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6", price: 8.99 },
      { id: 5, image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6", price: 9.49 },
      { id: 6, image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6", price: 3.49 },
    ]
  },
  {
    id: 2,
    name: "Multi-brand Sports Flagship Store",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Brand",
    rating: 4.91,
    followers: "585",
    isNew: true,
    products: [
      { id: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 16.41 },
      { id: 2, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 55.20 },
      { id: 3, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 33.19 },
      { id: 4, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 225.47 },
      { id: 5, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 94.45 },
      { id: 6, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 56.28 },
    ]
  }
];

const FollowedStores = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'new'>('all');

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">FOLLOW</h1>
      
      <Tabs defaultValue="following" className="mb-8">
        <TabsList className="w-full justify-center gap-8">
          <TabsTrigger value="following" className="text-lg font-semibold">
            FOLLOWING (2)
          </TabsTrigger>
          <TabsTrigger value="browsed" className="text-lg text-gray-500">
            BROWSED
          </TabsTrigger>
          <TabsTrigger value="purchased" className="text-lg text-gray-500">
            PURCHASED
          </TabsTrigger>
        </TabsList>

        <TabsContent value="following" className="mt-6">
          <div className="flex gap-4 mb-6">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              className="rounded-full"
            >
              All
            </Button>
            <Button 
              variant={activeFilter === 'new' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('new')}
              className="rounded-full"
            >
              New
            </Button>
          </div>

          <div className="space-y-6">
            {stores.map(store => (
              <div 
                key={store.id}
                className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={store.logo} 
                      alt={store.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{store.name}</h3>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded">
                          {store.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="font-bold">{store.rating} Rating</span>
                        <span className="text-gray-500">{store.followers} Followers</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Share Store</DropdownMenuItem>
                        <DropdownMenuItem>Report Store</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Unfollow</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button className="px-8">VIEW</Button>
                  </div>
                </div>

                {store.isNew && (
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span className="text-sm">The store has new items!</span>
                  </div>
                )}

                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {store.products.map(product => (
                      <div key={product.id} className="relative flex-none w-48">
                        <img 
                          src={product.image}
                          alt="Product"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-sm">
                          £{product.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 p-1 rounded-full shadow-lg">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 p-1 rounded-full shadow-lg">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowedStores;
