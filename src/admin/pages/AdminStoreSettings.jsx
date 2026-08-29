import React, { useState } from 'react';
import { Save, Check, MapPin, Instagram, Star, Compass, ShieldCheck, ExternalLink } from 'lucide-react';
import adminDataService from '../services/adminDataService';

const AdminStoreSettings = () => {
  const [settings, setSettings] = useState(() => adminDataService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    adminDataService.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=5FWQ%2BF9+Haldwani+Uttarakhand`;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Authoritative Business Records</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">Verified Store Profile</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Store & Location Information
          </h1>
        </div>

        <button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
        >
          <Save size={15} />
          <span>Save Information</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check size={16} className="text-emerald-600" />
          <span>Store details saved and synchronized with customer website!</span>
        </div>
      )}

      {/* Main Settings Card */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-xs">
        {/* Brand Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            1. Brand & Business Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Official Brand Name *
              </label>
              <input
                type="text"
                required
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Business Type
              </label>
              <input
                type="text"
                value={settings.businessType}
                onChange={(e) => setSettings({ ...settings, businessType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Store Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Physical Store Location */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center justify-between">
            <span>2. Verified Physical Store Location (Haldwani)</span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-bold text-xs inline-flex items-center gap-1"
            >
              <span>Test Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Street & Landmarks *
            </label>
            <input
              type="text"
              required
              value={settings.address.street}
              onChange={(e) => handleChange('address', 'street', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Locality / Area
              </label>
              <input
                type="text"
                value={settings.address.locality}
                onChange={(e) => handleChange('address', 'locality', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={settings.address.city}
                onChange={(e) => handleChange('address', 'city', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                State & Pincode *
              </label>
              <input
                type="text"
                required
                value={`${settings.address.state} - ${settings.address.pincode}`}
                readOnly
                className="w-full bg-slate-100 border border-slate-200 p-2.5 rounded-lg text-slate-700 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Google Maps Plus Code *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={settings.address.plusCode}
                onChange={(e) => handleChange('address', 'plusCode', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono font-bold text-indigo-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media & Rating Badges */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            3. Social Channels & Verified Ratings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Instagram Handle *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={settings.socials.instagram}
                  onChange={(e) => handleChange('socials', 'instagram', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Instagram Direct URL *
              </label>
              <input
                type="url"
                required
                value={settings.socials.instagramUrl}
                onChange={(e) => handleChange('socials', 'instagramUrl', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500 text-[11px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Google Rating Score
              </label>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="font-bold text-sm text-slate-900">{settings.rating.score} / 5.0</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Verified Google Reviews Count
              </label>
              <span className="font-bold text-sm text-slate-900">{settings.rating.reviewsCount} Reviews</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminStoreSettings;
