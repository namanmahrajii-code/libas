import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Star, Clock, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to LIBAS Fashion Updates');
    setEmail('');
  };

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=RTO+Gas+Godown+Link+Road+Haldwani+Uttarakhand";

  return (
    <footer className="bg-[#EFE8DE] text-[#1E1E1E] pt-16 pb-12 border-t border-[#E5DDD3]">
      {/* Brand Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-[#E5DDD3] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-amber-500 border border-[#E5DDD3] shrink-0 shadow-2xs">
            <Star size={18} fill="currentColor" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">4.8 / 5 Customer Rating</h4>
            <p className="text-[11px] text-[#6B6B6B]">Verified Shopper Reviews</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#7D1E22] border border-[#E5DDD3] shrink-0 shadow-2xs">
            <MapPin size={18} className="text-[#7D1E22]" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">Haldwani, Nainital</h4>
            <p className="text-[11px] text-[#6B6B6B]">RTO Gas Godown Link Road</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#7D1E22] border border-[#E5DDD3] shrink-0 shadow-2xs">
            <Clock size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">9:00 AM – 7:00 PM</h4>
            <p className="text-[11px] text-[#6B6B6B]">Open Daily for Shopping</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#7D1E22] border border-[#E5DDD3] shrink-0 shadow-2xs">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">Quality Assured</h4>
            <p className="text-[11px] text-[#6B6B6B]">Premium Brands & Trends</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Brand Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="LIBAS Logo"
              className="h-10 w-auto object-contain rounded-sm"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-[0.18em] uppercase text-[#1E1E1E]">
                LIBAS
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#6B6B6B] font-semibold">
                HALDWANI • FASHION STORE
              </span>
            </div>
          </div>

          <div className="text-xs text-[#6B6B6B] space-y-1 leading-relaxed border-l-2 border-[#7D1E22] pl-3">
            <p className="font-bold text-[#1E1E1E]">LIBAS</p>
            <p>RTO Gas Godown Link Road,</p>
            <p>Haldwani, Nainital,</p>
            <p>Uttarakhand – 263139, India</p>
            <p className="pt-1 text-[#7D1E22] font-semibold text-[11px]">
              Opening Hours: 9:00 AM – 7:00 PM (Daily)
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#7D1E22] hover:bg-[#942429] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm hover:scale-105"
            >
              <MapPin size={14} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Collections */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-serif font-black uppercase tracking-[0.2em] text-[#1E1E1E] mb-4">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-[#6B6B6B]">
            <li><Link to="/shop?category=kurtas" className="hover:text-[#7D1E22] transition-colors">Chikankari & Silk Kurtas</Link></li>
            <li><Link to="/shop?category=festive-kurtas" className="hover:text-[#7D1E22] transition-colors">Festive & Haldi Kurtas</Link></li>
            <li><Link to="/shop?category=indo-western" className="hover:text-[#7D1E22] transition-colors">Indo-Western & Achkans</Link></li>
            <li><Link to="/shop?category=sherwanis" className="hover:text-[#7D1E22] transition-colors">Royal Wedding Sherwanis</Link></li>
            <li><Link to="/shop?category=new-arrivals" className="hover:text-[#7D1E22] transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-[#7D1E22] transition-colors">All Ethnic Collections</Link></li>
          </ul>
        </div>

        {/* Quick Links & Newsletter */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-serif font-black uppercase tracking-[0.2em] text-[#1E1E1E] mb-2">
            Store & Information
          </h4>
          <ul className="space-y-1.5 text-xs text-[#6B6B6B] mb-4">
            <li><Link to="/contact" className="hover:text-[#7D1E22] transition-colors">Visit Our Haldwani Store</Link></li>
            <li><Link to="/about" className="hover:text-[#7D1E22] transition-colors">About LIBAS</Link></li>
            <li><Link to="/policy" className="hover:text-[#7D1E22] transition-colors">Store Policies</Link></li>
          </ul>

          <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#1E1E1E]">
            Stay Updated On Latest Collections
          </h5>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              className="w-full bg-white border border-[#E5DDD3] rounded-l-full px-4 py-2 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
            />
            <button
              type="submit"
              className="bg-[#7D1E22] hover:bg-[#942429] text-white px-4 rounded-r-full transition-colors flex items-center justify-center font-bold text-xs shadow-xs"
              aria-label="Submit newsletter"
            >
              <ArrowRight size={16} />
            </button>
          </form>
          {subscribed && (
            <p className="text-[10px] text-[#7D1E22] uppercase tracking-widest font-semibold">
              ✓ Subscribed to LIBAS collection updates.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E5DDD3] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">
        <p className="text-[11px] tracking-wider uppercase">
          © {new Date().getFullYear()} LIBAS HALDWANI. ALL RIGHTS RESERVED.
        </p>

        <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase font-semibold text-[#6B6B6B]">
          <span>RTO Gas Godown Link Road, Haldwani</span>
          <span>•</span>
          <span className="text-[#7D1E22]">Open Daily: 9:00 AM – 7:00 PM</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
