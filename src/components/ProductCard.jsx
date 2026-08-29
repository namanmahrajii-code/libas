import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, setQuickViewProduct } = useShop();
  const isSaved = wishlist.some((p) => p.id === product.id);

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative flex flex-col bg-white border border-[#E5DDD3] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#7D1E22]/40 hover:-translate-y-1 block"
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF8F5] flex items-center justify-center p-3 sm:p-4 border-b border-[#E5DDD3]/60 rounded-t-2xl">
        <img
          src={product.images?.[0] || product.image || '/images/products/midnight-graphic-tee.png'}
          alt={product.title}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discount && (
            <span className="bg-[#7D1E22] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#1E1E1E] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
              DROP
            </span>
          )}
        </div>

        {/* Action Float Top Right: Wishlist & Quick View with Glass Effect */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-md ${
              isSaved
                ? 'bg-[#7D1E22] text-white scale-105 shadow-[#7D1E22]/30'
                : 'bg-white/90 hover:bg-white text-[#1E1E1E] hover:text-[#7D1E22] border border-[#E5DDD3] hover:scale-110'
            }`}
            aria-label="Save to wishlist"
            title="Wishlist"
          >
            <Heart size={13} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#7D1E22] text-[#1E1E1E] hover:text-white border border-[#E5DDD3] flex items-center justify-center transition-all shadow-md backdrop-blur-md hover:scale-110 hidden sm:flex"
            aria-label="Quick preview"
            title="Quick preview"
          >
            <Eye size={13} />
          </button>
        </div>

        {/* Category Tag Bottom Left */}
        <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#6B6B6B] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#E5DDD3] shadow-2xs">
            {product.categoryName || product.category}
          </span>
        </div>
      </div>

      {/* 2. Minimal Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-white rounded-b-2xl">
        <div>
          {/* Colour Indicator */}
          {product.color && (
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1 line-clamp-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A64B4F] inline-block" />
              <span>{product.color}</span>
            </div>
          )}

          {/* Product Name */}
          <h3
            className="text-xs sm:text-sm font-black text-[#1E1E1E] group-hover:text-[#7D1E22] transition-colors uppercase tracking-wider leading-snug line-clamp-1"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-[#E5DDD3]/50">
          <span className="text-xs sm:text-sm font-black text-[#1E1E1E] tracking-tight">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-[11px] text-[#6B6B6B] line-through font-medium">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount && (
            <span className="text-[9px] font-extrabold text-[#7D1E22] ml-auto bg-[#7D1E22]/10 px-1.5 py-0.5 rounded-full">
              {product.discount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
