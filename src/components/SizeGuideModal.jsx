import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const SizeGuideModal = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [activeCategory, setActiveCategory] = useState('tshirts');
  const [unit, setUnit] = useState('inches'); // 'inches' or 'cm'

  if (!isSizeGuideOpen) return null;

  const guides = {
    tshirts: {
      title: 'Oversized Heavyweight T-Shirts',
      note: 'Our t-shirts are designed with a boxy, dropped-shoulder streetwear fit. For a standard tailored fit, consider sizing down one size.',
      headers: ['Size', 'Chest', 'Length', 'Shoulder', 'Sleeve'],
      inches: [
        ['S', '44"', '28"', '22"', '8.5"'],
        ['M', '46"', '29"', '23"', '9.0"'],
        ['L', '48"', '30"', '24"', '9.5"'],
        ['XL', '50"', '31"', '25"', '10.0"'],
        ['XXL', '52"', '32"', '26"', '10.5"'],
      ],
      cm: [
        ['S', '112 cm', '71 cm', '56 cm', '21.5 cm'],
        ['M', '117 cm', '74 cm', '58 cm', '23 cm'],
        ['L', '122 cm', '76 cm', '61 cm', '24 cm'],
        ['XL', '127 cm', '79 cm', '63.5 cm', '25.5 cm'],
        ['XXL', '132 cm', '81 cm', '66 cm', '26.5 cm'],
      ]
    },
    denims: {
      title: 'Raw Selvedge & Carpenter Denims',
      note: 'Our Japanese raw and distressed denims sit right at the mid-waist with a relaxed straight-leg thigh.',
      headers: ['Waist Size', 'Waist', 'Inseam', 'Thigh', 'Leg Opening'],
      inches: [
        ['28', '29"', '31"', '24"', '17"'],
        ['30', '31"', '32"', '25"', '18"'],
        ['32', '33"', '32"', '26.5"', '18.5"'],
        ['34', '35"', '33"', '28"', '19"'],
        ['36', '37"', '33"', '29.5"', '19.5"'],
      ],
      cm: [
        ['28', '74 cm', '79 cm', '61 cm', '43 cm'],
        ['30', '79 cm', '81 cm', '63.5 cm', '46 cm'],
        ['32', '84 cm', '81 cm', '67 cm', '47 cm'],
        ['34', '89 cm', '84 cm', '71 cm', '48 cm'],
        ['36', '94 cm', '84 cm', '75 cm', '50 cm'],
      ]
    },
    hoodies: {
      title: '450 GSM Heavy Fleece Hoodies',
      note: 'Double-lined structured hood with cinched bottom hem.',
      headers: ['Size', 'Chest', 'Length', 'Shoulder', 'Sleeve'],
      inches: [
        ['S', '46"', '26.5"', '23"', '24"'],
        ['M', '48"', '27.5"', '24"', '24.5"'],
        ['L', '50"', '28.5"', '25"', '25"'],
        ['XL', '52"', '29.5"', '26"', '25.5"'],
      ],
      cm: [
        ['S', '117 cm', '67 cm', '58 cm', '61 cm'],
        ['M', '122 cm', '70 cm', '61 cm', '62 cm'],
        ['L', '127 cm', '72 cm', '63.5 cm', '63.5 cm'],
        ['XL', '132 cm', '75 cm', '66 cm', '65 cm'],
      ]
    }
  };

  const currentGuide = guides[activeCategory];
  const tableData = unit === 'inches' ? currentGuide.inches : currentGuide.cm;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Window */}
      <div className="relative bg-white w-full max-w-2xl shadow-2xl z-10 border border-neutral-200 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Ruler size={18} className="text-black" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black">
              STREETWEAR SIZING GUIDE
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-neutral-500 hover:text-black transition-colors"
            aria-label="Close size guide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category & Unit Selector Tabs */}
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
            <div className="flex gap-2">
              {[
                { id: 'tshirts', label: 'T-Shirts & Tops' },
                { id: 'denims', label: 'Denims & Lowers' },
                { id: 'hoodies', label: 'Hoodies & Knits' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`text-xs font-bold px-3 py-1.5 uppercase tracking-wider transition-colors ${
                    activeCategory === tab.id
                      ? 'bg-ink text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Units Toggle */}
            <div className="flex items-center border border-neutral-300 p-0.5 text-xs font-bold uppercase">
              <button
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 ${unit === 'inches' ? 'bg-black text-white' : 'text-neutral-500'}`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 ${unit === 'cm' ? 'bg-black text-white' : 'text-neutral-500'}`}
              >
                CM
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-1">
              {currentGuide.title}
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              {currentGuide.note}
            </p>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-white uppercase text-[10px] tracking-widest font-bold">
                  {currentGuide.headers.map((h) => (
                    <th key={h} className="p-2.5 border-b border-neutral-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-medium">
                {tableData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-bold text-black' : 'text-neutral-700'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sizing Help Note */}
          <div className="bg-neutral-50 p-3 text-[11px] text-neutral-600 border border-neutral-200 flex items-center justify-between">
            <span>Still unsure about your fit? Chat with our sizing specialist on WhatsApp.</span>
            <a
              href="https://wa.me/917451861370?text=Hi,%20I%20need%20help%20choosing%20my%20size%20for%20The%20III%20Monks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson font-bold hover:underline shrink-0 ml-2 uppercase"
            >
              CHAT NOW →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
