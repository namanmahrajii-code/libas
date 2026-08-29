import React, { useState } from 'react';
import { Star, CheckCircle, EyeOff, Trash2, MessageSquare, RefreshCw, ThumbsUp } from 'lucide-react';
import adminDataService from '../services/adminDataService';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';

const AdminReviews = () => {
  const [reviews, setReviews] = useState(() => adminDataService.getReviews());
  const [selectedFilter, setSelectedFilter] = useState('All'); // All | Approved | Hidden
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const reloadData = () => {
    setReviews(adminDataService.getReviews());
  };

  const handleStatusChange = (id, newStatus) => {
    adminDataService.updateReviewStatus(id, newStatus);
    reloadData();
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      adminDataService.deleteReview(deleteTargetId);
      setDeleteTargetId(null);
      reloadData();
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'All') return true;
    return r.status === selectedFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Customer Feedback & Social Proof</span>
            <span>•</span>
            <span className="text-amber-500 font-bold">★ 4.6 Google Rating (19 Reviews)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews & Ratings
          </h1>
        </div>

        <button
          onClick={reloadData}
          className="p-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold self-start sm:self-auto"
        >
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
        {['All', 'Approved', 'Hidden'].map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedFilter === f
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {f} ({f === 'All' ? reviews.length : reviews.filter((r) => r.status === f).length})
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
            No reviews found matching current filter.
          </div>
        ) : (
          filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {r.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{r.customerName}</h4>
                      <p className="text-[11px] text-slate-400">{r.city || 'Haldwani, Uttarakhand'}</p>
                    </div>
                  </div>

                  <StatusBadge status={r.status} />
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < r.rating ? 'currentColor' : 'none'}
                      className={i < r.rating ? 'text-amber-400' : 'text-slate-200'}
                    />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1.5">
                    {r.rating}.0
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                  "{r.comment}"
                </p>

                <div className="text-[11px] text-slate-500 font-medium">
                  Reviewed: <strong className="text-slate-800">{r.productName}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[10px] font-mono">{r.date}</span>

                <div className="flex items-center gap-2">
                  {r.status !== 'Approved' ? (
                    <button
                      onClick={() => handleStatusChange(r.id, 'Approved')}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded text-[11px] transition-colors flex items-center gap-1"
                    >
                      <CheckCircle size={12} />
                      <span>Approve</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(r.id, 'Hidden')}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded text-[11px] transition-colors flex items-center gap-1"
                    >
                      <EyeOff size={12} />
                      <span>Hide</span>
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteTargetId(r.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    title="Delete review"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Customer Review?"
        message="This review will be permanently deleted from the store database."
        confirmText="Delete Review"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminReviews;
