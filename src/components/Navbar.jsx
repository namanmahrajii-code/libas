import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, Shield, Instagram, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cartItemCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTION', path: '/shop' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'VISIT STORE', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Marquee */}
      <div className="bg-[#EFE8DE] text-[#1E1E1E] py-1.5 px-4 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase border-b border-[#E5DDD3] overflow-hidden relative">
        <div className="flex w-full whitespace-nowrap overflow-hidden">
          <div className="inline-flex animate-marquee gap-10 items-center marquee-fade">
            <span className="text-[#7D1E22] font-bold">✨ LIBAS HALDWANI • LUXURY FASHION STORE</span>
            <span className="font-semibold text-neutral-800">📍 RTO GAS GODOWN LINK ROAD, HALDWANI</span>
            <span className="text-[#7D1E22] font-bold">⏰ OPEN DAILY: 9:00 AM – 7:00 PM</span>
            <span className="text-neutral-700">• PREMIUM LABELS • LATEST COLLECTIONS • STYLE THAT SPEAKS FOR YOU •</span>
          </div>
          <div className="inline-flex animate-marquee gap-10 items-center marquee-fade" aria-hidden="true">
            <span className="text-[#7D1E22] font-bold">✨ LIBAS HALDWANI • LUXURY FASHION STORE</span>
            <span className="font-semibold text-neutral-800">📍 RTO GAS GODOWN LINK ROAD, HALDWANI</span>
            <span className="text-[#7D1E22] font-bold">⏰ OPEN DAILY: 9:00 AM – 7:00 PM</span>
            <span className="text-neutral-700">• PREMIUM LABELS • LATEST COLLECTIONS • STYLE THAT SPEAKS FOR YOU •</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-sm border-b border-[#E5DDD3] py-3.5'
            : 'bg-[#F7F4EF]/95 backdrop-blur-md border-b border-[#E5DDD3] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger & Logo Area */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-[#1E1E1E] hover:text-[#7D1E22] transition-colors focus:outline-none shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group min-w-0">
              <img
                src="/images/logo.png"
                alt="LIBAS Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 shrink-0 rounded-sm"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display font-black text-base sm:text-xl tracking-[0.16em] sm:tracking-[0.2em] text-[#1E1E1E] group-hover:text-[#7D1E22] transition-colors uppercase leading-none truncate">
                  LIBAS
                </span>
                <span className="text-[7px] sm:text-[8px] font-sans uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#6B6B6B] font-semibold mt-0.5 truncate">
                  HALDWANI • FASHION STORE
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs tracking-[0.2em] transition-all relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#7D1E22] font-black'
                      : 'text-[#1E1E1E] font-medium hover:text-[#7D1E22]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7D1E22]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Icons: Location & Timing (Desktop), Search, Wishlist, Bag */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Store Hours / Location preview */}
            <Link
              to="/contact"
              className="hidden md:flex p-1.5 text-[#1E1E1E] hover:text-[#7D1E22] transition-colors items-center gap-1.5 text-xs font-semibold"
              title="RTO Gas Godown Link Road, Haldwani (9:00 AM – 7:00 PM)"
            >
              <MapPin size={16} className="text-[#7D1E22]" />
              <span className="hidden xl:inline text-[11px] font-sans tracking-wider uppercase text-[#6B6B6B] hover:text-[#1E1E1E]">
                Haldwani • 9 AM–7 PM
              </span>
            </Link>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#1E1E1E] hover:text-[#7D1E22] transition-colors flex items-center gap-1.5 text-xs font-medium"
              aria-label="Search catalog"
            >
              <Search size={19} />
              <span className="hidden md:inline text-[11px] tracking-wider uppercase text-[#6B6B6B] hover:text-[#7D1E22] font-semibold">
                Search
              </span>
            </button>

            {/* Wishlist Shortcut */}
            <Link
              to="/shop?filter=wishlist"
              className="p-1.5 text-[#1E1E1E] hover:text-[#7D1E22] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7D1E22] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag / Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#7D1E22] hover:bg-[#942429] text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all border border-[#7D1E22]"
              aria-label="View shopping bag"
            >
              <ShoppingBag size={17} />
              <span className="text-xs font-black tracking-widest uppercase">BAG</span>
              {cartItemCount > 0 && (
                <span className="bg-white text-[#7D1E22] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F4EF] border-b border-[#E5DDD3] px-6 py-6 animate-slide-up shadow-xl">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-bold tracking-[0.2em] text-[#1E1E1E] hover:text-[#7D1E22] transition-colors py-2 flex items-center justify-between border-b border-[#E5DDD3]/60"
                >
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-2 text-xs text-[#6B6B6B] flex items-center gap-2">
                <MapPin size={14} className="text-[#7D1E22]" />
                <span>RTO Gas Godown Link Road, Haldwani</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
