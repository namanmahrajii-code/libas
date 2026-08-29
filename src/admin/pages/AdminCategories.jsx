import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Check, X, Layers, Sparkles } from 'lucide-react';
import adminDataService from '../services/adminDataService';
import Drawer from '../components/Drawer';
import ConfirmModal from '../components/ConfirmModal';

const AdminCategories = () => {
  const [categories, setCategories] = useState(() => adminDataService.getCategories());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    sectionNumber: '08',
    description: '',
    badge: '',
    active: true,
  });

  const reloadData = () => {
    setCategories(adminDataService.getCategories());
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    const nextNum = (categories.length + 1).toString().padStart(2, '0');
    setFormData({
      id: '',
      name: '',
      sectionNumber: nextNum,
      description: '',
      badge: '',
      active: true,
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (cat, idx) => {
    setEditingCategory(cat);
    setFormData({
      id: cat.id,
      name: cat.name,
      sectionNumber: cat.sectionNumber || (idx + 1).toString().padStart(2, '0'),
      description: cat.description || '',
      badge: cat.badge || '',
      active: cat.active !== undefined ? cat.active : true,
    });
    setIsDrawerOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCategory) {
      adminDataService.updateCategory(editingCategory.id, formData);
    } else {
      adminDataService.addCategory(formData);
    }
    reloadData();
    setIsDrawerOpen(false);
  };

  const handleToggleActive = (cat) => {
    adminDataService.updateCategory(cat.id, { active: !cat.active });
    reloadData();
  };

  const handleMove = (index, direction) => {
    const nextList = [...categories];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= nextList.length) return;
    const temp = nextList[index];
    nextList[index] = nextList[targetIdx];
    nextList[targetIdx] = temp;
    adminDataService.saveCategories(nextList);
    reloadData();
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      adminDataService.deleteCategory(deleteTargetId);
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
            <span>Store Navigation & Catalog Sections</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">{categories.length} Sections</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Categories & Numbered Sections
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
        >
          <Plus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Category List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <span>Official LIBAS Collection Sections (01–07)</span>
          <span>Arrange Order & Live Visibility</span>
        </div>

        <div className="divide-y divide-slate-100">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                cat.active === false ? 'bg-slate-50/60 opacity-60' : 'hover:bg-slate-50/50'
              }`}
            >
              {/* Left Order Number & Name */}
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {cat.sectionNumber || (idx + 1).toString().padStart(2, '0')}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{cat.name}</h3>
                    {cat.badge && (
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        {cat.badge}
                      </span>
                    )}
                    {cat.active === false && (
                      <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        Disabled
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {cat.description || `Browse all ${cat.name} products in the storefront.`}
                  </p>
                </div>
              </div>

              {/* Actions & Reordering */}
              <div className="flex items-center gap-2">
                {/* Reorder Buttons */}
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, -1)}
                    className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    disabled={idx === categories.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                {/* Enable/Disable Toggle */}
                <button
                  onClick={() => handleToggleActive(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                    cat.active !== false
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat.active !== false ? 'Enabled' : 'Disabled'}
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleOpenEdit(cat, idx)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg"
                  title="Edit category"
                >
                  <Edit2 size={15} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => setDeleteTargetId(cat.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg"
                  title="Delete category"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DRAWER */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingCategory ? 'Edit Category Section' : 'Add New Category'}
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
              form="category-form"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
            >
              {editingCategory ? 'Save Changes' : 'Create Category'}
            </button>
          </>
        }
      >
        <form id="category-form" onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Waffle / Raglan Long Sleeves"
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Section Number (e.g. 04)
              </label>
              <input
                type="text"
                value={formData.sectionNumber}
                onChange={(e) => setFormData({ ...formData, sectionNumber: e.target.value })}
                placeholder="04"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. NEW DROP"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Category Subtitle / Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Subtitle displayed under the section heading on the storefront..."
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600"
              />
              <span className="font-bold text-slate-700">Display as active section in shop navigation</span>
            </label>
          </div>
        </form>
      </Drawer>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Category Section?"
        message="This will remove the section header from the storefront navigation."
        confirmText="Delete Category"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminCategories;
