import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Store from "./pages/Store";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          {/* Other dashboard routes will be added here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;