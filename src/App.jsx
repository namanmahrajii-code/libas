import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

// Customer Layout & Pages
import CustomerLayout from './layouts/CustomerLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Giveaway from './pages/Giveaway';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';

// Dedicated Separate Admin Application
import AdminApp from './admin/AdminApp';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 1. SEPARATE ADMIN APPLICATION ROUTE (/admin/*) */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* 2. CUSTOMER-FACING STOREFRONT ROUTES */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:slug" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="giveaway" element={<Giveaway />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="policy" element={<Policy />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
