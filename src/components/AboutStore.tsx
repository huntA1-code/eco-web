import React, { useState } from 'react';
import { Star, Users, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AboutStoreProps {
  storeName: string;
  rating: number;
  itemCount: number;
  followerCount: number;
  logo: string;
}

export const AboutStore = ({ 
  storeName, 
  rating, 
  itemCount, 
  followerCount, 
  logo 
}: AboutStoreProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-4">
        <img 
          src={logo} 
          alt={`${storeName} logo`} 
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-serif font-semibold">{storeName}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{rating.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              <span>{itemCount} items</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{followerCount} followers</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button 
          onClick={() => navigate(`/store/${storeName}`)}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
        >
          View All Items
        </button>
        <button 
          onClick={() => setIsFollowing(!isFollowing)}
          className={`flex-1 px-4 py-2 rounded-full border transition-colors ${
            isFollowing 
              ? 'bg-neutral-light text-neutral-dark border-neutral' 
              : 'bg-white text-foreground border-neutral hover:bg-neutral-light'
          }`}
        >
          {isFollowing ? 'Following' : '+ Follow'}
        </button>
      </div>
    </div>
  );
};