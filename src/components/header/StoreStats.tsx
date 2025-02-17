import { Check, Flame, User } from 'lucide-react';
export const StoreStats = () => {
  return <div className="flex flex-wrap gap-3">
      
      <div className="flex items-center gap-1 px-3 py-1 bg-black/20 rounded-full text-white text-sm">
        <Flame size={16} />
        <span>5K+ sold recently</span>
      </div>
      <div className="flex items-center gap-1 px-3 py-1 bg-black/20 rounded-full text-white text-sm">
        <User size={16} />
        <span>100+ repurchase</span>
      </div>
    </div>;
};