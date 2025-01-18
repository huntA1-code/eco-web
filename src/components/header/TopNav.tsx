import { Link } from 'react-router-dom';

export const TopNav = () => {
  return (
    <nav className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Multi-brand Sports Flagship Store</span>
        </div>
      </div>
    </nav>
  );
};