import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SubNavbar } from './components/SubNavbar';
import Index from './pages/Index';
import Products from './pages/Products';
import Store from './pages/Store';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SubNavbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products/:productName" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;