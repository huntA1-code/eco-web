import { Fire, Search } from 'lucide-react';

export const BottomNav = () => {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            <a href="#items" className="text-gray-900 font-medium border-b-2 border-gray-900">Item</a>
            <a href="#reviews" className="text-gray-600 hover:text-gray-900">Review</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Fire size={16} className="text-orange-500" />
              <span>Men Casual Athletic Shoes</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Store"
                className="pl-9 pr-4 py-1.5 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};