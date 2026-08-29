import { initialProducts, initialCategories } from '../../data/products';
import { wallOfLoveReviews } from '../../data/reviews';

const STORAGE_KEYS = {
  PRODUCTS: 'libas_admin_products_v1',
  CATEGORIES: 'libas_admin_categories_v1',
  ORDERS: 'libas_admin_orders_v2_zero',
  CUSTOMERS: 'libas_admin_customers_v2_zero',
  COUPONS: 'libas_admin_coupons_v2_zero',
  REVIEWS: 'libas_admin_reviews_v1',
  CONTENT: 'libas_admin_content_v1',
  SETTINGS: 'libas_admin_settings_v1',
  PAYMENTS: 'libas_admin_payments_v1',
};

// Initial store settings with authoritative LIBAS info
const initialStoreSettings = {
  brandName: 'LIBAS',
  businessType: 'Fashion & Clothing Store',
  tagline: 'Modern Fashion • Premium Brands • Latest Collections',
  address: {
    street: 'RTO Gas Godown Link Road',
    locality: 'Haldwani',
    city: 'Haldwani',
    state: 'Uttarakhand',
    pincode: '263139',
    country: 'India',
    plusCode: 'RTO Gas Godown Link Road, Haldwani',
  },
  hours: '9:00 AM – 7:00 PM',
  rating: {
    score: 4.8,
    reviewsCount: 24,
    source: 'Verified Reviews',
  },
  socials: {
    instagram: '@libas_haldwani',
    instagramUrl: 'https://www.instagram.com/',
  },
  policies: {
    shippingMinFree: 1599,
    standardShippingFee: 99,
    returnWindowDays: 7,
  }
};

// Initial Payment Configuration
export const initialPaymentSettings = {
  upi: {
    enabled: true,
    title: 'UPI / QR (Google Pay, PhonePe, Paytm, BHIM)',
    upiId: '7900455958-2@axl',
    payeeName: 'LIBAS Fashion',
    qrImage: '',
    instructions: 'Scan the dynamic QR code with any UPI app or transfer to UPI ID. Then provide your 12-digit UTR number.',
  },
  cod: {
    enabled: true,
    title: 'Cash on Delivery (Store Pickup & Haldwani Local)',
    minOrder: 0,
    maxOrder: 25000,
    fee: 0,
    instructions: 'Pay in cash upon physical delivery at your doorstep or store pickup.',
  },
  card: {
    enabled: true,
    title: 'Credit / Debit Cards & Netbanking',
    provider: 'Razorpay',
    keyId: 'rzp_live_libas8921',
    secretKey: '••••••••••••••••',
    liveMode: true,
    instructions: 'Accept all Visa, Mastercard, RuPay, and Netbanking payments securely.',
  },
  whatsapp: {
    enabled: true,
    title: 'Order via WhatsApp Direct',
    phone: '917900455958',
    instructions: 'Order directly with store staff via WhatsApp for personalized assistance.',
  },
};

// Initial homepage CMS content
const initialContent = {
  hero: {
    badge: 'HALDWANI • FASHION & CLOTHING STORE',
    title: 'LIBAS',
    subtitle: 'LIBAS is your fashion destination in Haldwani, offering a thoughtfully curated collection of stylish clothing for different styles and occasions. From everyday essentials to the latest fashion trends, we bring together quality, comfort and style under one roof.',
    ctaPrimaryText: 'EXPLORE COLLECTION',
    ctaPrimaryLink: '/shop',
    ctaSecondaryText: 'VISIT OUR STORE',
    ctaSecondaryLink: '/contact',
    bgImage: '/images/banners/hero-desktop.jpg',
  },
  announcement: {
    enabled: true,
    text: '✨ LIBAS HALDWANI • MODERN FASHION & CLOTHING STORE • RTO GAS GODOWN LINK ROAD • OPEN 9:00 AM – 7:00 PM • PREMIUM BRANDS',
    highlightCode: 'LIBAS10',
  },
  banners: [
    {
      id: 'b-1',
      title: 'LATEST FASHION ARRIVALS',
      subtitle: 'Discover stylish collections and premium brands curated to help you look and feel your best',
      link: '/shop',
      active: true,
    }
  ]
};

// Initial coupons
const initialCoupons = [
  {
    id: 'c-1',
    code: 'LIBAS10',
    type: 'percentage', // percentage | fixed
    value: 10,
    minOrder: 999,
    maxDiscount: 500,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    usageLimit: 1000,
    usageCount: 0,
    active: true,
  },
  {
    id: 'c-2',
    code: 'LIBAS20',
    type: 'percentage',
    value: 20,
    minOrder: 2499,
    maxDiscount: 1000,
    startDate: '2026-02-01',
    expiryDate: '2026-06-30',
    usageLimit: 250,
    usageCount: 0,
    active: true,
  },
  {
    id: 'c-3',
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    minOrder: 799,
    maxDiscount: 99,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usageCount: 0,
    active: true,
  },
];

// Initial customers (0 by default)
const initialCustomers = [];

// Initial orders (0 by default)
const initialOrders = [];

// Initial reviews
const initialAdminReviews = wallOfLoveReviews.map((r, i) => ({
  id: r.id || `rev-${i + 1}`,
  customerName: r.name,
  city: r.city,
  productName: r.productName || 'Streetwear Item',
  rating: r.rating,
  comment: r.comment,
  date: r.date || 'Recently',
  status: 'Approved', // Approved | Hidden | Pending
}));

class AdminDataService {
  constructor() {
    this.initData();
  }

  initData() {
    try {
      localStorage.removeItem('libas_admin_orders_v1');
      localStorage.removeItem('libas_admin_customers_v1');
      localStorage.removeItem('libas_admin_coupons_v1');
      localStorage.removeItem('drip_admin_orders_v1');
      localStorage.removeItem('drip_admin_customers_v1');
      localStorage.removeItem('drip_admin_coupons_v1');
      // If legacy demo orders exist, clean them
      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!savedOrders) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
      }
      const savedCust = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      if (!savedCust) {
        localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify([]));
      }
    } catch {}

    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(initialCoupons.map((c) => ({ ...c, usageCount: 0 }))));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initialAdminReviews));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONTENT)) {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(initialContent));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialStoreSettings));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPaymentSettings));
    }
  }

  resetDemoData() {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(initialCoupons.map((c) => ({ ...c, usageCount: 0 }))));
      localStorage.setItem('the3monks_orders', JSON.stringify([]));
      localStorage.setItem('the3monks_giveaways', JSON.stringify([]));
    } catch {}
    return true;
  }

  // --- PRODUCTS ---
  getProducts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || initialProducts;
    } catch {
      return initialProducts;
    }
  }

  saveProducts(products) {
    const normalized = products.map((p) => {
      const image = p.image || p.images?.[0] || '/images/products/midnight-graphic-tee.png';
      const images = (p.images && Array.isArray(p.images) && p.images.length > 0) ? p.images : [image];
      return {
        ...p,
        image,
        images,
        tags: p.tags || [],
        gender: p.gender || 'Men',
      };
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(normalized));
    localStorage.setItem('the3monks_products', JSON.stringify(normalized));
    try {
      window.dispatchEvent(new CustomEvent('libas_catalog_updated'));
    } catch {}
    return normalized;
  }

  addProduct(productData) {
    const products = this.getProducts();
    const id = `prod_custom_${Date.now()}`;
    const slug = productData.slug || productData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const image = productData.image || productData.images?.[0] || '/images/products/midnight-graphic-tee.png';
    const images = (productData.images && Array.isArray(productData.images) && productData.images.length > 0)
      ? productData.images
      : (productData.galleryImages && productData.galleryImages.length > 0 ? productData.galleryImages : [image]);
    
    const newProd = {
      ...productData,
      id,
      slug,
      image,
      images,
      tags: productData.tags || [],
      gender: productData.gender || 'Men',
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 0,
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProd);
    this.saveProducts(products);
    return newProd;
  }

  updateProduct(id, updates) {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      const image = updates.image || updates.images?.[0] || products[idx].image;
      const images = (updates.images && updates.images.length)
        ? updates.images
        : (updates.galleryImages && updates.galleryImages.length ? updates.galleryImages : (products[idx].images || [image]));
      products[idx] = {
        ...products[idx],
        ...updates,
        image,
        images,
        tags: updates.tags || products[idx].tags || [],
        gender: updates.gender || products[idx].gender || 'Men',
        updatedAt: new Date().toISOString(),
      };
      this.saveProducts(products);
      return products[idx];
    }
    return null;
  }

  deleteProduct(id) {
    const products = this.getProducts().filter((p) => p.id !== id);
    this.saveProducts(products);
    return true;
  }

  duplicateProduct(id) {
    const products = this.getProducts();
    const target = products.find((p) => p.id === id);
    if (!target) return null;
    const duplicated = {
      ...target,
      id: `prod_copy_${Date.now()}`,
      slug: `${target.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      title: `${target.title} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString(),
    };
    products.unshift(duplicated);
    this.saveProducts(products);
    return duplicated;
  }

  // --- CATEGORIES ---
  getCategories() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || initialCategories;
    } catch {
      return initialCategories;
    }
  }

  saveCategories(categories) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    localStorage.setItem('the3monks_categories', JSON.stringify(categories));
    try {
      window.dispatchEvent(new CustomEvent('libas_catalog_updated'));
    } catch {}
    return categories;
  }

  addCategory(categoryData) {
    const categories = this.getCategories();
    const id = categoryData.id || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      ...categoryData,
      id,
      active: categoryData.active !== undefined ? categoryData.active : true,
    };
    categories.push(newCat);
    this.saveCategories(categories);
    return newCat;
  }

  updateCategory(id, updates) {
    const categories = this.getCategories();
    const idx = categories.findIndex((c) => c.id === id);
    if (idx !== -1) {
      categories[idx] = { ...categories[idx], ...updates };
      this.saveCategories(categories);
      return categories[idx];
    }
    return null;
  }

  deleteCategory(id) {
    const categories = this.getCategories().filter((c) => c.id !== id);
    this.saveCategories(categories);
    return true;
  }

  // --- ORDERS ---
  getOrders() {
    try {
      let savedOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS));
      if (!savedOrders || !Array.isArray(savedOrders)) {
        const legacy = localStorage.getItem('the3monks_orders');
        savedOrders = legacy ? JSON.parse(legacy) : initialOrders;
      }
      return savedOrders.map((o) => ({
        ...o,
        orderNumber: o.orderNumber || (o.id ? o.id.replace(/^ORD-/, '') : '000000'),
        date: o.date || o.createdAt ? new Date(o.createdAt || Date.now()).toLocaleString() : 'Recently',
        total: o.total !== undefined ? o.total : (o.totalAmount || 0),
        totalAmount: o.totalAmount !== undefined ? o.totalAmount : (o.total || 0),
        customer: o.customer || {
          name: o.shippingDetails?.fullName || 'Customer',
          phone: o.shippingDetails?.phone || '',
          email: o.shippingDetails?.email || 'N/A',
          address: `${o.shippingDetails?.address || ''}, ${o.shippingDetails?.city || ''}, ${o.shippingDetails?.state || ''} - ${o.shippingDetails?.pincode || ''}`,
          city: o.shippingDetails?.city || 'Haldwani',
          state: o.shippingDetails?.state || 'Uttarakhand',
          pincode: o.shippingDetails?.pincode || '',
        },
        items: (o.items || []).map((it) => ({
          ...it,
          selectedSize: it.selectedSize || it.size || 'M',
          size: it.size || it.selectedSize || 'M',
          image: it.images ? it.images[0] : it.image || '/images/products/midnight-graphic-tee.png',
        })),
        status: o.status || 'Processing',
        paymentMethod: o.paymentMethod || 'UPI',
        paymentStatus: o.paymentStatus || 'Pending Verification',
      }));
    } catch {
      return initialOrders;
    }
  }

  saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    try {
      localStorage.setItem('the3monks_orders', JSON.stringify(orders));
    } catch {}
    return orders;
  }

  addOrder(orderData) {
    const orders = this.getOrders();
    const orderNumber =
      orderData.orderNumber ||
      (orderData.id ? orderData.id.replace(/^ORD-/, '') : Date.now().toString().slice(-6));
    const orderId = orderData.id || `ORD-${orderNumber}`;

    const shipping = orderData.shippingDetails || orderData.customer || {};
    const customerObj = {
      id: orderData.customer?.id || `cust_${Date.now()}`,
      name: shipping.fullName || shipping.name || 'Customer',
      email: shipping.email || 'N/A',
      phone: shipping.phone || '',
      address: `${shipping.address || ''}${shipping.landmark ? ', ' + shipping.landmark : ''}, ${shipping.city || ''}, ${shipping.state || ''} - ${shipping.pincode || ''}`,
      city: shipping.city || 'Haldwani',
      state: shipping.state || 'Uttarakhand',
      pincode: shipping.pincode || '',
    };

    const normalizedItems = (orderData.items || []).map((it) => ({
      id: it.id || `prod_${Date.now()}`,
      title: it.title || 'Streetwear Item',
      size: it.selectedSize || it.size || 'M',
      selectedSize: it.selectedSize || it.size || 'M',
      color: it.color || 'Standard',
      price: it.price || 0,
      quantity: it.quantity || 1,
      image: it.images ? it.images[0] : it.image || '/images/products/midnight-graphic-tee.png',
    }));

    const total =
      orderData.total !== undefined
        ? orderData.total
        : orderData.totalAmount !== undefined
        ? orderData.totalAmount
        : 0;
    const subtotal = orderData.subtotal !== undefined ? orderData.subtotal : total;
    const discount = orderData.discount !== undefined ? orderData.discount : orderData.discountAmount || 0;
    const shippingFee = orderData.shippingFee !== undefined ? orderData.shippingFee : orderData.shipping || 0;

    const fullOrder = {
      id: orderId,
      orderNumber,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      createdAt: orderData.createdAt || new Date().toISOString(),
      customer: customerObj,
      shippingDetails: shipping,
      items: normalizedItems,
      subtotal,
      discount,
      couponCode: orderData.couponCode || '',
      shipping: shippingFee,
      shippingFee,
      total,
      totalAmount: total,
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: orderData.paymentStatus || 'Pending Verification',
      upiDetails: orderData.upiDetails || null,
      status: orderData.status || 'Processing',
      timeline: orderData.timeline || [
        {
          status: 'Order Placed',
          time: new Date().toLocaleString(),
          note: `Placed via ${orderData.paymentMethod || 'Online'}`,
        },
      ],
    };

    orders.unshift(fullOrder);
    this.saveOrders(orders);

    // Record or update customer
    this.recordCustomerOrder(customerObj, total);

    return fullOrder;
  }

  updateOrderStatus(orderId, newStatus, note = '') {
    const orders = this.getOrders();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx !== -1) {
      orders[idx].status = newStatus;
      if (!orders[idx].timeline) orders[idx].timeline = [];
      orders[idx].timeline.push({
        status: newStatus,
        time: new Date().toLocaleString(),
        note: note || `Status changed to ${newStatus}`,
      });
      this.saveOrders(orders);
      return orders[idx];
    }
    return null;
  }

  // --- CUSTOMERS ---
  getCustomers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) || initialCustomers;
    } catch {
      return initialCustomers;
    }
  }

  saveCustomers(customers) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    return customers;
  }

  recordCustomerOrder(customerData, orderTotal) {
    const customers = this.getCustomers();
    const existing = customers.find(
      (c) =>
        (c.phone && customerData.phone && c.phone.replace(/\D/g, '') === customerData.phone.replace(/\D/g, '')) ||
        (c.email && customerData.email && c.email !== 'N/A' && c.email.toLowerCase() === customerData.email.toLowerCase())
    );

    if (existing) {
      existing.totalOrders = (existing.totalOrders || 0) + 1;
      existing.totalSpent = (existing.totalSpent || 0) + (orderTotal || 0);
      existing.lastOrderDate = new Date().toISOString().split('T')[0];
      if (customerData.address) existing.address = customerData.address;
    } else {
      customers.unshift({
        id: customerData.id || `cust-${Date.now()}`,
        name: customerData.name || 'New Customer',
        email: customerData.email || 'N/A',
        phone: customerData.phone || '',
        city: customerData.city || 'Haldwani',
        state: customerData.state || 'Uttarakhand',
        totalOrders: 1,
        totalSpent: orderTotal || 0,
        lastOrderDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0],
      });
    }
    this.saveCustomers(customers);
  }

  // --- COUPONS ---
  getCoupons() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COUPONS)) || initialCoupons;
    } catch {
      return initialCoupons;
    }
  }

  saveCoupons(coupons) {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    return coupons;
  }

  addCoupon(couponData) {
    const coupons = this.getCoupons();
    const newCoupon = {
      ...couponData,
      id: `c-${Date.now()}`,
      code: couponData.code.trim().toUpperCase(),
      usageCount: 0,
      active: couponData.active !== undefined ? couponData.active : true,
    };
    coupons.unshift(newCoupon);
    this.saveCoupons(coupons);
    return newCoupon;
  }

  deleteCoupon(id) {
    const coupons = this.getCoupons().filter((c) => c.id !== id);
    this.saveCoupons(coupons);
    return true;
  }

  toggleCouponStatus(id) {
    const coupons = this.getCoupons();
    const item = coupons.find((c) => c.id === id);
    if (item) {
      item.active = !item.active;
      this.saveCoupons(coupons);
      return item;
    }
    return null;
  }

  // --- REVIEWS ---
  getReviews() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || initialAdminReviews;
    } catch {
      return initialAdminReviews;
    }
  }

  saveReviews(reviews) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return reviews;
  }

  updateReviewStatus(id, newStatus) {
    const reviews = this.getReviews();
    const item = reviews.find((r) => r.id === id);
    if (item) {
      item.status = newStatus;
      this.saveReviews(reviews);
      return item;
    }
    return null;
  }

  deleteReview(id) {
    const reviews = this.getReviews().filter((r) => r.id !== id);
    this.saveReviews(reviews);
    return true;
  }

  // --- CMS CONTENT ---
  getContent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTENT)) || initialContent;
    } catch {
      return initialContent;
    }
  }

  saveContent(content) {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
    return content;
  }

  // --- STORE SETTINGS ---
  getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || initialStoreSettings;
    } catch {
      return initialStoreSettings;
    }
  }

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  }

  // --- PAYMENT SETTINGS ---
  getPaymentSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      return stored ? JSON.parse(stored) : initialPaymentSettings;
    } catch {
      return initialPaymentSettings;
    }
  }

  savePaymentSettings(paymentSettings) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(paymentSettings));
    localStorage.setItem('the3monks_payment_settings', JSON.stringify(paymentSettings));
    return paymentSettings;
  }

  // --- DASHBOARD METRICS CALCULATION ---
  getDashboardMetrics() {
    const orders = this.getOrders();
    const products = this.getProducts();
    const customers = this.getCustomers();

    const totalSales = orders
      .filter((o) => o.status !== 'Cancelled' && o.status !== 'Refunded')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalCustomers = customers.length;

    // Today's metrics (using current date matching)
    const todayStr = '2026-08-28';
    const todayOrdersList = orders.filter((o) => o.date.startsWith(todayStr));
    const todaySales = todayOrdersList
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const todayOrders = todayOrdersList.length;

    const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;

    const lowStockProducts = products.filter((p) => {
      const totalStock = p.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || p.stock || 0;
      return totalStock <= 10;
    });

    return {
      totalSales,
      totalOrders,
      totalProducts,
      totalCustomers,
      todaySales,
      todayOrders,
      pendingOrders,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
    };
  }
}

export const adminDataService = new AdminDataService();
export default adminDataService;
