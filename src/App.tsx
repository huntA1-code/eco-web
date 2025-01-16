import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SubNavbar } from './components/SubNavbar';
import Index from './pages/Index';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productName" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;