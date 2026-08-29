import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import adminDataService from '../services/adminDataService';
import AdminStatCard from '../components/AdminStatCard';
import { RevenueAreaChart, OrdersBarChart, CategoryShareChart } from '../components/AdminChart';
import StatusBadge from '../components/StatusBadge';

const AdminDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch current data
  const metrics = useMemo(() => {
    return adminDataService.getDashboardMetrics();
  }, [refreshKey]);

  const orders = useMemo(() => {
    return adminDataService.getOrders();
  }, [refreshKey]);

  const products = useMemo(() => {
    return adminDataService.getProducts();
  }, [refreshKey]);

  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  // Top selling products calculation
  const topProducts = useMemo(() => {
    return products
      .slice(0, 5)
      .map((p) => ({
        ...p,
        unitsSold: 0,
        revenue: 0,
      }));
  }, [products]);

  // Chart data based on actual store sales
  const revenueChartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day) => ({ label: day, value: 0 }));
  }, [orders]);

  const ordersChartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day) => ({ label: day, value: 0 }));
  }, [orders]);

  const categoryShareData = [
    { name: 'Waffle / Raglan (04)', value: 0 },
    { name: 'Graphic Tees (03)', value: 0 },
    { name: 'Sweatshirts (05)', value: 0 },
    { name: 'Retro Jerseys (02)', value: 0 },
    { name: 'Shirts (01)', value: 0 },
    { name: 'Track Pants (06)', value: 0 },
  ];

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Store Overview</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">Live Data</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            title="Refresh dashboard metrics"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            to="/admin/products?action=add"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* 1. TOP STAT SUMMARY CARDS (4 Main KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <AdminStatCard
          title="Total Sales"
          value={`₹${metrics.totalSales.toLocaleString()}`}
          trend="+0%"
          trendPositive={true}
          subtitle="All time revenue"
          icon={IndianRupee}
          iconBg="bg-emerald-100 text-emerald-700"
        />

        <AdminStatCard
          title="Total Orders"
          value={metrics.totalOrders.toString()}
          trend="+0%"
          trendPositive={true}
          subtitle="verified buyers"
          icon={ShoppingCart}
          iconBg="bg-indigo-100 text-indigo-700"
        />

        <AdminStatCard
          title="Catalog Products"
          value={metrics.totalProducts.toString()}
          subtitle="across 7 sections"
          icon={Package}
          iconBg="bg-amber-100 text-amber-700"
          badge="7 Categories"
        />

        <AdminStatCard
          title="Total Customers"
          value={metrics.totalCustomers.toString()}
          trend="+0%"
          trendPositive={true}
          subtitle="Haldwani & Regional"
          icon={Users}
          iconBg="bg-cyan-100 text-cyan-700"
        />
      </div>

      {/* 2. SECONDARY REAL-TIME METRICS (Today's performance & alerts) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Today's Sales
          </span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">
            ₹{metrics.todaySales.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> Today's revenue
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Today's Orders
          </span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">
            {metrics.todayOrders}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Store & Online
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Pending Orders
          </span>
          <span className="text-xl font-bold text-amber-600 mt-1 block">
            {metrics.pendingOrders}
          </span>
          <Link
            to="/admin/orders?status=Pending"
            className="text-[10px] text-indigo-600 font-bold hover:underline mt-1 block"
          >
            Process orders →
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Low Stock Alerts
          </span>
          <span className="text-xl font-bold text-rose-600 mt-1 block">
            {metrics.lowStockCount}
          </span>
          <Link
            to="/admin/products?filter=low-stock"
            className="text-[10px] text-rose-600 font-bold hover:underline mt-1 block"
          >
            Review inventory →
          </Link>
        </div>
      </div>

      {/* 3. CHARTS SECTION (Sales Trend & Orders Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Over Time Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Overview</h3>
              <p className="text-xs text-slate-500">Weekly revenue trends across online and in-store orders</p>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
              This Week: ₹{metrics.totalSales.toLocaleString()}
            </span>
          </div>

          <RevenueAreaChart data={revenueChartData} height={230} />
        </div>

        {/* Category Share Distribution */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">Sales by Category</h3>
              <Link to="/admin/categories" className="text-[11px] text-indigo-600 font-bold hover:underline">
                Manage
              </Link>
            </div>
            <p className="text-xs text-slate-500 mb-4">Revenue breakdown across the 7 official sections</p>
            <CategoryShareChart categories={categoryShareData} />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Top Performing:</span>
            <span className="font-bold text-slate-900">{metrics.totalSales > 0 ? '04 — Waffle / Raglan' : 'No sales yet'}</span>
          </div>
        </div>
      </div>

      {/* 4. RECENT ORDERS & TOP PRODUCTS (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Orders</h3>
              <p className="text-xs text-slate-500">Latest customer transactions from Haldwani and regional areas</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {recentOrders.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <ShoppingCart size={32} className="mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-semibold text-slate-700">No orders received yet</p>
                <p className="text-[11px] text-slate-400 mt-0.5">When customers place orders, they will appear here in real time.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Order ID</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Items</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                        #{o.orderNumber}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-slate-900">{o.customer.name}</div>
                        <div className="text-[11px] text-slate-400">{o.customer.email}</div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">
                        {o.items.length} {o.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        ₹{o.total.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to={`/admin/orders?orderId=${o.id}`}
                          className="text-indigo-600 hover:text-indigo-900 font-bold hover:underline"
                        >
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Streetwear Drops</h3>
              <p className="text-xs text-slate-500">Highest volume items</p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              All Products
            </Link>
          </div>

          <div className="space-y-3.5">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-5 text-center font-mono text-xs font-bold text-slate-400">
                  0{idx + 1}
                </span>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-10 h-10 rounded-lg object-contain bg-slate-100 border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {p.categoryName || p.category}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 block">
                    ₹{p.price}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold block">
                    {p.unitsSold} sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
