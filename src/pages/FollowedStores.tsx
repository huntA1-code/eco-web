
import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const followingStores = [
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

const browsedStores = [
  {
    id: 3,
    name: "Fashion Hub",
    logo: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    category: "Fashion",
    rating: 4.75,
    followers: "2.1K",
    lastVisited: "2 days ago",
    products: [
      { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", price: 29.99 },
      { id: 2, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", price: 45.99 },
      { id: 3, image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", price: 89.99 },
      { id: 4, image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", price: 39.99 },
    ]
  },
  {
    id: 4,
    name: "Electronics Plus",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    category: "Tech",
    rating: 4.82,
    followers: "8.7K",
    lastVisited: "1 week ago",
    products: [
      { id: 1, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", price: 199.99 },
      { id: 2, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f", price: 299.99 },
      { id: 3, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 149.99 },
    ]
  }
];

const purchasedStores = [
  {
    id: 5,
    name: "Home Essentials",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    category: "Home",
    rating: 4.93,
    followers: "3.5K",
    lastPurchase: "3 days ago",
    totalOrders: 8,
    products: [
      { id: 1, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7", price: 24.99 },
      { id: 2, image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b", price: 18.99 },
      { id: 3, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c", price: 35.99 },
      { id: 4, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc", price: 42.99 },
    ]
  }
];

const StoreCard = ({ store, type }: { store: any; type: 'following' | 'browsed' | 'purchased' }) => (
  <div className="bg-gradient-to-br from-white via-gray-50/50 to-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        <img 
          src={store.logo} 
          alt={store.name}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-sm md:text-lg truncate">{store.name}</h3>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded whitespace-nowrap">
              {store.category}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
            <span className="font-bold">{store.rating} Rating</span>
            <span className="text-gray-500">{store.followers} Followers</span>
            {type === 'browsed' && (
              <span className="text-gray-400">Last visited: {store.lastVisited}</span>
            )}
            {type === 'purchased' && (
              <span className="text-green-600">{store.totalOrders} orders</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Share Store</DropdownMenuItem>
            <DropdownMenuItem>Report Store</DropdownMenuItem>
            {type === 'following' && (
              <DropdownMenuItem className="text-red-600">Unfollow</DropdownMenuItem>
            )}
            {type === 'browsed' && (
              <DropdownMenuItem>Follow Store</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button className="px-4 md:px-8 text-sm">VIEW</Button>
      </div>
    </div>

    {store.isNew && type === 'following' && (
      <div className="flex items-center gap-2 text-green-600 mb-4">
        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
        <span className="text-sm">The store has new items!</span>
      </div>
    )}

    {type === 'purchased' && (
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <span className="text-sm">Last purchase: {store.lastPurchase}</span>
      </div>
    )}

    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {store.products.map((product: any) => (
          <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-36 md:basis-48">
            <div className="relative">
              <img 
                src={product.image}
                alt="Product"
                className="w-full h-40 md:h-64 object-cover rounded-lg"
              />
              <span className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-xs md:text-sm">
                £{product.price.toFixed(2)}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4" />
      <CarouselNext className="hidden md:flex -right-4" />
    </Carousel>
  </div>
);

const FollowedStores = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'new'>('all');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Tabs defaultValue="following" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="following" className="text-sm md:text-lg font-semibold">
            FOLLOWING ({followingStores.length})
          </TabsTrigger>
          <TabsTrigger value="browsed" className="text-sm md:text-lg font-semibold">
            BROWSED ({browsedStores.length})
          </TabsTrigger>
          <TabsTrigger value="purchased" className="text-sm md:text-lg font-semibold">
            PURCHASED ({purchasedStores.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="following" className="mt-6 space-y-4">
          <div className="flex gap-2 md:gap-4 mb-6">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              className="rounded-full text-sm"
            >
              All
            </Button>
            <Button 
              variant={activeFilter === 'new' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('new')}
              className="rounded-full text-sm"
            >
              New
            </Button>
          </div>

          <div className="space-y-4 md:space-y-6">
            {followingStores.map(store => (
              <StoreCard key={store.id} store={store} type="following" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="browsed" className="mt-6 space-y-4">
          <div className="space-y-4 md:space-y-6">
            {browsedStores.map(store => (
              <StoreCard key={store.id} store={store} type="browsed" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="purchased" className="mt-6 space-y-4">
          <div className="space-y-4 md:space-y-6">
            {purchasedStores.map(store => (
              <StoreCard key={store.id} store={store} type="purchased" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowedStores;
