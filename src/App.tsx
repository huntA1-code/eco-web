import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SubNavbar } from './components/SubNavbar';
import Index from './pages/Index';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;