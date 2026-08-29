import React, { useState } from 'react';
import { Plus, Tag, Trash2, Check, X, Calendar, Percent, IndianRupee } from 'lucide-react';
import adminDataService from '../services/adminDataService';
import Drawer from '../components/Drawer';
import ConfirmModal from '../components/ConfirmModal';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(() => adminDataService.getCoupons());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage', // percentage | fixed | free_shipping
    value: 10,
    minOrder: 999,
    maxDiscount: 500,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    usageLimit: 500,
    active: true,
  });

  const reloadData = () => {
    setCoupons(adminDataService.getCoupons());
  };

  const handleOpenAdd = () => {
    setFormData({
      code: '',
      type: 'percentage',
      value: 10,
      minOrder: 999,
      maxDiscount: 500,
      startDate: '2026-01-01',
      expiryDate: '2026-12-31',
      usageLimit: 500,
      active: true,
    });
    setIsDrawerOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    adminDataService.addCoupon(formData);
    reloadData();
    setIsDrawerOpen(false);
  };

  const handleToggle = (id) => {
    adminDataService.toggleCouponStatus(id);
    reloadData();
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      adminDataService.deleteCoupon(deleteTargetId);
      setDeleteTargetId(null);
      reloadData();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Promotions & Checkout Incentives</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">{coupons.length} Promo Codes</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Coupons & Discounts
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
        >
          <Plus size={16} />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Promo Code</th>
                <th className="px-5 py-3.5">Discount</th>
                <th className="px-5 py-3.5">Min Order</th>
                <th className="px-5 py-3.5">Max Cap</th>
                <th className="px-5 py-3.5">Usage</th>
                <th className="px-5 py-3.5">Validity</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-300">
                        {c.code}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-bold text-slate-900">
                    {c.type === 'percentage'
                      ? `${c.value}% OFF`
                      : c.type === 'fixed'
                      ? `₹${c.value} OFF`
                      : 'FREE SHIPPING'}
                  </td>

                  <td className="px-5 py-3.5 text-slate-700 font-medium">
                    ₹{c.minOrder}
                  </td>

                  <td className="px-5 py-3.5 text-slate-600">
                    ₹{c.maxDiscount}
                  </td>

                  <td className="px-5 py-3.5 text-slate-600">
                    <span className="font-bold text-slate-900">{c.usageCount || 0}</span> / {c.usageLimit} uses
                  </td>

                  <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px]">
                    {c.startDate} to {c.expiryDate}
                  </td>

                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleToggle(c.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        c.active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setDeleteTargetId(c.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete coupon"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE DRAWER */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create New Discount Code"
        subtitle="Configure discount rules and usage caps for customer checkouts"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="coupon-form"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
            >
              Publish Coupon
            </button>
          </>
        }
      >
        <form id="coupon-form" onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Coupon Code *
            </label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g. LIBAS25"
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono font-bold uppercase focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Discount Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Discount Value *
              </label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                placeholder="10"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-bold focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Minimum Cart Value (₹)
              </label>
              <input
                type="number"
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Maximum Discount Cap (₹)
              </label>
              <input
                type="number"
                value={formData.maxDiscount}
                onChange={(e) => setFormData({ ...formData, maxDiscount: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Maximum Usage Limit
            </label>
            <input
              type="number"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 1 })}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>
        </form>
      </Drawer>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Coupon Code?"
        message="This discount code will immediately become invalid at customer checkout."
        confirmText="Delete Coupon"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminCoupons;
