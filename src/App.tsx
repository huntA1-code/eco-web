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
import EditProduct from "./pages/dashboard/products/EditProduct";
import Categories from "./pages/dashboard/products/Categories";
import Brands from "./pages/dashboard/products/Brands";
import Colors from "./pages/dashboard/products/Colors";
import Sizes from "./pages/dashboard/products/Sizes";
import Attributes from "./pages/dashboard/products/Attributes";

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
        <Route path="products/edit" element={<EditProduct />} />
        <Route path="products/categories" element={<Categories />} />
        <Route path="products/brands" element={<Brands />} />
        <Route path="products/colors" element={<Colors />} />
        <Route path="products/sizes" element={<Sizes />} />
        <Route path="products/attributes" element={<Attributes />} />
        {/* Add other product management routes here */}
      </Route>
    </Routes>
  );
}

export default App;