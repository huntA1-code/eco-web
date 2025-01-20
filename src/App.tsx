import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Store from "./pages/Store";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import ViewProducts from "./pages/dashboard/products/ViewProducts";
import AddProduct from "./pages/dashboard/products/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/store" element={<Store />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="products/view" element={<ViewProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        {/* Add other product management routes here */}
      </Route>
    </Routes>
  );
}

export default App;