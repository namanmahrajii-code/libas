import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Heart, Star, Check, Ruler, ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsSizeGuideOpen
  } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const isSaved = wishlist.some((p) => p.id === quickViewProduct.id);
  const currentSizeObj = quickViewProduct.sizes?.find((s) => s.size === selectedSize);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart(quickViewProduct, selectedSize, 1, true);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart(quickViewProduct, selectedSize, 1, false);
    setQuickViewProduct(null);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-3xl shadow-2xl z-10 border border-[#E5DDD3] rounded-3xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-[#7D1E22] text-[#1E1E1E] hover:text-white p-2 rounded-full transition-colors shadow-sm border border-[#E5DDD3]"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gallery Column */}
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-[#FAF8F5] overflow-hidden border border-[#E5DDD3] rounded-2xl flex items-center justify-center p-4">
              <img
                src={quickViewProduct.images[selectedImage]}
                alt={quickViewProduct.title}
                className="w-full h-full object-contain object-center"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-20 bg-[#FAF8F5] p-1 rounded-xl overflow-hidden border-2 transition-all flex items-center justify-center ${
                      selectedImage === idx ? 'border-[#7D1E22]' : 'border-[#E5DDD3] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D1E22] bg-[#7D1E22]/10 px-2.5 py-0.5 rounded-full">
                  {quickViewProduct.categoryName || quickViewProduct.category}
                </span>
                <span>•</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6B6B6B]">
                  {quickViewProduct.gender}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                {quickViewProduct.title}
              </h2>

              <p className="text-xs text-[#6B6B6B] mt-1 font-normal">
                {quickViewProduct.subtitle}
              </p>

              {/* Colour Indicator */}
              {quickViewProduct.color && (
                <div className="mt-2 text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wider">
                  Colour: <strong className="text-[#1E1E1E]">{quickViewProduct.color}</strong>
                </div>
              )}

              {/* Price & Rating */}
              <div className="flex items-center gap-3 my-3">
                <span className="text-lg font-black text-[#1E1E1E]">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-[#6B6B6B] line-through">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {quickViewProduct.discount && (
                  <span className="bg-[#7D1E22] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {quickViewProduct.discount}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Sizing Selection */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#1E1E1E]">
                    SELECT SIZE: <strong className="text-[#7D1E22]">{selectedSize || 'NONE'}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[#6B6B6B] hover:text-[#7D1E22] uppercase text-[10px] font-bold tracking-wider underline"
                  >
                    <Ruler size={12} />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes?.map((s) => {
                    const isOOS = s.stock <= 0;
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        disabled={isOOS}
                        onClick={() => setSelectedSize(s.size)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                          isOOS
                            ? 'border-[#E5DDD3] text-[#6B6B6B]/40 line-through cursor-not-allowed bg-[#FAF8F5]'
                            : isSelected
                            ? 'bg-[#7D1E22] text-white border-[#7D1E22] shadow-xs'
                            : 'border-[#E5DDD3] text-[#1E1E1E] hover:border-[#7D1E22] hover:text-[#7D1E22] bg-[#FAF8F5]'
                        }`}
                      >
                        {s.size} {isOOS ? '(OOS)' : ''}
                      </button>
                    );
                  })}
                </div>

                {currentSizeObj && (
                  <p className="text-[11px] font-semibold text-[#7D1E22] mt-1">
                    {currentSizeObj.stock <= 2
                      ? `⚠️ Only ${currentSizeObj.stock} left in stock!`
                      : '✓ In Stock & Ready to Dispatch'}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-[#E5DDD3]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={!selectedSize}
                  onClick={handleAdd}
                  className="w-full bg-[#7D1E22] hover:bg-[#942429] disabled:opacity-50 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ShoppingBag size={14} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  disabled={!selectedSize}
                  onClick={handleBuyNow}
                  className="w-full bg-white hover:bg-[#7D1E22] text-[#7D1E22] hover:text-white border border-[#7D1E22] disabled:opacity-50 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  <span>BUY NOW</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
                  const msg = `*LIBAS HALDWANI*\nHi, I want to query/order *${quickViewProduct.title}*${sizeText} (₹${quickViewProduct.price}). Is this available?`;
                  window.open(`https://wa.me/917900455958?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <MessageCircle size={15} />
                <span>ORDER / QUERY VIA WHATSAPP</span>
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className="flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#7D1E22] font-semibold uppercase tracking-wider"
                >
                  <Heart size={14} fill={isSaved ? '#7D1E22' : 'none'} className={isSaved ? 'text-[#7D1E22]' : ''} />
                  <span>{isSaved ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}</span>
                </button>

                <Link
                  to={`/product/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="flex items-center gap-1 text-xs text-[#1E1E1E] font-bold uppercase tracking-wider hover:text-[#7D1E22]"
                >
                  <span>VIEW FULL DETAILS</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
