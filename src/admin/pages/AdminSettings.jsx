import React, { useState } from 'react';
import {
  Save,
  Check,
  Lock,
  Bell,
  Shield,
  User,
  CreditCard,
  Truck,
  FileText,
  Trash2,
  RotateCcw,
  AlertTriangle,
  QrCode,
  Smartphone,
  Banknote,
  MessageCircle,
  Eye,
  EyeOff,
  Upload,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import adminDataService, { initialPaymentSettings } from '../services/adminDataService';

const AdminSettings = () => {
  const { adminUser } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || 'Store Manager',
    email: adminUser?.email || 'admin@libas.in',
    role: 'Super Admin',
  });

  // Password Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    emailNewOrder: true,
    emailLowStock: true,
    emailNewReview: false,
    dailySummary: true,
  });

  // Payment Methods Configuration State
  const [paymentSettings, setPaymentSettings] = useState(() => adminDataService.getPaymentSettings());
  const [activePaymentCard, setActivePaymentCard] = useState('upi'); // 'upi' | 'cod' | 'card' | 'whatsapp'
  const [showSecretKey, setShowSecretKey] = useState(false);

  const handlePaymentChange = (methodKey, field, value) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        [field]: value,
      },
    }));
  };

  const handlePaymentToggle = (methodKey) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        enabled: !prev[methodKey]?.enabled,
      },
    }));
  };

  const handleQrUpload = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('QR code image size must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      handlePaymentChange('upi', 'qrImage', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    adminDataService.savePaymentSettings(paymentSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all demo orders, sales, and test customers to 0?')) {
      adminDataService.resetDemoData();
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        window.location.reload();
      }, 1500);
    }
  };

  const navItems = [
    { id: 'profile', label: 'Profile & Security', icon: User },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'shipping', label: 'Shipping & Delivery Rules', icon: Truck },
    { id: 'payment', label: 'Payment Gateway Integration', icon: CreditCard },
    { id: 'policies', label: 'Store Legal Policies', icon: FileText },
    { id: 'data', label: 'Data Reset & Maintenance', icon: Trash2 },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <span>System Configuration</span>
          <span>•</span>
          <span className="text-emerald-600 font-bold">Admin Console</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Admin Settings & Preferences
        </h1>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check size={16} className="text-emerald-600" />
          <span>Settings saved and updated successfully!</span>
        </div>
      )}

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation */}
        <div className="lg:col-span-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Content */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          {activeSection === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Administrator Profile</h3>
                <p className="text-slate-500">Manage your administrative credentials and security</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-xs">Change Password</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-lg transition-colors shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {activeSection === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Notification Alerts</h3>
                <p className="text-slate-500">Configure real-time automated alerts for store events</p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <strong className="block text-slate-900">New Order Alerts</strong>
                    <span className="text-slate-500">Receive instant email/SMS when a customer places an order</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailNewOrder}
                    onChange={(e) => setNotifications({ ...notifications, emailNewOrder: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <strong className="block text-slate-900">Low Stock Warning</strong>
                    <span className="text-slate-500">Alert when any streetwear SKU drops below 10 units</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailLowStock}
                    onChange={(e) => setNotifications({ ...notifications, emailLowStock: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <strong className="block text-slate-900">Daily Sales Summary</strong>
                    <span className="text-slate-500">Nightly digest of total revenue and pending shipments</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.dailySummary}
                    onChange={(e) => setNotifications({ ...notifications, dailySummary: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-lg transition-colors shadow-xs"
                >
                  Save Notification Rules
                </button>
              </div>
            </form>
          )}

          {activeSection === 'shipping' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Shipping & Delivery Configuration</h3>
                <p className="text-slate-500">Set threshold for free shipping and courier integration</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Free Shipping Threshold</span>
                  <span className="text-lg font-bold text-slate-900">Orders above ₹1,499</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Flat Standard Courier Fee</span>
                  <span className="text-lg font-bold text-slate-900">₹99</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <form onSubmit={handleSave} className="space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Payment Gateway & Checkout Methods</span>
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                      Live Customizer
                    </span>
                  </h3>
                  <p className="text-slate-500">
                    Enable, disable, and configure UPI IDs, QR codes, COD rules, and card gateways
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
                >
                  <Save size={14} />
                  <span>Save Payment Settings</span>
                </button>
              </div>

              {/* Payment Methods Grid */}
              <div className="space-y-4">
                {/* 1. UPI / QR Payments */}
                <div
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    activePaymentCard === 'upi'
                      ? 'border-indigo-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    onClick={() => setActivePaymentCard(activePaymentCard === 'upi' ? null : 'upi')}
                    className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs">UPI / QR Instant Payments</h4>
                          <span className="text-[10px] text-purple-700 bg-purple-50 font-bold px-2 py-0.5 rounded border border-purple-200">
                            GPay • PhonePe • Paytm
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          UPI ID: <span className="font-mono font-bold text-slate-800">{paymentSettings.upi?.upiId || 'Not Set'}</span> •{' '}
                          Payee: <span className="font-semibold text-slate-800">{paymentSettings.upi?.payeeName || 'LIBAS'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            paymentSettings.upi?.enabled
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {paymentSettings.upi?.enabled ? 'Active' : 'Disabled'}
                        </span>
                        <input
                          type="checkbox"
                          checked={paymentSettings.upi?.enabled}
                          onChange={() => handlePaymentToggle('upi')}
                          className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setActivePaymentCard(activePaymentCard === 'upi' ? null : 'upi')}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        {activePaymentCard === 'upi' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {activePaymentCard === 'upi' && (
                    <div className="p-5 bg-white border-t border-slate-200 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Store UPI ID (VPA) *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentSettings.upi?.upiId || ''}
                            onChange={(e) => handlePaymentChange('upi', 'upiId', e.target.value)}
                            placeholder="e.g. 7900455958-2@axl or libas@upi"
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            Payments from customers will be credited directly to this UPI address.
                          </p>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Payee / Merchant Business Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentSettings.upi?.payeeName || ''}
                            onChange={(e) => handlePaymentChange('upi', 'payeeName', e.target.value)}
                            placeholder="LIBAS Fashion Haldwani"
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            Name displayed on customer's banking app when transferring money.
                          </p>
                        </div>
                      </div>

                      {/* Custom QR Code Image Upload */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Custom Store QR Code (Optional)
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                          {paymentSettings.upi?.qrImage ? (
                            <div className="relative">
                              <img
                                src={paymentSettings.upi.qrImage}
                                alt="Custom QR Code"
                                className="w-20 h-20 object-contain rounded-lg border border-slate-300 bg-white p-1"
                              />
                              <button
                                type="button"
                                onClick={() => handlePaymentChange('upi', 'qrImage', '')}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-rose-700 shadow-xs"
                                title="Remove QR code"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 bg-white">
                              <QrCode size={24} />
                              <span className="text-[9px] mt-1">Auto-Gen QR</span>
                            </div>
                          )}

                          <div className="space-y-1.5 flex-1">
                            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs transition-colors">
                              <Upload size={13} />
                              <span>Upload Official Store QR Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleQrUpload(e.target.files[0])}
                              />
                            </label>
                            <p className="text-[10px] text-slate-400">
                              Leave empty to use automatic live dynamic QR codes generated from your UPI ID & order amounts.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Customer Payment Instructions
                        </label>
                        <textarea
                          rows={2}
                          value={paymentSettings.upi?.instructions || ''}
                          onChange={(e) => handlePaymentChange('upi', 'instructions', e.target.value)}
                          placeholder="Instructions shown to customers at checkout..."
                          className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Cash on Delivery (COD) */}
                <div
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    activePaymentCard === 'cod'
                      ? 'border-indigo-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    onClick={() => setActivePaymentCard(activePaymentCard === 'cod' ? null : 'cod')}
                    className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Banknote size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs">Cash on Delivery (COD)</h4>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-200">
                            Doorstep & Store Pickup
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          Fee: <span className="font-semibold text-slate-800">₹{paymentSettings.cod?.fee || 0}</span> •{' '}
                          Max Order Limit: <span className="font-semibold text-slate-800">₹{(paymentSettings.cod?.maxOrder || 25000).toLocaleString('en-IN')}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            paymentSettings.cod?.enabled
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {paymentSettings.cod?.enabled ? 'Active' : 'Disabled'}
                        </span>
                        <input
                          type="checkbox"
                          checked={paymentSettings.cod?.enabled}
                          onChange={() => handlePaymentToggle('cod')}
                          className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setActivePaymentCard(activePaymentCard === 'cod' ? null : 'cod')}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        {activePaymentCard === 'cod' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {activePaymentCard === 'cod' && (
                    <div className="p-5 bg-white border-t border-slate-200 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Additional COD Handling Fee (₹)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={paymentSettings.cod?.fee || 0}
                            onChange={(e) => handlePaymentChange('cod', 'fee', parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Set to 0 for Free COD service.</p>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Minimum Order Value (₹)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={paymentSettings.cod?.minOrder || 0}
                            onChange={(e) => handlePaymentChange('cod', 'minOrder', parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Maximum Order Value (₹)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={paymentSettings.cod?.maxOrder || 25000}
                            onChange={(e) => handlePaymentChange('cod', 'maxOrder', parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          COD Verification Notes & Policy
                        </label>
                        <textarea
                          rows={2}
                          value={paymentSettings.cod?.instructions || ''}
                          onChange={(e) => handlePaymentChange('cod', 'instructions', e.target.value)}
                          placeholder="e.g. Phone verification call will be made prior to dispatching high-value items."
                          className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Cards & Netbanking Payment Gateway */}
                <div
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    activePaymentCard === 'card'
                      ? 'border-indigo-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    onClick={() => setActivePaymentCard(activePaymentCard === 'card' ? null : 'card')}
                    className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs">Credit / Debit Cards & Netbanking Gateway</h4>
                          <span className="text-[10px] text-blue-700 bg-blue-50 font-bold px-2 py-0.5 rounded border border-blue-200">
                            {paymentSettings.card?.provider || 'Razorpay'}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          Provider: <span className="font-semibold text-slate-800">{paymentSettings.card?.provider || 'Razorpay'}</span> •{' '}
                          Mode: <span className="font-bold text-slate-800">{paymentSettings.card?.liveMode ? '🟢 Live Production' : '🟡 Test Sandbox'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            paymentSettings.card?.enabled
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {paymentSettings.card?.enabled ? 'Active' : 'Disabled'}
                        </span>
                        <input
                          type="checkbox"
                          checked={paymentSettings.card?.enabled}
                          onChange={() => handlePaymentToggle('card')}
                          className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setActivePaymentCard(activePaymentCard === 'card' ? null : 'card')}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        {activePaymentCard === 'card' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {activePaymentCard === 'card' && (
                    <div className="p-5 bg-white border-t border-slate-200 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Payment Gateway Provider
                          </label>
                          <select
                            value={paymentSettings.card?.provider || 'Razorpay'}
                            onChange={(e) => handlePaymentChange('card', 'provider', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500"
                          >
                            <option value="Razorpay">Razorpay (India Standard)</option>
                            <option value="PhonePe PG">PhonePe Payment Gateway</option>
                            <option value="PayU">PayU Payments</option>
                            <option value="Cashfree">Cashfree Payments</option>
                            <option value="Stripe">Stripe (International Cards)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Environment Mode
                          </label>
                          <div className="flex items-center gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="liveMode"
                                checked={paymentSettings.card?.liveMode === true}
                                onChange={() => handlePaymentChange('card', 'liveMode', true)}
                                className="accent-emerald-600"
                              />
                              <span className="font-bold text-slate-800">🟢 Live Production</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="liveMode"
                                checked={paymentSettings.card?.liveMode === false}
                                onChange={() => handlePaymentChange('card', 'liveMode', false)}
                                className="accent-amber-600"
                              />
                              <span className="font-semibold text-slate-600">🟡 Test / Sandbox</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Merchant Key ID / Public Key *
                          </label>
                          <input
                            type="text"
                            value={paymentSettings.card?.keyId || ''}
                            onChange={(e) => handlePaymentChange('card', 'keyId', e.target.value)}
                            placeholder="rzp_live_..."
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Merchant Secret Key
                          </label>
                          <div className="relative">
                            <input
                              type={showSecretKey ? 'text' : 'password'}
                              value={paymentSettings.card?.secretKey || ''}
                              onChange={(e) => handlePaymentChange('card', 'secretKey', e.target.value)}
                              placeholder="Enter secret API key"
                              className="w-full bg-slate-50 border border-slate-200 p-2.5 pr-9 rounded-lg font-mono text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSecretKey(!showSecretKey)}
                              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                            >
                              {showSecretKey ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. WhatsApp Direct Order Option */}
                <div
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    activePaymentCard === 'whatsapp'
                      ? 'border-indigo-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    onClick={() => setActivePaymentCard(activePaymentCard === 'whatsapp' ? null : 'whatsapp')}
                    className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <MessageCircle size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs">WhatsApp Direct Order & Assistance</h4>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-200">
                            Instant Concierge
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          Contact Phone: <span className="font-mono font-bold text-slate-800">{paymentSettings.whatsapp?.phone || '917900455958'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            paymentSettings.whatsapp?.enabled
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {paymentSettings.whatsapp?.enabled ? 'Active' : 'Disabled'}
                        </span>
                        <input
                          type="checkbox"
                          checked={paymentSettings.whatsapp?.enabled}
                          onChange={() => handlePaymentToggle('whatsapp')}
                          className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setActivePaymentCard(activePaymentCard === 'whatsapp' ? null : 'whatsapp')}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        {activePaymentCard === 'whatsapp' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {activePaymentCard === 'whatsapp' && (
                    <div className="p-5 bg-white border-t border-slate-200 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Store WhatsApp Number (with Country Code) *
                          </label>
                          <input
                            type="text"
                            value={paymentSettings.whatsapp?.phone || ''}
                            onChange={(e) => handlePaymentChange('whatsapp', 'phone', e.target.value)}
                            placeholder="917900455958"
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Helpdesk Notice
                          </label>
                          <input
                            type="text"
                            value={paymentSettings.whatsapp?.instructions || ''}
                            onChange={(e) => handlePaymentChange('whatsapp', 'instructions', e.target.value)}
                            placeholder="Chat directly with our staff in Haldwani for size advice & orders."
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-xs flex items-center gap-2"
                >
                  <Save size={15} />
                  <span>Save All Payment Configuration</span>
                </button>
              </div>
            </form>
          )}

          {activeSection === 'policies' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Legal & Store Policies</h3>
                <p className="text-slate-500">Review terms published to the customer storefront</p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Store policies are active for <strong>LIBAS Haldwani</strong> covering 7-Day Returns & Exchanges, Privacy Protections, and Uttarakhand jurisdiction terms.
              </p>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Data Management & Reset</h3>
                <p className="text-slate-500">Reset test orders, sales stats, and customer accounts to 0</p>
              </div>

              {resetSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl font-bold flex items-center gap-2">
                  <Check size={16} />
                  <span>All demo data and test orders have been wiped clean (Reset to 0). Reloading...</span>
                </div>
              )}

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold">
                  <AlertTriangle size={16} />
                  <span>Wipe All Demo & Test Data</span>
                </div>
                <p className="text-rose-700 leading-relaxed">
                  This action resets all demo sales, fake revenue figures, demo order entries, and test customer profiles to <strong>0</strong>. Your product catalog and categories will remain safe.
                </p>
                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-2 transition-colors shadow-xs"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Sales & Orders Data to 0</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
