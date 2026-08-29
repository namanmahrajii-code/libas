import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  ArrowLeft,
  Lock,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import adminDataService, { initialPaymentSettings } from '../admin/services/adminDataService';

const Checkout = () => {
  const {
    cart,
    cartSubtotal,
    coupon,
    discountAmount,
    freeShippingThreshold,
    createOrder,
    showToast
  } = useShop();

  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: 'Uttarakhand',
    pincode: '',
    paymentMethod: 'upi', // 'upi' or 'cod'
    utrNumber: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold uppercase">No Items in Checkout</h2>
        <p className="text-xs text-neutral-500">Your shopping bag is currently empty.</p>
        <Link to="/shop" className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Read dynamic payment configuration from admin settings
  const paymentSettings = useMemo(() => {
    try {
      return adminDataService.getPaymentSettings() || initialPaymentSettings;
    } catch {
      return initialPaymentSettings;
    }
  }, []);

  const codFee = (formData.paymentMethod === 'cod' && paymentSettings?.cod?.fee) ? Number(paymentSettings.cod.fee) : 0;
  const isFreeShipping = cartSubtotal >= 1599 || coupon?.freeShipping;
  const baseShippingFee = isFreeShipping ? 0 : 99;
  const totalShipping = baseShippingFee + codFee;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount) + totalShipping;

  const upiId = paymentSettings?.upi?.upiId || '7900455958-2@axl';
  const payeeName = paymentSettings?.upi?.payeeName || 'LIBAS Fashion';
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('LIBAS Order')}`;
  const upiQrCodeUrl = paymentSettings?.upi?.qrImage || `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(upiPayUrl)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    showToast('UPI ID copied: ' + upiId);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pincode.trim() || !formData.city.trim()) {
      showToast('Please fill all required shipping fields');
      return;
    }

    if (formData.phone.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    // If payment method is WhatsApp, construct message and open WhatsApp
    if (formData.paymentMethod === 'whatsapp') {
      const waNumber = paymentSettings?.whatsapp?.phone || '917900455958';
      const itemsList = cart
        .map(
          (item, i) =>
            `${i + 1}. ${item.title} (Size: ${item.selectedSize}, Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
        )
        .join('\n');

      const waMessage = `*NEW ORDER QUERY - LIBAS HALDWANI*\n\n*Customer Details:*\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Email: ${formData.email || 'N/A'}\n• Address: ${formData.address}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}\n\n*Ordered Items:*\n${itemsList}\n\n*Total Amount:* ₹${grandTotal.toLocaleString('en-IN')}\n*Payment Option:* Order via WhatsApp Direct\n\nPlease confirm order acceptance & delivery timeline!`;

      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
    }

    // Simulate order placement
    setTimeout(() => {
      const order = createOrder({
        items: cart,
        shippingDetails: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod:
          formData.paymentMethod === 'upi'
            ? 'UPI (Google Pay / PhonePe / Paytm)'
            : formData.paymentMethod === 'whatsapp'
            ? 'Order via WhatsApp (7900455958)'
            : 'Cash on Delivery',
        upiDetails:
          formData.paymentMethod === 'upi'
            ? {
                upiId,
                payeeName,
                utrNumber: formData.utrNumber.trim() || 'Pending Verification',
              }
            : null,
        subtotal: cartSubtotal,
        discount: discountAmount,
        couponCode: coupon?.code || null,
        shippingFee: totalShipping,
        totalAmount: grandTotal,
        paymentStatus:
          formData.paymentMethod === 'upi'
            ? 'Paid via UPI'
            : formData.paymentMethod === 'whatsapp'
            ? 'WhatsApp Verification Pending'
            : 'Pending (COD)',
      });

      setIsSubmitting(false);
      navigate('/order-success', { state: { order } });
    }, 1000);
  };

  return (
    <div className="bg-[#F7F4EF] min-h-screen text-[#1E1E1E] py-8 sm:py-12 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E5DDD3] pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7D1E22] block mb-1">
              Secure Checkout
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
              CHECKOUT & DISPATCH
            </h1>
          </div>
          <Link
            to="/cart"
            className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] hover:text-[#7D1E22] flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Return to Bag</span>
          </Link>
        </div>

        {/* 2-Column Grid */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact, Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DDD3] rounded-3xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5DDD3] pb-3">
                <h3 className="text-xs font-serif font-black uppercase tracking-widest text-[#1E1E1E] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#7D1E22] text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  CONTACT DETAILS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Aryan Malhotra"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium uppercase text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Mobile Phone (For WhatsApp Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number (e.g. 9876543210)"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Email Address (For Invoice)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="aryan@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DDD3] rounded-3xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5DDD3] pb-3">
                <h3 className="text-xs font-serif font-black uppercase tracking-widest text-[#1E1E1E] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#7D1E22] text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  DELIVERY ADDRESS
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Flat / House No / Building / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. House 42, 2nd Floor, Park Street"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Haldwani"
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium uppercase text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Uttarakhand"
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium uppercase text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit (e.g. 263139)"
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="e.g. Near Gas Godown"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs font-medium text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 sm:p-8 border border-[#E5DDD3] rounded-3xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5DDD3] pb-3">
                <h3 className="text-xs font-serif font-black uppercase tracking-widest text-[#1E1E1E] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#7D1E22] text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                  PAYMENT METHOD
                </h3>
              </div>

              <div className="space-y-4">
                {/* 1. UPI Payment Option */}
                <div
                  className={`border rounded-2xl transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'border-[#7D1E22] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#E5DDD3] bg-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <label className="flex items-start gap-3 p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mt-1 accent-[#7D1E22]"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] flex items-center gap-2">
                          <Smartphone size={16} className="text-[#7D1E22]" />
                          UPI PAYMENT (GPAY / PHONEPE / PAYTM / CRED)
                        </span>
                        <span className="text-[10px] font-bold text-[#7D1E22] bg-[#7D1E22]/10 px-2.5 py-0.5 rounded-full uppercase">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6B6B] mt-1">
                        Pay directly to verified store UPI ID or scan QR code via any UPI app.
                      </p>
                    </div>
                  </label>

                  {/* Expanded UPI Details */}
                  {formData.paymentMethod === 'upi' && (
                    <div className="border-t border-[#E5DDD3] bg-white p-4 sm:p-5 rounded-b-2xl space-y-4 animate-fade-in">
                      <div className="bg-[#FAF8F5] p-3.5 border border-[#E5DDD3] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] block">
                            Verified Beneficiary & UPI ID:
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-xs sm:text-sm font-black text-[#1E1E1E]">
                              {upiId}
                            </span>
                            <span className="text-[10px] font-bold bg-white text-[#7D1E22] px-2 py-0.5 rounded-full border border-[#E5DDD3]">
                              {payeeName}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#7D1E22] hover:bg-[#942429] text-white px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
                        >
                          {copiedUpi ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
                          <span>{copiedUpi ? 'COPIED!' : 'COPY UPI ID'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div className="bg-[#FAF8F5] p-3 border border-[#E5DDD3] rounded-2xl flex flex-col items-center text-center shadow-2xs">
                          <span className="text-[10px] font-bold tracking-wider text-[#6B6B6B] uppercase mb-2 flex items-center gap-1">
                            <QrCode size={13} />
                            Scan with Any UPI App
                          </span>
                          <img
                            src={upiQrCodeUrl}
                            alt="LIBAS UPI QR Code"
                            className="w-36 h-36 object-contain border border-[#E5DDD3] rounded-xl p-1 bg-white"
                          />
                          <span className="text-[10px] font-mono text-[#6B6B6B] mt-2">
                            Amount: <strong className="text-[#1E1E1E]">₹{grandTotal.toLocaleString('en-IN')}</strong>
                          </span>
                        </div>

                        <div className="space-y-2">
                          <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] text-[11px]">
                            Transaction ID / UTR (Optional)
                          </label>
                          <input
                            type="text"
                            name="utrNumber"
                            value={formData.utrNumber}
                            onChange={handleInputChange}
                            placeholder="e.g. 402918274619"
                            className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-2.5 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                          />
                          <p className="text-[10px] text-[#6B6B6B]">
                            Enter 12-digit UTR from your bank app for instant auto-approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Cash on Delivery */}
                <div
                  className={`border rounded-2xl transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#7D1E22] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#E5DDD3] bg-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <label className="flex items-start gap-3 p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mt-1 accent-[#7D1E22]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] flex items-center gap-2">
                          <Banknote size={15} />
                          CASH ON DELIVERY (COD)
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
                          ZERO EXTRA CHARGES
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6B6B] mt-1">
                        Pay with cash upon package delivery. Free delivery on orders above ₹1,599.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Pay Button */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E5DDD3] rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-xs">
              <h3 className="text-xs font-serif font-black uppercase tracking-widest text-[#1E1E1E] border-b border-[#E5DDD3] pb-3">
                ORDER REVIEW ({cart.length} ITEMS)
              </h3>

              {/* Items Preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[#E5DDD3]/60 pr-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="w-14 h-16 bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={item.images ? item.images[0] : item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#6B6B6B]">
                        Size: <strong>{item.selectedSize}</strong> • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-black text-[#1E1E1E] shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs border-t border-[#E5DDD3] pt-4">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E1E1E]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#7D1E22] font-semibold">
                    <span>Discount ({coupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Delivery (Free over ₹1,599)</span>
                  <span>{baseShippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${baseShippingFee}`}</span>
                </div>

                <div className="pt-3 border-t border-[#E5DDD3] flex justify-between text-base font-black text-[#1E1E1E] uppercase tracking-wider">
                  <span>Total Amount</span>
                  <span className="text-[#7D1E22]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md rounded-full disabled:opacity-50 text-white hover:scale-101 ${
                  formData.paymentMethod === 'whatsapp'
                    ? 'bg-[#25D366] hover:bg-[#20ba5a]'
                    : 'bg-[#7D1E22] hover:bg-[#942429]'
                }`}
              >
                {formData.paymentMethod === 'whatsapp' ? <MessageCircle size={16} /> : <Lock size={15} />}
                <span>
                  {isSubmitting
                    ? 'PROCESSING DISPATCH...'
                    : formData.paymentMethod === 'upi'
                    ? `CONFIRM & PAY ₹${grandTotal.toLocaleString('en-IN')} VIA UPI`
                    : formData.paymentMethod === 'whatsapp'
                    ? `ORDER VIA WHATSAPP (+91 7900455958)`
                    : `CONFIRM COD ORDER (₹${grandTotal.toLocaleString('en-IN')})`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B6B6B] font-medium tracking-wider uppercase">
                <ShieldCheck size={14} className="text-[#7D1E22]" />
                <span>256-Bit SSL Encrypted Payment Portal</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
