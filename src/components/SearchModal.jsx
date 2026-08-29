import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// ─────────────────────────────────────────────────────────────────────────────
// SMART TAG ENGINE
// Maps any synonym / alternate spelling / keyword → canonical tag(s)
// We tag each product with these canonical tags, then do intersection matching.
// ─────────────────────────────────────────────────────────────────────────────
const SYNONYM_MAP = {
  // Fabric / craft
  chikan: ['chikankari'],
  chikankari: ['chikankari'],
  lucknowi: ['chikankari'],
  lakhnavi: ['chikankari'],
  thread: ['chikankari', 'embroidery'],
  embroidery: ['embroidery'],
  embroidered: ['embroidery'],
  zari: ['zari', 'embroidery'],
  zardozi: ['zari', 'embroidery', 'bridal'],
  resham: ['embroidery'],
  gota: ['embroidery', 'festive'],
  mirror: ['mirror-work', 'festive'],
  sequin: ['sequin', 'festive'],
  brocade: ['brocade', 'wedding'],
  jacquard: ['jacquard', 'festive'],
  velvet: ['velvet', 'bridal'],
  silk: ['silk'],
  georgette: ['georgette'],
  chanderi: ['chanderi', 'silk'],
  organza: ['georgette'],

  // Garment types — Men
  kurta: ['kurta', 'men'],
  kurtas: ['kurta', 'men'],
  kurti: ['kurti', 'women'],
  kurtis: ['kurti', 'women'],
  pajama: ['kurta', 'men'],
  churidar: ['kurta'],
  sherwani: ['sherwani', 'men', 'wedding'],
  sherwanis: ['sherwani', 'men', 'wedding'],
  achkan: ['achkan', 'men', 'indo-western'],
  bandhgala: ['achkan', 'men', 'indo-western'],
  nehru: ['achkan', 'men', 'indo-western'],
  'indo-western': ['indo-western'],
  indowestern: ['indo-western'],
  indo: ['indo-western'],
  western: ['indo-western'],

  // Garment types — Women
  anarkali: ['anarkali', 'women'],
  lehenga: ['lehenga', 'women', 'bridal'],
  lehnga: ['lehenga', 'women', 'bridal'],
  sharara: ['sharara', 'women', 'festive'],
  salwar: ['salwar', 'women'],
  dupatta: ['women'],
  palazzo: ['palazzo', 'women'],
  suit: ['suit', 'women'],
  saree: ['saree', 'women'],

  // Garment types — Kids
  kids: ['kids'],
  kid: ['kids'],
  children: ['kids'],
  child: ['kids'],
  baby: ['kids'],
  boys: ['kids', 'boys'],
  girls: ['kids', 'girls'],
  boy: ['kids', 'boys'],
  girl: ['kids', 'girls'],
  dhoti: ['dhoti', 'kids', 'festive'],
  waistcoat: ['jacket', 'kids'],
  jacket: ['jacket', 'kids'],

  // Occasions
  wedding: ['wedding', 'bridal'],
  bridal: ['bridal', 'wedding'],
  groom: ['wedding', 'sherwani', 'men'],
  bride: ['bridal', 'wedding', 'women'],
  festive: ['festive'],
  haldi: ['haldi', 'festive', 'yellow'],
  mehndi: ['festive', 'haldi'],
  sangeet: ['festive', 'sequin'],
  reception: ['wedding', 'reception'],
  diwali: ['festive'],
  eid: ['festive'],
  pooja: ['festive'],
  puja: ['festive'],

  // Colors
  white: ['white'],
  ivory: ['white', 'ivory'],
  cream: ['ivory', 'white'],
  yellow: ['yellow', 'haldi'],
  gold: ['gold', 'wedding'],
  golden: ['gold', 'wedding'],
  red: ['red', 'bridal'],
  maroon: ['red', 'bridal'],
  navy: ['navy', 'blue'],
  blue: ['blue', 'navy'],
  royal: ['royal', 'blue', 'wedding'],
  pink: ['pink', 'women'],
  blush: ['pink', 'women'],
  pastel: ['pink', 'women'],
  mint: ['mint', 'green'],
  green: ['green', 'mint'],
  sage: ['green', 'sage'],
  rust: ['rust', 'festive'],
  copper: ['rust', 'festive'],
  mustard: ['yellow', 'festive'],
  black: ['black', 'sequin'],
  midnight: ['black'],
  onyx: ['black'],
  silver: ['silver'],
  purple: ['purple'],

  // Quality descriptors → categories
  handcrafted: ['chikankari', 'embroidery'],
  handmade: ['chikankari', 'embroidery'],
  luxury: ['wedding', 'bridal'],
  premium: ['silk', 'wedding'],
  designer: ['indo-western', 'bridal'],
  traditional: ['festive', 'kurta'],
  ethnic: ['kurta', 'festive', 'wedding'],
  classic: ['kurta'],
  minimalist: ['kurta'],
};

// Tags assigned to each product by ID
const PRODUCT_TAGS = {
  // Women's Ethnic
  prod_women_01: ['chikankari', 'anarkali', 'women', 'ivory', 'white', 'georgette', 'embroidery', 'festive', 'wedding'],
  prod_women_02: ['lehenga', 'women', 'bridal', 'red', 'velvet', 'zari', 'embroidery', 'wedding'],
  prod_women_03: ['sharara', 'women', 'pink', 'mirror-work', 'festive', 'georgette', 'embroidery'],
  prod_women_04: ['kurti', 'palazzo', 'women', 'yellow', 'silk', 'chanderi', 'festive', 'embroidery'],

  // Kids
  prod_kids_01: ['kids', 'boys', 'jacket', 'kurta', 'blue', 'silk', 'brocade', 'festive', 'wedding'],
  prod_kids_02: ['kids', 'boys', 'dhoti', 'kurta', 'yellow', 'haldi', 'festive'],
  prod_kids_03: ['kids', 'girls', 'lehenga', 'pink', 'embroidery', 'festive', 'mirror-work'],
  prod_kids_04: ['kids', 'boys', 'sherwani', 'ivory', 'white', 'gold', 'zari', 'wedding', 'royal'],

  // Men Chikankari
  prod_libas_01: ['chikankari', 'kurta', 'men', 'ivory', 'white', 'silk', 'embroidery', 'festive'],
  prod_libas_02: ['chikankari', 'kurta', 'men', 'white', 'georgette', 'embroidery'],
  prod_libas_03: ['kurta', 'men', 'mint', 'green', 'silk', 'chanderi', 'embroidery'],
  prod_libas_04: ['kurta', 'men', 'green', 'sage', 'silk', 'minimalist'],

  // Men Festive
  prod_libas_05: ['kurta', 'men', 'yellow', 'haldi', 'festive', 'jacquard', 'silk'],
  prod_libas_06: ['kurta', 'men', 'rust', 'festive', 'silk', 'embroidery'],
  prod_libas_07: ['kurta', 'men', 'black', 'sequin', 'festive', 'wedding', 'georgette'],

  // Men Indo-Western
  prod_libas_08: ['achkan', 'indo-western', 'men', 'pink', 'embroidery', 'wedding', 'silk'],
  prod_libas_11: ['achkan', 'indo-western', 'men', 'black', 'embroidery', 'wedding'],
  prod_libas_12: ['achkan', 'indo-western', 'men', 'green', 'mint', 'embroidery'],

  // Men Sherwanis
  prod_libas_09: ['sherwani', 'men', 'navy', 'blue', 'royal', 'wedding', 'sequin', 'brocade'],
  prod_libas_10: ['sherwani', 'men', 'ivory', 'gold', 'zari', 'wedding', 'bridal', 'silk'],
  prod_libas_13: ['sherwani', 'men', 'ivory', 'white', 'chikankari', 'wedding', 'silk'],
  prod_libas_14: ['sherwani', 'men', 'white', 'silver', 'wedding', 'reception', 'brocade'],
};

// ─────────────────────────────────────────────────────────────────────────────
// Smart tag-based scoring — no AI, pure keyword expansion
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Levenshtein distance — pure JS, no libraries
// ─────────────────────────────────────────────────────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// Fuzzy-expand a single word to canonical tags using exact + fuzzy synonym lookup
function fuzzyExpandWord(word, synonymKeys) {
  const results = new Set();

  // 1. Exact match first
  if (SYNONYM_MAP[word]) {
    SYNONYM_MAP[word].forEach((t) => results.add(t));
    results.add(word);
    return results; // exact hit — no need for fuzzy
  }

  // 2. Fuzzy match — allow 1 typo for short words (≤5 chars), 2 for longer
  const maxDist = word.length <= 4 ? 1 : word.length <= 7 ? 2 : 3;
  synonymKeys.forEach((key) => {
    const dist = levenshtein(word, key);
    if (dist <= maxDist && dist < key.length) {
      SYNONYM_MAP[key].forEach((t) => results.add(t));
    }
  });

  // 3. Partial prefix match (handles truncated words like "sherwani" → "sherwan")
  synonymKeys.forEach((key) => {
    if (key.startsWith(word) || word.startsWith(key.slice(0, Math.max(4, key.length - 2)))) {
      SYNONYM_MAP[key].forEach((t) => results.add(t));
    }
  });

  results.add(word); // keep raw word for direct text matching
  return results;
}

function smartSearch(query, products) {
  const rawWords = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (rawWords.length === 0) return [];

  const synonymKeys = Object.keys(SYNONYM_MAP);

  // Expand each word — with fuzzy fallback
  const expandedTags = new Set();
  rawWords.forEach((word) => {
    const tags = fuzzyExpandWord(word, synonymKeys);
    tags.forEach((t) => expandedTags.add(t));
  });

  const tagArray = [...expandedTags];

  // Score each product
  const scored = products.map((product) => {
    // Merge hardcoded tags + admin-added product.tags
    const productTags = [...(PRODUCT_TAGS[product.id] || []), ...(product.tags || [])];

    let tagScore = 0;

    // Tag intersection score (from expanded/fuzzy tags)
    tagArray.forEach((tag) => {
      if (productTags.includes(tag)) tagScore += 2;
    });

    // Direct text match bonus — also fuzzy against product text tokens
    const searchText = [
      product.title,
      product.subtitle,
      product.color,
      product.type,
      product.description,
      product.category,
      product.categoryName,
      ...(product.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const textTokens = searchText.split(/\s+/);
    rawWords.forEach((word) => {
      // Exact substring match → big bonus
      if (searchText.includes(word)) {
        tagScore += 3;
      } else {
        // Fuzzy match against each word in product text
        const maxDist = word.length <= 4 ? 1 : 2;
        textTokens.forEach((token) => {
          if (token.length >= 3 && levenshtein(word, token) <= maxDist) {
            tagScore += 1;
          }
        });
      }
    });

    return { product, score: tagScore };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.product);
}

// ─────────────────────────────────────────────────────────────────────────────
// Smart suggestions shown BELOW the input as you type
// ─────────────────────────────────────────────────────────────────────────────
const QUICK_SUGGESTIONS = [
  'Chikankari Kurta',
  'Bridal Lehenga',
  'Kids Sherwani',
  'Haldi Yellow Kurta',
  'Wedding Sherwani',
  'Anarkali Suit',
  'Indo Western Achkan',
  'Mirror Work Sharara',
  'Silk Kurta Pajama',
  'Girls Lehenga',
  'Boys Dhoti Kurta',
  'Black Sequin Kurta',
  'Ivory Gold Zari',
  'Navy Blue Sherwani',
  'Mint Green Kurta',
];

function getAutocompleteSuggestions(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return QUICK_SUGGESTIONS.filter((s) => s.toLowerCase().includes(q)).slice(0, 5);
}

// ─────────────────────────────────────────────────────────────────────────────
const SearchModal = () => {
  const { products, isSearchOpen, setIsSearchOpen } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  }, [isSearchOpen]);

  // Close on ESC key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(() => smartSearch(searchTerm, products), [searchTerm, products]);
  const suggestions = getAutocompleteSuggestions(searchTerm);

  if (!isSearchOpen) return null;

  const handleProductClick = (slug) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleViewAll = () => {
    if (!searchTerm.trim()) return;
    setIsSearchOpen(false);
    navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setShowSuggestions(false);
      setIsSearchOpen(false);
      navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const hasQuery = searchTerm.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-page-fade"
      />

      <div className="relative max-w-2xl mx-auto mt-10 sm:mt-16 px-4 z-10">
        <div className="bg-white shadow-2xl border border-[#E5DDD3] rounded-3xl overflow-hidden animate-slide-up">

          {/* ── Search Input ── */}
          <div className="p-4 sm:p-5 border-b border-[#E5DDD3] flex items-center gap-3 bg-[#FAF8F5] relative">
            <button
              onClick={handleViewAll}
              className="shrink-0 text-[#7D1E22] hover:text-[#942429] transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleEnterKey}
              placeholder="Type anything & press Enter — lehenga, haldi kurta, sherwani..."
              className="w-full bg-transparent text-sm font-semibold text-[#1E1E1E] placeholder-[#9A9A9A] focus:outline-none"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); inputRef.current?.focus(); }}
                className="text-[#6B6B6B] hover:text-[#7D1E22] p-1 shrink-0"
              >
                <X size={17} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="bg-white hover:bg-[#7D1E22] hover:text-white text-[#6B6B6B] border border-[#E5DDD3] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs shrink-0"
            >
              ESC
            </button>

            {/* Autocomplete dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-[#E5DDD3] border-t-0 rounded-b-2xl shadow-xl z-20 overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => handleSuggestionClick(s)}
                    className="w-full text-left px-5 py-2.5 text-xs font-semibold text-[#1E1E1E] hover:bg-[#FAF8F5] hover:text-[#7D1E22] flex items-center gap-2 border-b border-[#F0EBE4] last:border-b-0 transition-colors"
                  >
                    <Search size={12} className="text-[#7D1E22] shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Results / Empty State ── */}
          <div
            className="max-h-[65vh] overflow-y-auto"
            onMouseDown={() => setShowSuggestions(false)}
          >
            {hasQuery ? (
              <div className="p-4 sm:p-5">
                {/* Result count + match quality badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-[#7D1E22]" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D1E22]">
                      {results.length} Smart Match{results.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  {results.length > 0 && (
                    <button
                      onClick={handleViewAll}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#7D1E22] hover:underline flex items-center gap-1"
                    >
                      View All <ArrowRight size={11} />
                    </button>
                  )}
                </div>

                {results.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-sm font-bold text-[#1E1E1E] mb-1">No matches for "{searchTerm}"</p>
                    <p className="text-xs text-[#6B6B6B]">
                      Try: lehenga, silk, haldi, kids kurta, sherwani, anarkali…
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.slice(0, 8).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className="flex items-center gap-3 p-3 rounded-2xl border border-[#E5DDD3] hover:border-[#7D1E22] bg-[#FAF8F5] cursor-pointer group transition-all hover:shadow-md"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-16 bg-white rounded-xl border border-[#E5DDD3] shrink-0 overflow-hidden">
                          <img
                            src={product.images?.[0] || product.image || '/images/products/midnight-graphic-tee.png'}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase font-bold tracking-widest text-[#7D1E22]">
                            {product.categoryName || product.category}
                          </span>
                          <h4 className="text-xs font-bold text-[#1E1E1E] group-hover:text-[#7D1E22] transition-colors leading-tight truncate mt-0.5">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-black text-[#1E1E1E]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-[#6B6B6B] line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            {product.discount && (
                              <span className="text-[9px] bg-[#7D1E22] text-white font-bold px-1.5 py-0.5 rounded-full">
                                {product.discount}
                              </span>
                            )}
                          </div>
                          {/* Match tags preview */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {(PRODUCT_TAGS[product.id] || []).slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[8px] bg-[#EFE8DE] text-[#7D1E22] font-bold uppercase px-1.5 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <ArrowRight
                          size={14}
                          className="text-[#CCBCB0] group-hover:text-[#7D1E22] group-hover:translate-x-1 transition-all shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ── Empty State: Quick Tag Shortcuts ── */
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] mb-4">
                  <Tag size={12} className="text-[#7D1E22]" />
                  <span>Quick Search by Tag</span>
                </div>

                {/* Tag chips grouped by category */}
                {[
                  {
                    label: '👗 Women',
                    tags: ['Anarkali', 'Lehenga', 'Sharara', 'Silk Kurti', 'Bridal'],
                  },
                  {
                    label: '🧒 Kids',
                    tags: ['Kids Kurta', 'Girls Lehenga', 'Boys Dhoti', 'Kids Sherwani'],
                  },
                  {
                    label: '🕌 Men',
                    tags: ['Chikankari', 'Haldi Kurta', 'Indo Western', 'Sherwani'],
                  },
                  {
                    label: '🎨 By Color',
                    tags: ['Yellow', 'Ivory', 'Maroon', 'Navy Blue', 'Pink', 'Black'],
                  },
                ].map((group) => (
                  <div key={group.label} className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-2">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchTerm(tag)}
                          className="bg-[#FAF8F5] hover:bg-[#7D1E22] hover:text-white text-[#1E1E1E] text-[11px] font-semibold px-3.5 py-1.5 rounded-full border border-[#E5DDD3] hover:border-[#7D1E22] transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
