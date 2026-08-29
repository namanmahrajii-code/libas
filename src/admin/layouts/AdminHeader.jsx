import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Plus,
  ExternalLink,
  ChevronDown,
  User,
  Shield,
  LogOut,
  Package,
  ShoppingCart,
  Tag,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminHeader = ({ setIsMobileOpen }) => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  const notifications = [
    {
      id: 'notif-1',
      title: 'New Order Received',
      desc: 'Sneha Negi placed order #84920 for ₹2,249',
      time: '15 mins ago',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Low Stock Alert',
      desc: 'Master Angel Raglan (L) has only 4 units remaining',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'New Store Review',
      desc: 'Priyanshu Bisht left a 5-star Google review',
      time: '3 hours ago',
      unread: false,
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/admin/products?search=${encodeURIComponent(quickSearch.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile menu toggle + Global Quick Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Global Admin Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Search products, orders, SKU, customers..."
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
          />
        </form>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Product Button */}
        <Link
          to="/admin/products?action=add"
          className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs"
        >
          <Plus size={15} />
          <span>Add Product</span>
        </Link>

        {/* View Store button */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
          title="Open live customer store in a new tab"
        >
          <ExternalLink size={13} />
          <span>Live Store</span>
        </a>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-up">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs hover:bg-slate-50 transition-colors ${
                      n.unread ? 'bg-emerald-50/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 font-semibold">{n.title}</strong>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <Link
                  to="/admin/orders"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-bold text-indigo-600 hover:underline"
                >
                  View All Activity
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <img
              src={adminUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
              alt="Admin"
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs font-bold text-slate-700 hidden lg:inline">
              {adminUser?.name || 'Manager'}
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-scale-up text-xs">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="font-bold text-slate-900">{adminUser?.name || 'Store Manager'}</p>
                <p className="text-[11px] text-slate-500 truncate">{adminUser?.email}</p>
              </div>

              <Link
                to="/admin/store-settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Shield size={14} className="text-slate-400" />
                <span>Store Information</span>
              </Link>

              <Link
                to="/admin/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <User size={14} className="text-slate-400" />
                <span>Account Settings</span>
              </Link>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
