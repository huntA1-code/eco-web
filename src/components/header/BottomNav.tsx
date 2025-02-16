
import { Flame, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const location = useLocation();
  const isReviewPage = location.pathname === '/store-review';
  const isStorePage = location.pathname === '/store';

  return (
    <div className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            <Link 
              to="/store"
              className={`${isStorePage ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Item
            </Link>
            <Link 
              to="/store-review"
              className={`${isReviewPage ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Review
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Flame size={16} className="text-orange-500" />
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
