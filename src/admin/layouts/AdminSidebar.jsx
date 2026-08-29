import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Star,
  Layers,
  Store,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { logout, adminUser } = useAdminAuth();
  const location = useLocation();

  // Collapsible sub-menus state
  const [openSubMenus, setOpenSubMenus] = useState({
    products: true,
    orders: true,
    content: false,
    store: false,
  });

  const toggleSubMenu = (key) => {
    setOpenSubMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
      isActive
        ? 'bg-slate-800 text-white shadow-xs font-bold'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`;

  const subNavItemClass = ({ isActive }) =>
    `flex items-center justify-between px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors pl-9 ${
      isActive
        ? 'text-emerald-400 font-bold bg-slate-800/80'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
    }`;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/logo.png"
              alt="LIBAS Logo"
              className="w-9 h-9 object-contain rounded-lg bg-slate-950 p-0.5 border border-slate-700 shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-white tracking-wider leading-none">
                LIBAS ADMIN
              </span>
              <span className="text-[9px] font-mono uppercase text-slate-400 tracking-widest mt-0.5">
                Haldwani Console
              </span>
            </div>
          </div>

          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
            v2.6
          </span>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Dashboard */}
          <NavLink to="/admin/dashboard" className={navItemClass} onClick={() => setIsMobileOpen(false)}>
            <LayoutDashboard size={17} className="text-emerald-400 shrink-0" />
            <span>Dashboard</span>
          </NavLink>

          {/* PRODUCTS GROUP */}
          <div className="pt-2">
            <button
              onClick={() => toggleSubMenu('products')}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <Package size={17} className="text-indigo-400" />
                <span>Products</span>
              </div>
              {openSubMenus.products ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {openSubMenus.products && (
              <div className="mt-1 space-y-0.5">
                <NavLink to="/admin/products" end className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>All Products</span>
                </NavLink>
                <NavLink to="/admin/products?action=add" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Add Product</span>
                  <span className="text-[9px] bg-slate-800 text-emerald-400 px-1.5 py-0.2 rounded font-mono">+New</span>
                </NavLink>
                <NavLink to="/admin/categories" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Categories (7)</span>
                </NavLink>
                <NavLink to="/admin/products?filter=low-stock" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Inventory / Stock</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* ORDERS GROUP */}
          <div className="pt-1">
            <button
              onClick={() => toggleSubMenu('orders')}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={17} className="text-amber-400" />
                <span>Orders</span>
              </div>
              {openSubMenus.orders ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {openSubMenus.orders && (
              <div className="mt-1 space-y-0.5">
                <NavLink to="/admin/orders" end className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>All Orders</span>
                </NavLink>
                <NavLink to="/admin/orders?status=Pending" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Pending</span>
                </NavLink>
                <NavLink to="/admin/orders?status=Processing" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Processing</span>
                </NavLink>
                <NavLink to="/admin/orders?status=Shipped" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Shipped</span>
                </NavLink>
                <NavLink to="/admin/orders?status=Delivered" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Delivered</span>
                </NavLink>
                <NavLink to="/admin/orders?status=Cancelled" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Cancelled</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Customers */}
          <NavLink to="/admin/customers" className={navItemClass} onClick={() => setIsMobileOpen(false)}>
            <Users size={17} className="text-cyan-400 shrink-0" />
            <span>Customers</span>
          </NavLink>

          {/* Coupons / Discounts */}
          <NavLink to="/admin/coupons" className={navItemClass} onClick={() => setIsMobileOpen(false)}>
            <Tag size={17} className="text-rose-400 shrink-0" />
            <span>Coupons / Discounts</span>
          </NavLink>

          {/* Reviews */}
          <NavLink to="/admin/reviews" className={navItemClass} onClick={() => setIsMobileOpen(false)}>
            <Star size={17} className="text-amber-400 shrink-0" />
            <span>Customer Reviews</span>
          </NavLink>

          {/* CONTENT GROUP */}
          <div className="pt-1">
            <button
              onClick={() => toggleSubMenu('content')}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <Layers size={17} className="text-purple-400" />
                <span>Content & CMS</span>
              </div>
              {openSubMenus.content ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {openSubMenus.content && (
              <div className="mt-1 space-y-0.5">
                <NavLink to="/admin/content" end className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Homepage & Hero</span>
                </NavLink>
                <NavLink to="/admin/content?tab=banners" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Promotional Banners</span>
                </NavLink>
                <NavLink to="/admin/content?tab=announcements" className={subNavItemClass} onClick={() => setIsMobileOpen(false)}>
                  <span>Announcements</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Store Settings */}
          <NavLink to="/admin/store-settings" className={navItemClass} onClick={() => setIsMobileOpen(false)}>
            <Store size={17} className="text-emerald-400 shrink-0" />
            <span>Store Information</span>
          </NavLink>

          {/* Analytics */}
          <NavLink to="/admin/analytics" className={navItemClass} onClick={() => setIsMobileOpen(false)}>
            <BarChart3 size={17} className="text-blue-400 shrink-0" />
            <span>Analytics</span>
          </NavLink>

          {/* Admin Settings */}
          <NavLink to="/admin/settings" className={navItemClass} onClick={() => setIsMobileOpen(false)}>
            <Settings size={17} className="text-slate-400 shrink-0" />
            <span>Admin Settings</span>
          </NavLink>
        </div>

        {/* User Footer & Public Store Link */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
          {/* Quick View Public Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-brandYellow" />
              <span>View Customer Store</span>
            </span>
            <ExternalLink size={13} />
          </a>

          {/* Admin profile & Logout */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={adminUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
                alt="Admin"
                className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
              />
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white truncate leading-tight">
                  {adminUser?.name || 'Store Manager'}
                </span>
                <span className="text-[10px] text-slate-500 truncate">
                  {adminUser?.email || 'admin@libas.in'}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
