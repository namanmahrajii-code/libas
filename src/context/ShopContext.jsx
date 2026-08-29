import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialCategories } from '../data/products';
import { sampleProductReviews, wallOfLoveReviews } from '../data/reviews';
import adminDataService from '../admin/services/adminDataService';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Products state (persisted in localStorage with version tag)
  // Products & Categories loaded directly from authoritative store service
  const [products, setProducts] = useState(() => adminDataService.getProducts());
  const [categories, setCategories] = useState(() => adminDataService.getCategories());

  // Real-time synchronization when products/categories are added/edited in admin console
  useEffect(() => {
    const syncCatalog = () => {
      setProducts(adminDataService.getProducts());
      setCategories(adminDataService.getCategories());
    };

    window.addEventListener('libas_catalog_updated', syncCatalog);
    window.addEventListener('storage', syncCatalog);
    return () => {
      window.removeEventListener('libas_catalog_updated', syncCatalog);
      window.removeEventListener('storage', syncCatalog);
    };
  }, []);

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('the3monks_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Applied Coupon
  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('the3monks_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('the3monks_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders list
  const [orders, setOrders] = useState(() => {
    try {
      return adminDataService.getOrders();
    } catch {
      return [];
    }
  });

  // Reviews
  const [productReviews, setProductReviews] = useState(() => {
    const saved = localStorage.getItem('the3monks_reviews');
    return saved ? JSON.parse(saved) : sampleProductReviews;
  });

  // Giveaway entries
  const [giveawayEntries, setGiveawayEntries] = useState(() => {
    const saved = localStorage.getItem('the3monks_giveaways');
    return saved ? JSON.parse(saved) : [];
  });

  // Live Views Tracker
  const [viewsCount, setViewsCount] = useState(() => {
    const saved = localStorage.getItem('the3monks_views');
    return saved ? parseInt(saved, 10) : 1420;
  });

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Cart, coupon, wishlist sync to localStorage

  useEffect(() => {
    localStorage.setItem('the3monks_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('the3monks_coupon', JSON.stringify(coupon));
  }, [coupon]);

  useEffect(() => {
    localStorage.setItem('the3monks_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('the3monks_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('the3monks_reviews', JSON.stringify(productReviews));
  }, [productReviews]);

  useEffect(() => {
    localStorage.setItem('the3monks_giveaways', JSON.stringify(giveawayEntries));
  }, [giveawayEntries]);

  useEffect(() => {
    const increment = viewsCount + 1;
    setViewsCount(increment);
    localStorage.setItem('the3monks_views', increment.toString());
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart actions
  const addToCart = (product, selectedSize, quantity = 1, openDrawer = true) => {
    if (!selectedSize) {
      showToast('Please select a size first');
      return false;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            selectedSize,
            quantity,
            cartItemId: `${product.id}-${selectedSize}-${Date.now()}`
          }
        ];
      }
    });

    showToast(`Added ${product.title} (${selectedSize}) to bag`);
    if (openDrawer) setIsCartOpen(true);
    return true;
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from bag');
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to wishlist`);
        return [...prev, product];
      }
    });
  };

  // Apply Coupon
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LIBAS10') {
      const discount = 0.10; // 10% off
      setCoupon({ code: clean, discount, description: '10% Off LIBAS Fashion Collection' });
      showToast(`Coupon ${clean} applied! 10% Discount unlocked`);
      return { success: true, message: '10% Discount Applied' };
    } else if (clean === 'LIBAS20') {
      const discount = 0.20; // 20% off
      setCoupon({ code: 'LIBAS20', discount, description: '20% Off LIBAS Store Collection' });
      showToast('Coupon LIBAS20 applied! 20% Discount unlocked');
      return { success: true, message: '20% Discount Applied' };
    } else if (clean === 'FREESHIP') {
      setCoupon({ code: 'FREESHIP', discount: 0, freeShipping: true, description: 'Free Express Shipping' });
      showToast('Coupon FREESHIP applied!');
      return { success: true, message: 'Free Shipping Applied' };
    } else {
      showToast('Invalid coupon code. Try LIBAS10 or LIBAS20');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed');
  };

  // Add Review
  const addReview = (newReview) => {
    const reviewObj = {
      id: `pr-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      ...newReview
    };
    setProductReviews((prev) => [reviewObj, ...prev]);
    showToast('Thank you! Your review has been published.');
  };

  // Add Order
  const createOrder = (orderData) => {
    const newOrder = adminDataService.addOrder(orderData);
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Add Giveaway
  const addGiveawayEntry = (entry) => {
    const newEntry = {
      id: `GW-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...entry
    };
    setGiveawayEntries((prev) => [newEntry, ...prev]);
    showToast('Successfully registered for the Drop Giveaway!');
    return newEntry;
  };

  // Admin actions
  const addProduct = (newProduct) => {
    const prod = {
      id: `prod_${Date.now()}`,
      slug: newProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      isNew: true,
      rating: 5.0,
      reviewCount: 0,
      ...newProduct
    };
    setProducts((prev) => [prod, ...prev]);
    showToast('Product created successfully');
    return prod;
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast('Product updated successfully');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted');
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order status updated to ${status}`);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const discountAmount = coupon?.discount ? Math.round(cartSubtotal * coupon.discount) : 0;
  const freeShippingThreshold = 1599;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || coupon?.freeShipping;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 99;
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount) + shippingFee;

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        coupon,
        wishlist,
        orders,
        productReviews,
        wallOfLoveReviews,
        giveawayEntries,
        viewsCount,
        isCartOpen,
        isSearchOpen,
        isSizeGuideOpen,
        quickViewProduct,
        toastMessage,
        cartSubtotal,
        cartOriginalTotal,
        cartItemCount,
        discountAmount,
        freeShippingThreshold,
        isFreeShipping,
        shippingFee,
        cartFinalTotal,
        setIsCartOpen,
        setIsSearchOpen,
        setIsSizeGuideOpen,
        setQuickViewProduct,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        addReview,
        createOrder,
        addGiveawayEntry,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
