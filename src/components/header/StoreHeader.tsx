import { Check, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { StoreStats } from './StoreStats';

export const StoreHeader = () => {
  return (
    <div className="w-full bg-neutral-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-start gap-6">
          {/* Store Logo */}
          <div className="w-24 h-24 bg-white rounded-lg shrink-0"></div>
          
          {/* Store Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">Multi-brand Sports Flagship Store</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20">
                  <Check size={16} />
                  Choices
                </Button>
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20">
                  <Check size={16} />
                  Brand
                </Button>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>4.91</span>
                </div>
              </div>
            </div>
            <StoreStats />
          </div>
          
          {/* Follow Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              + Follow
            </Button>
            <p className="text-sm mt-2">448 Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};