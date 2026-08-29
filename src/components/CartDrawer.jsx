import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartItemCount,
    freeShippingThreshold,
    isFreeShipping,
    coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    cartFinalTotal
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-page-fade"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-left border-l border-[#E5DDD3]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5DDD3] flex items-center justify-between bg-[#F7F4EF]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#7D1E22]" />
              <h2 className="text-sm font-serif font-black uppercase tracking-[0.18em] text-[#1E1E1E]">
                SHOPPING BAG ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6B6B6B] hover:text-[#7D1E22] transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3.5 bg-[#EFE8DE] text-[#1E1E1E] text-xs border-b border-[#E5DDD3]">
            {isFreeShipping ? (
              <p className="font-bold text-[#7D1E22] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <span>✓ UNLOCKED FREE PAN-INDIA DELIVERY</span>
              </p>
            ) : (
              <p className="text-[11px] tracking-wide text-[#6B6B6B]">
                Add <span className="font-bold text-[#7D1E22]">₹{amountNeededForFreeShipping}</span> more to unlock <span className="font-bold text-[#1E1E1E] uppercase">FREE DELIVERY</span>
              </p>
            )}
            <div className="w-full bg-[#E5DDD3] h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-[#7D1E22] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#E5DDD3]/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#FAF8F5] border border-[#E5DDD3] flex items-center justify-center rounded-full text-[#6B6B6B]">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold uppercase tracking-widest text-[#1E1E1E]">Your Bag is Empty</h3>
                  <p className="text-xs text-[#6B6B6B] mt-1 max-w-xs">
                    Explore our curated collections and add your favorite fits.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#7D1E22] hover:bg-[#942429] text-white px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
                >
                  EXPLORE COLLECTIONS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="pt-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Item info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-wide line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-[#6B6B6B] hover:text-[#7D1E22] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] mt-0.5">
                        <span>Size: <strong className="text-[#1E1E1E]">{item.selectedSize}</strong></span>
                        {item.color && (
                          <>
                            <span>•</span>
                            <span>{item.color}</span>
                          </>
                        )}
                      </div>

                      <div className="text-xs font-black text-[#1E1E1E] mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5DDD3]/40">
                      <div className="flex items-center border border-[#E5DDD3] rounded-full overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white text-[#1E1E1E] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white text-[#1E1E1E] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#1E1E1E]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & CTAs */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E5DDD3] bg-[#F7F4EF] space-y-3.5">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-3 text-[#6B6B6B]" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="ENTER COUPON (LIBAS10)"
                    className="w-full bg-white border border-[#E5DDD3] rounded-l-full pl-8 pr-3 py-2 text-xs uppercase tracking-wider text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#7D1E22] hover:bg-[#942429] text-white px-5 rounded-r-full text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  APPLY
                </button>
              </form>

              {coupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
                  <span>✓ {coupon.code} ({coupon.description})</span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-[#7D1E22] hover:underline uppercase"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1E1E1E]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#7D1E22] font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-[#E5DDD3] flex justify-between text-sm font-black text-[#1E1E1E] uppercase tracking-wider">
                  <span>Estimated Total</span>
                  <span className="text-[#7D1E22]">₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#7D1E22] hover:bg-[#942429] text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md rounded-full hover:scale-101"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    const itemsText = cart
                      .map(
                        (item, i) =>
                          `${i + 1}. ${item.title} (Size: ${item.selectedSize}, Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
                      )
                      .join('\n');
                    const msg = `*LIBAS HALDWANI - WHATSAPP CART ORDER*\n\nHi LIBAS, I want to order the following items from my cart:\n\n${itemsText}\n\n*Estimated Total:* ₹${cartFinalTotal.toLocaleString('en-IN')}\n\nPlease share payment and delivery confirmation!`;
                    window.open(`https://wa.me/917900455958?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-full transition-colors shadow-2xs"
                >
                  <MessageCircle size={15} />
                  <span>ORDER BAG ON WHATSAPP</span>
                </button>

                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-white hover:bg-[#7D1E22] text-[#7D1E22] hover:text-white border border-[#7D1E22] py-2.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center transition-colors block text-center rounded-full"
                >
                  VIEW FULL CART
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B6B6B] font-medium tracking-wider uppercase">
                <ShieldCheck size={14} className="text-[#7D1E22]" />
                <span>100% Encrypted & Safe Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
