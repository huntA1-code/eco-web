
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SubNavbar } from "./components/SubNavbar";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Pay from "./pages/Pay";
import OrderComplete from "./pages/OrderComplete";
import Store from "./pages/Store";
import WishList from "./pages/WishList";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import ViewProducts from "./pages/dashboard/products/ViewProducts";
import AddProduct from "./pages/dashboard/products/AddProduct";
import EditProduct from "./pages/dashboard/products/EditProduct";
import Categories from "./pages/dashboard/products/Categories";
import AddCategory from "./pages/dashboard/products/AddCategory";
import EditCategory from "./pages/dashboard/products/EditCategory";
import Brands from "./pages/dashboard/products/Brands";
import AddBrand from "./pages/dashboard/products/AddBrand";
import EditBrand from "./pages/dashboard/products/EditBrand";
import Colors from "./pages/dashboard/products/Colors";
import AddColor from "./pages/dashboard/products/AddColor";
import EditColor from "./pages/dashboard/products/EditColor";
import Sizes from "./pages/dashboard/products/Sizes";
import AddSize from "./pages/dashboard/products/AddSize";
import SizeCategories from "./pages/dashboard/products/SizeCategories";
import AddSizeCategory from "./pages/dashboard/products/AddSizeCategory";
import Attributes from "./pages/dashboard/products/Attributes";
import AddAttribute from "./pages/dashboard/products/AddAttribute";
import EditAttribute from "./pages/dashboard/products/EditAttribute";
import AttributeTypes from "./pages/dashboard/products/AttributeTypes";
import AddAttributeType from "./pages/dashboard/products/AddAttributeType";
import EditAttributeType from "./pages/dashboard/products/EditAttributeType";
import Orders from "./pages/dashboard/orders/Orders";
import Discounts from "./pages/dashboard/discounts/Discounts";
import AddDiscount from "./pages/dashboard/discounts/AddDiscount";
import EditDiscount from "./pages/dashboard/discounts/EditDiscount";
import DiscountProducts from "./pages/dashboard/discounts/DiscountProducts";
import RecentlyViewed from "./pages/RecentlyViewed";
import Authentication from "./pages/Authentication";
import OTPVerification from "./pages/OTPVerification";
import StoreReview from "./pages/StoreReview";

function App() {
  const location = useLocation();
  
  const showSubNavbarPaths = ['/', '/products', '/product', '/store'];
  const shouldShowSubNavbar = showSubNavbarPaths.some(path => 
    location.pathname === path || location.pathname.startsWith(path + '/')
  );

  const hideNavbarPaths = ['/auth'];
  const shouldHideNavbar = hideNavbarPaths.some(path =>
    location.pathname.startsWith(path)
  );

  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardPage && !shouldHideNavbar && <Navbar />}
      {!isDashboardPage && shouldShowSubNavbar && <SubNavbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productName" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist/*" element={<WishList />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store-review" element={<StoreReview />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/auth/verify" element={<OTPVerification />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="products/view" element={<ViewProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit" element={<EditProduct />} />
          <Route path="products/categories" element={<Categories />} />
          <Route path="products/categories/add" element={<AddCategory />} />
          <Route path="products/categories/edit/:id" element={<EditCategory />} />
          <Route path="products/brands" element={<Brands />} />
          <Route path="products/brands/add" element={<AddBrand />} />
          <Route path="products/brands/edit/:id" element={<EditBrand />} />
          <Route path="products/colors" element={<Colors />} />
          <Route path="products/colors/add" element={<AddColor />} />
          <Route path="products/colors/edit/:id" element={<EditColor />} />
          <Route path="products/sizes" element={<Sizes />} />
          <Route path="products/sizes/add" element={<AddSize />} />
          <Route path="products/sizes/categories" element={<SizeCategories />} />
          <Route path="products/sizes/categories/add" element={<AddSizeCategory />} />
          <Route path="products/attributes" element={<Attributes />} />
          <Route path="products/attributes/add" element={<AddAttribute />} />
          <Route path="products/attributes/edit/:id" element={<EditAttribute />} />
          <Route path="products/attributes/types" element={<AttributeTypes />} />
          <Route path="products/attributes/types/add" element={<AddAttributeType />} />
          <Route path="products/attributes/types/edit/:id" element={<EditAttributeType />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="discounts/add" element={<AddDiscount />} />
          <Route path="discounts/edit/:id" element={<EditDiscount />} />
          <Route path="discounts/:id/products" element={<DiscountProducts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
