import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import CartDrawer from '../components/CartDrawer';
import SearchModal from '../components/SearchModal';
import SizeGuideModal from '../components/SizeGuideModal';
import QuickViewModal from '../components/QuickViewModal';

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen selection:bg-black selection:text-white bg-white">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {/* Customer Overlays & Modals */}
      <CartDrawer />
      <SearchModal />
      <SizeGuideModal />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default CustomerLayout;
