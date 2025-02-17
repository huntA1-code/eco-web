import { Flame, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export const BottomNav = () => {
  const location = useLocation();
  const isReviewPage = location.pathname === '/store-review';
  const isStorePage = location.pathname === '/store';
  return <div className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            
            <div className="relative">
              <input type="text" placeholder="Search Store" className="pl-9 pr-4 py-1.5 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>;
};