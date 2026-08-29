import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Star, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

const About = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=RTO+Gas+Godown+Link+Road+Haldwani+Uttarakhand";

  return (
    <div className="bg-[#F7F4EF] min-h-screen text-[#1E1E1E] py-12 sm:py-20 animate-page-fade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#E5DDD3] pb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#7D1E22] font-bold">
            ABOUT THE BRAND
          </span>
          <h1 className="text-3xl sm:text-6xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
            LIBAS
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B] font-normal max-w-2xl mx-auto leading-relaxed">
            Modern Fashion & Clothing Destination in Haldwani, Uttarakhand
          </p>
        </div>

        {/* Official Brand Positioning & About Copy Box */}
        <div className="bg-white p-8 sm:p-12 border border-[#E5DDD3] rounded-3xl shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7D1E22]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7D1E22]">OUR PHILOSOPHY</span>
          </div>

          <p className="text-base sm:text-xl font-serif font-bold uppercase tracking-wide text-[#1E1E1E] leading-relaxed">
            "LIBAS is your fashion destination in Haldwani, offering a thoughtfully curated collection of stylish clothing for different styles and occasions. From everyday essentials to the latest fashion trends, we bring together quality, comfort and style under one roof."
          </p>

          <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
            At LIBAS, we believe that your style speaks for you. We are dedicated to providing modern fashion enthusiasts with premium quality attire, carefully tailored fits, and versatile collections suitable for every occasion.
          </p>

          {/* 4 Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#E5DDD3] text-xs">
            <div className="p-5 bg-[#FAF8F5] border border-[#E5DDD3] rounded-2xl flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#7D1E22] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#1E1E1E] font-bold uppercase text-xs">Premium Brands</strong>
                <p className="text-[#6B6B6B] text-[11px] mt-0.5">Carefully curated authentic labels and superior finishes.</p>
              </div>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-[#E5DDD3] rounded-2xl flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#7D1E22] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#1E1E1E] font-bold uppercase text-xs">Latest Collections</strong>
                <p className="text-[#6B6B6B] text-[11px] mt-0.5">Fresh seasonal trends, contemporary fits and new arrivals.</p>
              </div>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-[#E5DDD3] rounded-2xl flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#7D1E22] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#1E1E1E] font-bold uppercase text-xs">Quality Assured</strong>
                <p className="text-[#6B6B6B] text-[11px] mt-0.5">Finest fabrics and strict quality control for enduring comfort.</p>
              </div>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-[#E5DDD3] rounded-2xl flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#7D1E22] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#1E1E1E] font-bold uppercase text-xs">Style for Everyone</strong>
                <p className="text-[#6B6B6B] text-[11px] mt-0.5">Versatile fashion selections crafted for every style and event.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Location Details */}
        <div className="bg-white text-[#1E1E1E] p-8 sm:p-10 border border-[#E5DDD3] rounded-3xl shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D1E22] block mb-1">
                VISIT IN PERSON
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                FIND US IN HALDWANI
              </h2>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7D1E22] hover:bg-[#942429] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm inline-flex items-center gap-2 self-start hover:scale-105"
            >
              <span>GET DIRECTIONS</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="text-xs text-[#6B6B6B] space-y-2 border-t border-[#E5DDD3] pt-4 leading-relaxed">
            <p className="font-bold text-[#1E1E1E] text-sm">LIBAS</p>
            <p>RTO Gas Godown Link Road</p>
            <p>Haldwani, Nainital</p>
            <p>Uttarakhand – 263139, India</p>
            <div className="pt-2 flex items-center gap-2 text-[#7D1E22] font-semibold">
              <Clock size={15} />
              <span>Opening Hours: 9:00 AM – 7:00 PM (Daily)</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#7D1E22] hover:bg-[#942429] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:scale-105"
            >
              <ShoppingBag size={14} />
              <span>EXPLORE LATEST COLLECTION</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
