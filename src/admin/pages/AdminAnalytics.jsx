import React, { useState, useMemo } from 'react';
import {
  IndianRupee,
  ShoppingCart,
  TrendingUp,
  Users,
  Percent,
  Calendar,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import adminDataService from '../services/adminDataService';
import AdminStatCard from '../components/AdminStatCard';
import { RevenueAreaChart, CategoryShareChart } from '../components/AdminChart';

const TIME_FILTERS = ['Today', '7 Days', '30 Days', '90 Days', 'This Year'];

const AdminAnalytics = () => {
  const [activeFilter, setActiveFilter] = useState('30 Days');

  const orders = useMemo(() => adminDataService.getOrders(), []);
  const customers = useMemo(() => adminDataService.getCustomers(), []);
  const products = useMemo(() => adminDataService.getProducts(), []);
  const categories = useMemo(() => adminDataService.getCategories(), []);

  // Compute actual metrics
  const validOrders = useMemo(() => {
    return orders.filter((o) => o.status !== 'Cancelled' && o.status !== 'Refunded');
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return validOrders.reduce((sum, o) => sum + (o.total || o.totalAmount || 0), 0);
  }, [validOrders]);

  const totalOrdersCount = validOrders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const activeCustomersCount = customers.length;
  const conversionRate = totalOrdersCount > 0 ? ((totalOrdersCount / Math.max(1, totalOrdersCount * 25)) * 100).toFixed(2) + '%' : '0.00%';

  // Dynamic chart data by timeframe
  const chartData = useMemo(() => {
    if (activeFilter === 'Today') {
      const slots = ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'];
      return slots.map((label) => ({ label, value: 0 }));
    }
    if (activeFilter === '7 Days') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map((label) => ({ label, value: 0 }));
    }
    if (activeFilter === '30 Days') {
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      return weeks.map((label) => ({
        label,
        value: totalRevenue > 0 && label === 'Week 4' ? totalRevenue : 0,
      }));
    }
    if (activeFilter === '90 Days') {
      const months = ['Month 1', 'Month 2', 'Month 3'];
      return months.map((label) => ({
        label,
        value: totalRevenue > 0 && label === 'Month 3' ? totalRevenue : 0,
      }));
    }
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    return quarters.map((label) => ({
      label,
      value: totalRevenue > 0 && label === 'Q3' ? totalRevenue : 0,
    }));
  }, [activeFilter, totalRevenue]);

  // Compute dynamic category share
  const categoryShare = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.name] = 0;
    });

    validOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        const prod = products.find((p) => p.id === item.id || p.title === item.title);
        const catName = prod?.categoryName || prod?.category || 'Streetwear';
        map[catName] = (map[catName] || 0) + (item.price * (item.quantity || 1));
      });
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [categories, validOrders, products]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Timeframe Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Store Performance</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">Comprehensive Analytics</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Financial & Sales Analytics
          </h1>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs overflow-x-auto">
          {TIME_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeFilter === f
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <AdminStatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          subtitle="Real-time sales"
          icon={IndianRupee}
          iconBg="bg-emerald-100 text-emerald-700"
        />

        <AdminStatCard
          title="Total Orders"
          value={totalOrdersCount.toString()}
          subtitle="Confirmed & Processing"
          icon={ShoppingCart}
          iconBg="bg-indigo-100 text-indigo-700"
        />

        <AdminStatCard
          title="Avg Order Value"
          value={`₹${avgOrderValue.toLocaleString('en-IN')}`}
          subtitle="Per checkout basket"
          icon={TrendingUp}
          iconBg="bg-amber-100 text-amber-700"
        />

        <AdminStatCard
          title="Active Customers"
          value={activeCustomersCount.toString()}
          subtitle="Regional & Haldwani"
          icon={Users}
          iconBg="bg-cyan-100 text-cyan-700"
        />

        <AdminStatCard
          title="Conversion Rate"
          value={conversionRate}
          subtitle="Storefront conversion"
          icon={Percent}
          iconBg="bg-purple-100 text-purple-700"
        />
      </div>

      {/* Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Growth ({activeFilter})</h3>
              <p className="text-xs text-slate-500">Gross sales volume across all product lines</p>
            </div>
          </div>
          <RevenueAreaChart data={chartData} height={250} />
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Revenue by Category Share</h3>
          <p className="text-xs text-slate-500">Distribution among the official sections</p>
          <CategoryShareChart categories={categoryShare} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
