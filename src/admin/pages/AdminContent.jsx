import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Save, Check, Sparkles, Image as ImageIcon, Megaphone, Eye, Layers } from 'lucide-react';
import adminDataService from '../services/adminDataService';

const AdminContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'hero';

  const [content, setContent] = useState(() => adminDataService.getContent());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleHeroChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const handleAnnouncementChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      announcement: {
        ...prev.announcement,
        [field]: value,
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    adminDataService.saveContent(content);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Visual Merchandising & CMS</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">No-Code Frontend Control</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Storefront Content Management
          </h1>
        </div>

        <button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
        >
          <Save size={15} />
          <span>Save Content Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check size={16} className="text-emerald-600" />
          <span>Homepage content updated and saved successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
        {[
          { id: 'hero', label: 'Hero Banner Section' },
          { id: 'announcements', label: 'Top Announcement Bar' },
          { id: 'banners', label: 'Promotional Highlights' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              searchParams.set('tab', tab.id);
              setSearchParams(searchParams);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        {activeTab === 'hero' && (
          <form onSubmit={handleSave} className="space-y-6 text-xs max-w-3xl">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Homepage Hero Headline & Copy
              </h3>
              <p className="text-slate-500 mb-4">
                Controls the main above-the-fold banner on the public customer landing page.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hero Top Badge Tag
              </label>
              <input
                type="text"
                value={content.hero.badge}
                onChange={(e) => handleHeroChange('badge', e.target.value)}
                placeholder="HALDWANI • STREETWEAR CLOTHING STORE"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-semibold focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Primary Brand Headline
              </label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => handleHeroChange('title', e.target.value)}
                placeholder="LIBAS"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-bold text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Authoritative Subtitle / Value Proposition
              </label>
              <textarea
                rows={3}
                value={content.hero.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg leading-relaxed focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={content.hero.ctaPrimaryText}
                  onChange={(e) => handleHeroChange('ctaPrimaryText', e.target.value)}
                  placeholder="SHOP COLLECTION"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Primary CTA Target Route
                </label>
                <input
                  type="text"
                  value={content.hero.ctaPrimaryLink}
                  onChange={(e) => handleHeroChange('ctaPrimaryLink', e.target.value)}
                  placeholder="/shop"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-2">
                Background Imagery
              </label>

              {/* Upload Zone */}
              <label
                htmlFor="hero-bg-upload"
                className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all mb-2 overflow-hidden relative ${
                  content.hero.bgImage
                    ? 'border-emerald-400'
                    : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (ev) => handleHeroChange('bgImage', ev.target.result);
                    reader.readAsDataURL(file);
                  }
                }}
              >
                {content.hero.bgImage ? (
                  <>
                    <img
                      src={content.hero.bgImage}
                      alt="Hero bg preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="relative z-10 text-center bg-black/40 px-4 py-2 rounded-lg">
                      <p className="text-white text-xs font-bold">✓ Image Set</p>
                      <p className="text-white/80 text-[10px]">Click or drag to replace</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="text-3xl mb-1">🖼️</div>
                    <p className="text-xs font-bold text-slate-600">Click to upload or drag & drop</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP — Max 10MB</p>
                  </div>
                )}
              </label>
              <input
                id="hero-bg-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (file.size > 10 * 1024 * 1024) {
                    alert('File too large. Max 10MB for hero images.');
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = (ev) => handleHeroChange('bgImage', ev.target.result);
                  reader.readAsDataURL(file);
                }}
              />

              {/* URL fallback + Remove */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={content.hero.bgImage?.startsWith('data:') ? '' : (content.hero.bgImage || '')}
                  onChange={(e) => handleHeroChange('bgImage', e.target.value)}
                  placeholder="Or paste image URL / path — /images/banners/hero-desktop.jpg"
                  className="flex-1 bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-[11px] focus:outline-none focus:bg-white focus:border-indigo-500"
                />
                {content.hero.bgImage && (
                  <button
                    type="button"
                    onClick={() => handleHeroChange('bgImage', '')}
                    className="text-[11px] font-bold text-rose-500 hover:text-rose-700 whitespace-nowrap"
                  >
                    × Remove
                  </button>
                )}
              </div>
            </div>

          </form>
        )}

        {activeTab === 'announcements' && (
          <form onSubmit={handleSave} className="space-y-6 text-xs max-w-3xl">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Top Announcement Marquee
              </h3>
              <p className="text-slate-500 mb-4">
                The continuous marquee displayed at the very top of all public customer pages.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={content.announcement.enabled}
                  onChange={(e) => handleAnnouncementChange('enabled', e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <span className="font-bold text-slate-800">Enable Announcement Marquee</span>
              </label>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Marquee Ticker Text
              </label>
              <textarea
                rows={3}
                value={content.announcement.text}
                onChange={(e) => handleAnnouncementChange('text', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg leading-relaxed focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Featured Coupon Highlight Code
              </label>
              <input
                type="text"
                value={content.announcement.highlightCode}
                onChange={(e) => handleAnnouncementChange('highlightCode', e.target.value.toUpperCase())}
                placeholder="LIBAS10"
                className="w-full max-w-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono font-bold focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </form>
        )}

        {activeTab === 'banners' && (
          <div className="space-y-6 text-xs max-w-3xl">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Promotional Campaign Banners
              </h3>
              <p className="text-slate-500 mb-4">
                Active seasonal and drop banners featured across shop shelves.
              </p>
            </div>

            <div className="space-y-3">
              {content.banners.map((b, idx) => (
                <div key={b.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{b.title}</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      Live
                    </span>
                  </div>
                  <p className="text-slate-600">{b.subtitle}</p>
                  <p className="font-mono text-indigo-600">{b.link}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
