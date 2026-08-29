import React, { useState, useMemo } from 'react';
import { Search, Mail, Phone, MapPin, ShoppingBag, IndianRupee, Calendar, ExternalLink, User } from 'lucide-react';
import adminDataService from '../services/adminDataService';
import StatusBadge from '../components/StatusBadge';
import Drawer from '../components/Drawer';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(() => adminDataService.getCustomers());
  const [orders] = useState(() => adminDataService.getOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchEmail = c.email.toLowerCase().includes(q);
        const matchCity = (c.city || '').toLowerCase().includes(q);
        const matchPhone = (c.phone || '').includes(q);
        if (!matchName && !matchEmail && !matchCity && !matchPhone) return false;
      }
      return true;
    });
  }, [customers, searchQuery]);

  // Customer order history
  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(
      (o) => o.customer.email === selectedCustomer.email || o.customer.name === selectedCustomer.name
    );
  }, [selectedCustomer, orders]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Customer Intelligence</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">{customers.length} Verified Buyers</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Directory
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, email, phone, city..."
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Email & Phone</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Total Orders</th>
                <th className="px-5 py-3.5">Total Spent</th>
                <th className="px-5 py-3.5">Last Order</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-500">
                    No customers found matching active search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                          {c.name.charAt(0)}
                        </div>
                        <span>{c.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="text-slate-900">{c.email}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{c.phone}</div>
                    </td>

                    <td className="px-5 py-3.5 text-slate-600 font-medium">
                      {c.city}, {c.state}
                    </td>

                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      {c.totalOrders} {c.totalOrders === 1 ? 'order' : 'orders'}
                    </td>

                    <td className="px-5 py-3.5 font-bold text-emerald-700">
                      ₹{c.totalSpent.toLocaleString()}
                    </td>

                    <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px]">
                      {c.lastOrderDate}
                    </td>

                    <td className="px-5 py-3.5">
                      <StatusBadge status={c.status} />
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-md transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER PROFILE DRAWER */}
      <Drawer
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer?.name || 'Customer Profile'}
        subtitle={`Member since ${selectedCustomer?.createdAt || '2026'}`}
        width="max-w-xl"
        footer={
          <button
            type="button"
            onClick={() => setSelectedCustomer(null)}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 bg-slate-100 rounded-lg"
          >
            Close Profile
          </button>
        }
      >
        {selectedCustomer && (
          <div className="space-y-6 text-xs">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Spent</span>
                <span className="text-xl font-bold text-emerald-700 mt-1 block">
                  ₹{selectedCustomer.totalSpent.toLocaleString()}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Orders</span>
                <span className="text-xl font-bold text-slate-900 mt-1 block">
                  {selectedCustomer.totalOrders}
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5">
                Contact & Location
              </h4>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={14} className="text-slate-400" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={14} className="text-slate-400" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={14} className="text-slate-400" />
                <span>{selectedCustomer.city}, {selectedCustomer.state}</span>
              </div>
            </div>

            {/* Order History */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                Order History ({customerOrders.length})
              </h4>

              {customerOrders.length === 0 ? (
                <p className="text-slate-500 italic py-4 text-center">No recorded orders for this profile.</p>
              ) : (
                <div className="space-y-2">
                  {customerOrders.map((o) => (
                    <div key={o.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-900 block">#{o.orderNumber || o.id}</span>
                        <span className="text-[11px] text-slate-500">{o.date} • {o.items.length} items</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 block">₹{o.total.toLocaleString()}</span>
                        <StatusBadge status={o.status} className="mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AdminCustomers;
