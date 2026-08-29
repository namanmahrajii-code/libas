import React from 'react';

const STATUS_CONFIGS = {
  // Product statuses
  Active: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Draft: { bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' },
  'Out of Stock': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  Archived: { bg: 'bg-zinc-100 text-zinc-600 border-zinc-300', dot: 'bg-zinc-400' },

  // Order statuses
  Pending: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  Confirmed: { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  Processing: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
  Shipped: { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  Delivered: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Cancelled: { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  Refunded: { bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-500' },

  // Review & general statuses
  Approved: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Hidden: { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
  Paid: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'Pending COD': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  VIP: { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
};

const StatusBadge = ({ status, className = '' }) => {
  const config = STATUS_CONFIGS[status] || {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${config.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
