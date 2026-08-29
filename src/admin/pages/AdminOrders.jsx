import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  RefreshCw,
  Printer,
  Calendar,
  IndianRupee,
  MapPin,
  Mail,
  Phone,
  Package,
} from 'lucide-react';
import adminDataService from '../services/adminDataService';
import StatusBadge from '../components/StatusBadge';
import Drawer from '../components/Drawer';

const ORDER_STATUSES = [
  'All',
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Refunded',
];

const AdminOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'All';
  const initialOrderId = searchParams.get('orderId');

  const [orders, setOrders] = useState(() => adminDataService.getOrders());
  const [selectedStatusTab, setSelectedStatusTab] = useState(initialStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status update form inside Drawer
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const reloadData = () => {
    const fresh = adminDataService.getOrders();
    setOrders(fresh);
    if (selectedOrder) {
      const updated = fresh.find((o) => o.id === selectedOrder.id);
      if (updated) setSelectedOrder(updated);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      const target = orders.find((o) => o.id === initialOrderId);
      if (target) {
        handleOpenOrder(target);
      }
    }
  }, [initialOrderId, orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Status Tab
      if (selectedStatusTab !== 'All' && o.status !== selectedStatusTab) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q) || (o.orderNumber && o.orderNumber.includes(q));
        const matchCust = o.customer.name.toLowerCase().includes(q) || o.customer.email.toLowerCase().includes(q) || (o.customer.phone && o.customer.phone.includes(q));
        if (!matchId && !matchCust) return false;
      }

      return true;
    });
  }, [orders, selectedStatusTab, searchQuery]);

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusNote('');
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!selectedOrder || !newStatus) return;

    adminDataService.updateOrderStatus(selectedOrder.id, newStatus, statusNote);
    reloadData();
    setStatusNote('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Fulfillment & Dispatch</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">{orders.length} Total Orders</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Orders
          </h1>
        </div>

        <button
          onClick={reloadData}
          className="p-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold self-start sm:self-auto"
        >
          <RefreshCw size={14} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {ORDER_STATUSES.map((status) => {
            const count = status === 'All' ? orders.length : orders.filter((o) => o.status === status).length;
            const isActive = selectedStatusTab === status;
            return (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatusTab(status);
                  if (status === 'All') searchParams.delete('status');
                  else searchParams.set('status', status);
                  setSearchParams(searchParams);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search inside orders */}
        <div className="relative pt-2 border-t border-slate-100">
          <Search size={16} className="absolute left-3 top-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, customer name, email, phone number..."
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Items</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-500">
                    No orders found matching active filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                      #{o.orderNumber || o.id}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900">{o.customer.name}</div>
                      <div className="text-[11px] text-slate-400">{o.customer.phone || o.customer.email}</div>
                    </td>

                    <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px]">
                      {o.date}
                    </td>

                    <td className="px-5 py-3.5 text-slate-700 font-medium">
                      {o.items.length} {o.items.length === 1 ? 'item' : 'items'}
                    </td>

                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      ₹{o.total.toLocaleString()}
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {o.paymentMethod || 'Prepaid'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <StatusBadge status={o.status} />
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleOpenOrder(o)}
                        className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED ORDER DRAWER */}
      <Drawer
        isOpen={!!selectedOrder}
        onClose={() => {
          setSelectedOrder(null);
          searchParams.delete('orderId');
          setSearchParams(searchParams);
        }}
        title={`Order #${selectedOrder?.orderNumber || selectedOrder?.id}`}
        subtitle={`Placed on ${selectedOrder?.date} • Payment: ${selectedOrder?.paymentStatus}`}
        width="max-w-2xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-slate-900">
              Total Amount: ₹{selectedOrder?.total.toLocaleString()}
            </span>
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 bg-slate-100 rounded-lg"
            >
              Close
            </button>
          </div>
        }
      >
        {selectedOrder && (
          <div className="space-y-6 text-xs">
            {/* Status Quick Updater Banner */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Update Order Status
                </span>
                <StatusBadge status={selectedOrder.status} />
              </div>

              <form onSubmit={handleUpdateStatus} className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      New Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full bg-white border border-slate-300 p-2 rounded-lg font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Internal Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      placeholder="e.g. Courier tracking AWB #129381"
                      className="w-full bg-white border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg uppercase tracking-wider transition-colors shadow-xs"
                >
                  Update & Record Status Change
                </button>
              </form>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-500" />
                  <span>Customer Profile</span>
                </h4>
                <p className="font-bold text-slate-900">{selectedOrder.customer.name}</p>
                <p className="text-slate-600">{selectedOrder.customer.email}</p>
                <p className="text-slate-600">{selectedOrder.customer.phone || 'No phone provided'}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-500" />
                  <span>Delivery Address</span>
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  {selectedOrder.customer.address || 'Charayal Chauraha, Haldwani'}
                </p>
                <p className="text-slate-500 font-semibold">
                  Payment Method: <span className="text-slate-900">{selectedOrder.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Ordered Products Items */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                Ordered Items ({selectedOrder.items.length})
              </h4>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-contain bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-slate-900">{item.title}</h5>
                        <p className="text-[11px] text-slate-500">
                          Size: <strong className="text-slate-800">{item.size}</strong> • Qty: {item.quantity} • Color: {item.color || 'Standard'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        ₹{item.price} each
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({selectedOrder.couponCode}):</span>
                  <span>-₹{selectedOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee:</span>
                <span>{selectedOrder.shipping === 0 ? 'FREE' : `₹${selectedOrder.shipping}`}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span>₹{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Order Timeline History */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2 flex items-center gap-2">
                <Clock size={14} className="text-slate-500" />
                <span>Order Timeline</span>
              </h4>

              <div className="space-y-3 pl-2">
                {selectedOrder.timeline?.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-50 shrink-0 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 font-bold">{step.status}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AdminOrders;
