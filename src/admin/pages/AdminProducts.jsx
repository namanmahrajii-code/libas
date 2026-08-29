import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  MoreVertical,
  Check,
  AlertTriangle,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Eye,
} from 'lucide-react';
import adminDataService from '../services/adminDataService';
import StatusBadge from '../components/StatusBadge';
import Drawer from '../components/Drawer';
import ConfirmModal from '../components/ConfirmModal';

const AdminProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAction = searchParams.get('action');
  const initialFilter = searchParams.get('filter');
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState(() => adminDataService.getProducts());
  const [categories, setCategories] = useState(() => adminDataService.getCategories());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [stockFilter, setStockFilter] = useState(initialFilter || 'all'); // all | in-stock | low-stock | out-of-stock

  // Drawer Form State (Add / Edit)
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialAction === 'add');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    category: 'graphic-tees',
    price: 999,
    originalPrice: 1499,
    status: 'Active',
    color: 'Black',
    description: '',
    fabricGsm: '280 GSM',
    fit: 'Oversized Boxy Fit',
    image: '/images/products/midnight-graphic-tee.png',
    galleryImages: ['/images/products/midnight-graphic-tee.png'],
    isNew: true,
    isBestSeller: false,
    tags: [],
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 5 },
    ],
  });

  // Tag input state
  const [tagInput, setTagInput] = useState('');
  // New category inline form
  const [showNewCatForm, setShowNewCatForm] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', id: '', gender: 'Men' });

  // Delete Confirm Modal
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Sync products on change
  const reloadData = () => {
    setProducts(adminDataService.getProducts());
    setCategories(adminDataService.getCategories());
  };

  useEffect(() => {
    if (initialAction === 'add') {
      handleOpenAddDrawer();
    }
  }, [initialAction]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCategory = (p.categoryName || p.category || '').toLowerCase().includes(q);
        const matchSku = (p.sku || p.id || '').toLowerCase().includes(q);
        const matchColor = (p.color || '').toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchSku && !matchColor) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }

      // Stock filter
      const totalStock = p.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || p.stock || 0;
      if (stockFilter === 'low-stock' && totalStock > 10) return false;
      if (stockFilter === 'out-of-stock' && totalStock > 0) return false;
      if (stockFilter === 'in-stock' && totalStock === 0) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, stockFilter]);

  // Open Add Drawer
  const handleOpenAddDrawer = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      sku: `LIBAS-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'kurtas',
      price: 999,
      originalPrice: 1499,
      status: 'Active',
      color: 'Ivory White',
      description: 'Premium ethnic wear crafted for festive occasions.',
      fabricGsm: 'Pure Silk',
      fit: 'Regular Fit',
      image: '',
      galleryImages: [],
      isNew: true,
      isBestSeller: false,
      tags: [],
      sizes: [
        { size: 'S', stock: 8 },
        { size: 'M', stock: 15 },
        { size: 'L', stock: 15 },
        { size: 'XL', stock: 10 },
        { size: 'XXL', stock: 4 },
      ],
    });
    setTagInput('');
    setIsDrawerOpen(true);
  };

  // Open Edit Drawer
  const handleOpenEditDrawer = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || '',
      sku: product.sku || product.id,
      category: product.category || 'kurtas',
      price: product.price || 999,
      originalPrice: product.originalPrice || product.price + 500,
      status: product.status || 'Active',
      color: product.color || 'Ivory White',
      description: product.description || '',
      fabricGsm: product.fabricGsm || 'Pure Silk',
      fit: product.fit || 'Regular Fit',
      image: product.image || product.images?.[0] || '',
      galleryImages: product.images || [product.image],
      isNew: product.isNew || false,
      isBestSeller: product.isBestSeller || false,
      tags: product.tags || [],
      sizes: product.sizes || [
        { size: 'S', stock: 5 },
        { size: 'M', stock: 10 },
        { size: 'L', stock: 10 },
        { size: 'XL', stock: 5 },
        { size: 'XXL', stock: 2 },
      ],
    });
    setTagInput('');
    setIsDrawerOpen(true);
  };

  // Save product (Add or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === formData.category);
    const categoryName = catObj ? catObj.name : formData.category;
    const gender = catObj?.gender || formData.gender || 'Men';
    const image = formData.image || formData.galleryImages?.[0] || '/images/products/midnight-graphic-tee.png';
    const galleryImages = (formData.galleryImages && formData.galleryImages.length > 0) ? formData.galleryImages : [image];

    const payload = {
      ...formData,
      categoryName,
      gender,
      image,
      images: galleryImages,
      tags: formData.tags || [],
      discount: formData.originalPrice > formData.price
        ? `${Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% OFF`
        : '',
    };

    if (editingProduct) {
      adminDataService.updateProduct(editingProduct.id, payload);
    } else {
      adminDataService.addProduct(payload);
    }

    reloadData();
    setIsDrawerOpen(false);
    setSearchParams({});
  };

  // Duplicate Product
  const handleDuplicate = (id) => {
    adminDataService.duplicateProduct(id);
    reloadData();
  };

  // Delete Product
  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      adminDataService.deleteProduct(deleteTargetId);
      setDeleteTargetId(null);
      reloadData();
    }
  };

  // Quick Status Toggle
  const handleToggleStatus = (product, newStatus) => {
    adminDataService.updateProduct(product.id, { status: newStatus });
    reloadData();
  };

  // Stock size update in form
  const handleSizeStockChange = (idx, newStock) => {
    const nextSizes = [...formData.sizes];
    nextSizes[idx].stock = Math.max(0, parseInt(newStock) || 0);
    setFormData({ ...formData, sizes: nextSizes });
  };

  // Tag helpers
  const handleAddTag = (raw) => {
    const newTags = raw
      .split(',').map((t) => t.trim().toLowerCase()).filter((t) => t && !formData.tags.includes(t));
    if (newTags.length) setFormData({ ...formData, tags: [...formData.tags, ...newTags] });
    setTagInput('');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput);
    }
    if (e.key === 'Backspace' && !tagInput && formData.tags.length) {
      setFormData({ ...formData, tags: formData.tags.slice(0, -1) });
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Inventory Management</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">{products.length} Items Total</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Products Catalog
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={reloadData}
            className="p-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Refresh product list"
          >
            <RefreshCw size={15} />
          </button>

          <button
            onClick={handleOpenAddDrawer}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search */}
          <div className="lg:col-span-4 relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product title, SKU, color..."
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Categories (7)</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div className="lg:col-span-3">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Inventory Levels</option>
              <option value="low-stock">Low Stock (≤ 10 units)</option>
              <option value="out-of-stock">Out of Stock (0 units)</option>
              <option value="in-stock">In Stock (&gt; 0 units)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">SKU / ID</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Inventory</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    No products found matching active filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const totalStock = p.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || p.stock || 0;
                  const isLow = totalStock <= 10 && totalStock > 0;
                  const isOut = totalStock === 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Product Thumbnail & Title */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-11 h-11 rounded-lg object-contain bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0 max-w-xs">
                            <div className="font-bold text-slate-900 truncate">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-2">
                              <span>{p.color || 'Streetwear'}</span>
                              {p.isNew && (
                                <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1 rounded">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-5 py-3.5 font-mono text-slate-500">
                        {p.sku || p.id.replace('prod_', '').slice(0, 10).toUpperCase()}
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          {p.categoryName || p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-slate-900">₹{p.price}</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-slate-400 line-through text-[11px] ml-1.5">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </td>

                      {/* Stock Inventory */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold ${
                              isOut
                                ? 'text-rose-600'
                                : isLow
                                ? 'text-amber-600'
                                : 'text-slate-800'
                            }`}
                          >
                            {totalStock} in stock
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex gap-1 mt-0.5">
                          {p.sizes?.map((s) => (
                            <span key={s.size} className="bg-slate-50 px-1 border border-slate-100">
                              {s.size}:{s.stock}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status || 'Active'} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditDrawer(p)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                            title="Edit product"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            onClick={() => handleDuplicate(p.id)}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title="Duplicate product"
                          >
                            <Copy size={14} />
                          </button>

                          <button
                            onClick={() => setDeleteTargetId(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT DRAWER */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSearchParams({});
        }}
        title={editingProduct ? 'Edit Streetwear Product' : 'Add New Streetwear Product'}
        subtitle={editingProduct ? `SKU: ${formData.sku}` : 'Fill in the specifications to publish or draft a product'}
        width="max-w-2xl"
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
              form="product-form"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
            >
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </button>
          </>
        }
      >
        <form id="product-form" onSubmit={handleSaveProduct} className="space-y-6 text-xs">
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              1. General Details
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Master Angel Raglan"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  SKU Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="LIBAS-7821"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Category Section *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    if (e.target.value === '__add_new__') {
                      setShowNewCatForm(true);
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                      setShowNewCatForm(false);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option disabled>──────────────</option>
                  <option value="__add_new__">＋ Add New Category...</option>
                </select>

                {/* Inline New Category Form */}
                {showNewCatForm && (
                  <div className="mt-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg space-y-2">
                    <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">New Category</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1">Display Name *</label>
                        <input
                          type="text"
                          value={newCat.name}
                          onChange={(e) => setNewCat({ ...newCat, name: e.target.value, id: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                          placeholder="e.g. Bridal Lehengas"
                          className="w-full bg-white border border-indigo-200 p-2 rounded text-[11px] focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1">ID / Slug *</label>
                        <input
                          type="text"
                          value={newCat.id}
                          onChange={(e) => setNewCat({ ...newCat, id: e.target.value })}
                          placeholder="bridal-lehengas"
                          className="w-full bg-white border border-indigo-200 p-2 rounded font-mono text-[11px] focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 mb-1">Gender</label>
                      <select
                        value={newCat.gender}
                        onChange={(e) => setNewCat({ ...newCat, gender: e.target.value })}
                        className="w-full bg-white border border-indigo-200 p-2 rounded text-[11px] focus:outline-none focus:border-indigo-500"
                      >
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                        <option>Unisex</option>
                      </select>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!newCat.name.trim() || !newCat.id.trim()) return;
                          adminDataService.addCategory({ id: newCat.id, name: newCat.name, gender: newCat.gender });
                          reloadData();
                          setFormData({ ...formData, category: newCat.id });
                          setNewCat({ name: '', id: '', gender: 'Men' });
                          setShowNewCatForm(false);
                        }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold py-1.5 rounded transition-colors"
                      >
                        ✓ Save & Select
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowNewCatForm(false); setNewCat({ name: '', id: '', gender: 'Men' }); }}
                        className="px-3 text-slate-500 hover:text-slate-800 text-[11px] font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Color Scheme *
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g. Black / White"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Description & Streetwear Fit Notes
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product design inspiration, wash notes, and styling recommendations..."
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Pricing & Fabric Specs */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              2. Pricing & Fabric Specifications
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Original Strikethrough Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Fabric Weight (GSM)
                </label>
                <input
                  type="text"
                  value={formData.fabricGsm}
                  onChange={(e) => setFormData({ ...formData, fabricGsm: e.target.value })}
                  placeholder="e.g. 350 GSM Heavy Waffle"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Fit Type
                </label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                  placeholder="e.g. Oversized Boxy Fit"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Size & Stock Inventory Matrix */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              3. Size Stock Matrix
            </h4>

            <div className="grid grid-cols-5 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {formData.sizes.map((s, idx) => (
                <div key={s.size} className="text-center">
                  <label className="block font-bold text-slate-700 mb-1">
                    {s.size}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={s.stock}
                    onChange={(e) => handleSizeStockChange(idx, e.target.value)}
                    className="w-full bg-white border border-slate-300 p-1.5 text-center font-mono rounded focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

                {/* Product Media Image Upload */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              4. Product Media & Images
            </h4>

            {/* Upload Zone */}
            <div>
              <label className="block font-bold text-slate-700 mb-2">
                Primary Product Photo *
              </label>

              <label
                htmlFor="photo-upload-input"
                className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  formData.image
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setFormData({ ...formData, image: ev.target.result, galleryImages: [ev.target.result] });
                    reader.readAsDataURL(file);
                  }
                }}
              >
                {formData.image ? (
                  <div className="flex items-center gap-4 px-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-24 w-20 object-contain rounded-lg border border-slate-200 bg-white shadow-sm shrink-0"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-emerald-700">✓ Photo Ready</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Click or drag to replace</p>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setFormData({ ...formData, image: '', galleryImages: [] }); }}
                        className="mt-2 text-[10px] font-bold text-rose-500 hover:text-rose-700"
                      >
                        × Remove Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center px-4">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-xs font-bold text-slate-600">Click to upload or drag & drop</p>
                    <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, WEBP — Max 5MB</p>
                  </div>
                )}
              </label>
              <input
                id="photo-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    alert('File too large. Max allowed size is 5MB.');
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = (ev) => setFormData({ ...formData, image: ev.target.result, galleryImages: [ev.target.result] });
                  reader.readAsDataURL(file);
                }}
              />
            </div>

            {/* OR — Manual URL fallback */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Or paste image URL / path
              </label>
              <input
                type="text"
                value={formData.image && formData.image.startsWith('data:') ? '' : formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value, galleryImages: [e.target.value] })}
                placeholder="https://... or /images/products/my-kurta.png"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-[11px] focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <span className="font-bold text-slate-700">Mark as New Arrival</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600"
                />
                <span className="font-bold text-slate-700">Mark as Featured / Top Pick</span>
              </label>
            </div>
          </div>
          {/* ── 5. Search Tags ── */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              5. 🔍 Search Tags
              <span className="ml-2 text-[10px] font-medium text-slate-400 normal-case tracking-normal">
                Customers will find this product when searching these keywords
              </span>
            </h4>

            {/* Tag Input */}
            <div className="flex flex-wrap gap-1.5 min-h-[40px] bg-slate-50 border border-slate-200 rounded-lg p-2 focus-within:border-indigo-500 focus-within:bg-white transition-colors">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-indigo-100 text-indigo-700 text-[11px] font-bold px-2 py-0.5 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-600 transition-colors leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => tagInput.trim() && handleAddTag(tagInput)}
                placeholder={formData.tags.length === 0 ? "Type a tag & press Enter or comma — e.g. chikankari, silk, haldi" : 'Add more...'}
                className="flex-1 min-w-[180px] bg-transparent focus:outline-none text-[11px] text-slate-700 placeholder-slate-400"
              />
            </div>

            {/* Suggested Tags */}
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">Quick Add Suggestions:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'chikankari','silk','georgette','velvet','brocade','embroidery','zari','mirror-work',
                  'wedding','bridal','festive','haldi','reception','sangeet',
                  'sherwani','kurta','achkan','indo-western','anarkali','lehenga','sharara',
                  'kids','boys','girls','men','women',
                  'white','ivory','yellow','gold','red','navy','pink','black','green','rust',
                ].filter((s) => !formData.tags.includes(s)).slice(0, 20).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, tags: [...formData.tags, s] })}
                    className="bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-slate-400">
              💡 Tip: Add synonyms too — e.g. if you add <strong>chikankari</strong>, also add <strong>lucknowi</strong> for broader search coverage.
            </p>
          </div>
        </form>
      </Drawer>

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Product from Catalog?"
        message="This will permanently remove the product card and its inventory records from the LIBAS catalog."
        confirmText="Delete Product"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminProducts;
