import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Truck,
  RefreshCw,
  MessageCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Cart = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartOriginalTotal,
    freeShippingThreshold,
    isFreeShipping,
    coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    cartFinalTotal
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);
  const totalSavings = (cartOriginalTotal - cartSubtotal) + discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    applyCoupon(couponCode);
    setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag size={36} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-black uppercase tracking-wider text-black">
              YOUR BAG IS EMPTY
            </h1>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Looks like you haven’t added any pieces to your rotation yet. Explore our latest drops in Japanese denim and heavy terry tees.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white px-8 py-3.5 text-xs font-black uppercase tracking-[0.2em] transition-colors"
          >
            <span>EXPLORE CATALOG</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black py-8 sm:py-12 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-crimson block mb-1">
              Order Review
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-wider text-black">
              SHOPPING BAG ({cart.length})
            </h1>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-ink text-white p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <Truck size={18} className="text-brandYellow shrink-0" />
            <div>
              {isFreeShipping ? (
                <span className="font-bold text-emerald-400 uppercase tracking-wider">
                  ✓ You've unlocked FREE Express Pan-India Shipping!
                </span>
              ) : (
                <span className="tracking-wide">
                  Add <strong className="text-brandYellow">₹{amountNeeded}</strong> more to unlock <strong className="text-white uppercase">FREE EXPRESS SHIPPING</strong>
                </span>
              )}
            </div>
          </div>

          <div className="w-full sm:w-48 bg-neutral-800 h-2 rounded-full overflow-hidden shrink-0">
            <div
              className="bg-brandYellow h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items Left, Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  {/* Image */}
                  <Link to={`/product/${item.slug}`} className="shrink-0">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.title}
                      className="w-24 sm:w-28 aspect-[3/4] object-cover bg-neutral-100 border border-neutral-200"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between w-full space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400">
                          {item.category}
                        </span>
                        <Link
                          to={`/product/${item.slug}`}
                          className="block text-sm font-bold uppercase tracking-wider text-black hover:text-crimson transition-colors"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-neutral-500 font-medium mt-0.5">
                          Selected Size: <strong className="text-black">{item.selectedSize}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-400 hover:text-crimson transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Price & Quantity Adjuster */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-bold text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-black">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="block text-[11px] text-neutral-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-neutral-600">
              <div className="p-4 bg-neutral-50 border border-neutral-200 flex items-center gap-3">
                <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
                <span>Zero-Risk Guarantee • Cash on Delivery with Live SMS Tracking</span>
              </div>
              <div className="p-4 bg-neutral-50 border border-neutral-200 flex items-center gap-3">
                <RefreshCw size={20} className="text-emerald-600 shrink-0" />
                <span>7-Day Effortless Size Exchange & Doorstep Reverse Pickups</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-50 border border-neutral-200 p-6 space-y-6 sticky top-28">
              <h3 className="text-sm font-black uppercase tracking-widest text-black border-b border-neutral-200 pb-3">
                ORDER SUMMARY
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  HAVE A DISCOUNT CODE?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. MONK10"
                      className="w-full bg-white border border-neutral-300 pl-8 pr-3 py-2 text-xs font-bold uppercase tracking-wider text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white px-4 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    APPLY
                  </button>
                </div>
              </form>

              {coupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 font-medium">
                  <span>✓ {coupon.code} ({coupon.description})</span>
                  <button onClick={removeCoupon} className="font-bold text-red-600 hover:underline uppercase text-[11px]">
                    Remove
                  </button>
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-3 text-xs border-t border-neutral-200 pt-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-black">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Total Savings</span>
                    <span>-₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount ({coupon.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Pan-India Shipping</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-600 font-bold">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="pt-3 border-t border-neutral-300 flex justify-between text-base font-black text-black uppercase tracking-wider">
                  <span>Estimated Total</span>
                  <span>₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-brandYellow hover:bg-yellow-400 text-black py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-md rounded-none"
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
                    const msg = `*LIBAS HALDWANI - WHATSAPP CART ORDER*\n\nHi LIBAS, I want to order the following cart items:\n\n${itemsText}\n\n*Estimated Total:* ₹${cartFinalTotal.toLocaleString('en-IN')}\n\nPlease verify availability and guide me with dispatch!`;
                    window.open(`https://wa.me/917900455958?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle size={17} />
                  <span>ORDER VIA WHATSAPP (+91 7900455958)</span>
                </button>
              </div>

              <p className="text-[10px] text-neutral-500 text-center uppercase tracking-wider">
                Taxes calculated at checkout • COD & Online Payments supported
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
