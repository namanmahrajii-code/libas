import React, { useState } from 'react';
import { MapPin, ExternalLink, Send, Star, Clock, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Contact = () => {
  const { showToast } = useShop();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      showToast('Please fill all required fields');
      return;
    }
    setSubmitted(true);
    showToast('Message sent! We look forward to seeing you at LIBAS Haldwani.');
  };

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=RTO+Gas+Godown+Link+Road+Haldwani+Uttarakhand";

  return (
    <div className="bg-[#F7F4EF] min-h-screen text-[#1E1E1E] py-12 sm:py-16 animate-page-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-[#E5DDD3] pb-6 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7D1E22] block mb-1">
            Store & Location
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
            VISIT OUR STORE
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 font-normal">
            Find us in Haldwani. Discover stylish collections, premium brands, and everyday fashion curated to help you look and feel your best.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Contact Info & Store Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#E5DDD3] rounded-3xl space-y-6 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#7D1E22]/10 text-[#7D1E22] border border-[#7D1E22]/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3">
                  <span>FASHION & CLOTHING STORE</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-[#1E1E1E]">
                  LIBAS
                </h2>
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E1E1E] mt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[#6B6B6B]">4.8 / 5 Customer Rating (Verified Store Reviews)</span>
                </div>
              </div>

              {/* Verified Address & Hours */}
              <div className="space-y-4 text-xs border-t border-[#E5DDD3] pt-4">
                <div className="flex items-start gap-3.5">
                  <MapPin size={18} className="text-[#7D1E22] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E1E1E] font-bold uppercase tracking-wider">Address</strong>
                    <p className="text-[#6B6B6B] mt-1 leading-relaxed font-normal">
                      LIBAS<br />
                      RTO Gas Godown Link Road<br />
                      Haldwani, Nainital<br />
                      Uttarakhand – 263139<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock size={18} className="text-[#7D1E22] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E1E1E] font-bold uppercase tracking-wider">Opening Hours</strong>
                    <p className="text-[#7D1E22] font-bold mt-1 text-sm">
                      9:00 AM – 7:00 PM (Daily)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Sparkles size={18} className="text-[#7D1E22] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E1E1E] font-bold uppercase tracking-wider">Store Highlights</strong>
                    <p className="text-[#6B6B6B] mt-1">
                      Premium Brands • Latest Collections • Quality Assured • Style for Everyone
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5DDD3] flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#7D1E22] hover:bg-[#942429] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm hover:scale-105"
                >
                  <MapPin size={14} />
                  <span>GET DIRECTIONS</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Map Embed centered on Haldwani location */}
            <div className="h-72 bg-white border border-[#E5DDD3] rounded-3xl overflow-hidden relative shadow-xs p-1">
              <iframe
                title="LIBAS Haldwani Location"
                src="https://maps.google.com/maps?q=RTO+Gas+Godown+Link+Road,+Haldwani,+Uttarakhand&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded-2xl border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Message Form / Contact Us */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border border-[#E5DDD3] rounded-3xl flex flex-col justify-between shadow-xs">
            <div>
              <div className="border-b border-[#E5DDD3] pb-3 mb-6">
                <h3 className="text-sm font-serif font-black uppercase tracking-widest text-[#1E1E1E]">
                  CONTACT US
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Have a question about collections, sizes, or visiting our Haldwani store? Drop us a message.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 bg-[#7D1E22] text-white rounded-full flex items-center justify-center mx-auto text-lg">
                    ✓
                  </div>
                  <h4 className="text-sm font-serif font-black uppercase tracking-wider text-[#1E1E1E]">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
                    Thank you, {form.name}. You can also visit us directly at RTO Gas Godown Link Road, Haldwani (Open 9:00 AM – 7:00 PM).
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }); }}
                    className="bg-[#7D1E22] hover:bg-[#942429] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone Number"
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1E1E1E] mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Inquiry about collections, fits, or store visits..."
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD3] rounded-xl p-3 text-xs text-[#1E1E1E] placeholder-[#6B6B6B] focus:outline-none focus:border-[#7D1E22]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#7D1E22] hover:bg-[#942429] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md hover:scale-101"
                  >
                    <Send size={14} />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>

            {/* Quick store info strip */}
            <div className="mt-8 pt-4 border-t border-[#E5DDD3] flex items-center justify-between text-xs text-[#6B6B6B]">
              <span className="font-medium">LIBAS Haldwani • Open Daily</span>
              <span className="font-bold text-[#7D1E22]">9:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
