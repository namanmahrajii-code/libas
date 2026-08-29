export const initialCategories = [
  { id: 'all', name: 'All Collections', sectionNumber: 'ALL', description: 'Curated modern ethnic & royal wedding fashion for Men, Women & Kids' },
  { id: 'new-arrivals', name: 'New Arrivals', sectionNumber: 'NEW', description: 'Fresh seasonal drops & latest handcrafted ethnic releases' },
  { id: 'women-ethnic', name: "Women's Ethnic & Festive", sectionNumber: '01', description: 'Chikankari Anarkalis, Bridal Lehengas, Sharara Sets & Pure Silk Kurtis' },
  { id: 'kids-ethnic', name: "Kids' Ethnic Collection", sectionNumber: '02', description: 'Festive Kurta Jacket Sets, Haldi Dhoti Kurtas, Lehenga Cholis & Miniature Sherwanis' },
  { id: 'kurtas', name: "Men's Chikankari & Silk", sectionNumber: '03', description: 'Handcrafted Lucknowi Chikankari & Pure Silk Kurta Sets with Churidar' },
  { id: 'festive-kurtas', name: "Men's Festive & Haldi", sectionNumber: '04', description: 'Vibrant Banarasi Jacquard, Mirror Work & Sequin Kurtas for Celebrations' },
  { id: 'indo-western', name: "Men's Indo-Western & Achkans", sectionNumber: '05', description: 'Contemporary Structured Bandhgalas & Floral Embroidered Achkans' },
  { id: 'sherwanis', name: 'Royal Wedding Sherwanis', sectionNumber: '06', description: 'Grand Zari & Zardozi Embroidered Groom & Reception Sherwanis' },
];

export const initialProducts = [
  // =========================================================================
  // 01 — WOMEN'S ETHNIC & FESTIVE WEAR (4 Products)
  // =========================================================================
  {
    id: 'prod_women_01',
    slug: 'ivory-chikankari-anarkali-suit',
    title: 'Ivory Chikankari Georgette Anarkali Set',
    subtitle: 'Handcrafted Lucknowi Jaal Embroidered Anarkali with Dupatta & Churidar',
    category: 'women-ethnic',
    categoryName: "WOMEN'S ETHNIC",
    color: 'Ivory Cream',
    type: 'Anarkali Suit Set',
    gender: 'Women',
    price: 3899,
    originalPrice: 7799,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 42,
    images: ['/images/products/women_anarkali_chikankari.jpg'],
    sizes: [
      { size: 'XS (34)', stock: 3 },
      { size: 'S (36)', stock: 5 },
      { size: 'M (38)', stock: 6 },
      { size: 'L (40)', stock: 4 },
      { size: 'XL (42)', stock: 2 },
    ],
    description: 'Breathtaking ivory cream floor-length flared Anarkali crafted from featherlight pure georgette, richly embellished with authentic Lucknowi Chikankari threadwork and subtle sequin highlights. Paired with a delicate embroidered border dupatta.',
    details: [
      'Pure Georgette with Hand-embroidered Lucknowi Jaal',
      'Flared kalidar silhouette with cotton inner lining',
      'Includes matching embroidered dupatta and cotton churidar',
      'Intricate floral sleeve cuffs and boat neckline'
    ],
    care: 'Dry clean only to maintain delicate Chikankari embroidery.',
    fitNote: 'Flattering flared Anarkali silhouette. True to size.'
  },
  {
    id: 'prod_women_02',
    slug: 'royal-maroon-velvet-bridal-lehenga',
    title: 'Royal Maroon Velvet Bridal Lehenga',
    subtitle: 'Grand Zardozi & Antique Gold Threadwork Wedding Lehenga Choli',
    category: 'women-ethnic',
    categoryName: "WOMEN'S ETHNIC",
    color: 'Royal Maroon / Antique Gold',
    type: 'Lehenga Choli Set',
    gender: 'Women',
    price: 8999,
    originalPrice: 17999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 56,
    images: ['/images/products/women_festive_lehenga.jpg'],
    sizes: [
      { size: 'S (36)', stock: 2 },
      { size: 'M (38)', stock: 4 },
      { size: 'L (40)', stock: 3 },
      { size: 'XL (42)', stock: 2 },
    ],
    description: 'An opulent royal maroon bridal masterpiece in micro-velvet, lavished with dense antique gold zardozi motifs, resham jaal, and handcrafted floral architecture. Comes with an embroidered sweetheart choli and sheer net veil dupatta.',
    details: [
      'Heavy Micro-Velvet with Grand Zardozi & Resham Embroidery',
      'Full 4.5 meter flared kalidar lehenga with double can-can layering',
      'Sweetheart neckline padded blouse with elbow sleeves',
      'Soft net dupatta with heavy 4-side zardozi borders'
    ],
    care: 'Strictly dry clean only. Store in muslin cloth bag.',
    fitNote: 'Grand bridal silhouette with custom tie-up waist dori.'
  },
  {
    id: 'prod_women_03',
    slug: 'blush-pink-mirror-work-sharara-set',
    title: 'Blush Pink Mirror Work Sharara Set',
    subtitle: 'Contemporary Georgette Short Kurti & Tiered Flared Sharara with Dupatta',
    category: 'women-ethnic',
    categoryName: "WOMEN'S ETHNIC",
    color: 'Blush Pink / Rose Gold',
    type: 'Sharara Set',
    gender: 'Women',
    price: 3499,
    originalPrice: 6999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    images: ['/images/products/women_sharara_set.jpg'],
    sizes: [
      { size: 'XS (34)', stock: 2 },
      { size: 'S (36)', stock: 5 },
      { size: 'M (38)', stock: 6 },
      { size: 'L (40)', stock: 3 },
    ],
    description: 'Enchanting pastel blush pink sharara ensemble crafted in lightweight flowy georgette, accented with dazzling real mirror-work borders and delicate foil accents. Perfect for Sangeet nights and festive weddings.',
    details: [
      'Flowy Georgette with Real Mirror & Gota Patti Work',
      'Short sleeveless/cap-sleeve designer kurti with back tie-up',
      'Tiered wide-flare sharara pants with elasticated waistband',
      'Tonal sheer georgette dupatta with scallop borders'
    ],
    care: 'Dry clean recommended.',
    fitNote: 'Modern festive regular fit.'
  },
  {
    id: 'prod_women_04',
    slug: 'mustard-yellow-silk-kurti-palazzo',
    title: 'Mustard Silk Gota Patti Kurti Palazzo Set',
    subtitle: 'Chanderi Silk Straight Festive Kurti with Flared Palazzo & Organza Dupatta',
    category: 'women-ethnic',
    categoryName: "WOMEN'S ETHNIC",
    color: 'Mustard Yellow / Gold',
    type: 'Kurti Palazzo Set',
    gender: 'Women',
    price: 2899,
    originalPrice: 5799,
    discount: '50% OFF',
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 31,
    images: ['/images/products/women_silk_kurti_palazzo.jpg'],
    sizes: [
      { size: 'S (36)', stock: 4 },
      { size: 'M (38)', stock: 7 },
      { size: 'L (40)', stock: 5 },
      { size: 'XL (42)', stock: 3 },
    ],
    description: 'Vibrant celebratory mustard golden yellow straight kurti cut from rich Chanderi silk with handcrafted gota patti neckline embroidery. Paired with coordinating wide-leg palazzo trousers and a sheer embroidered organza dupatta.',
    details: [
      'Pure Chanderi Silk with Golden Gota Patti Neckline',
      'Flared wide palazzo pants with matching hem border',
      'Includes premium organza floral dupatta with gota edges',
      'Breathable santoon inner lining for all-day celebrations'
    ],
    care: 'Dry clean only to maintain fabric sheen.',
    fitNote: 'Straight regular fit, ideal for Haldi & daytime poojas.'
  },

  // =========================================================================
  // 02 — KIDS' ETHNIC & FESTIVE COLLECTION (4 Products)
  // =========================================================================
  {
    id: 'prod_kids_01',
    slug: 'kids-royal-blue-kurta-nehru-jacket-set',
    title: 'Kids Royal Blue Silk Kurta & Brocade Jacket Set',
    subtitle: '3-Piece Festive Set: Silk Kurta, Brocade Nehru Waistcoat & Pajama',
    category: 'kids-ethnic',
    categoryName: "KIDS' ETHNIC",
    color: 'Royal Blue / Gold',
    type: 'Kids Kurta Jacket Set',
    gender: 'Kids',
    price: 1899,
    originalPrice: 3799,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 28,
    images: ['/images/products/kids_kurta_jacket_set.jpg'],
    sizes: [
      { size: '2-3 Yrs', stock: 3 },
      { size: '4-5 Yrs', stock: 5 },
      { size: '6-7 Yrs', stock: 6 },
      { size: '8-9 Yrs', stock: 4 },
      { size: '10-11 Yrs', stock: 3 },
    ],
    description: 'Charming 3-piece festive ethnic set for young boys. Features a rich royal blue silk kurta paired with a lustrous cream and gold floral Banarasi brocade Nehru waistcoat and comfortable cream churidar pajama.',
    details: [
      'Art Silk Kurta with Cotton Inner Lining (Skin-friendly for kids)',
      'Detachable floral brocade Nehru jacket with metallic buttons and pocket square',
      'Elasticated waistband pajama for active playtime comfort',
      'Non-scratchy seam construction'
    ],
    care: 'Dry clean recommended or gentle hand wash.',
    fitNote: 'Comfortable kids regular festive fit.'
  },
  {
    id: 'prod_kids_02',
    slug: 'kids-haldi-yellow-dhoti-kurta-set',
    title: 'Kids Haldi Yellow Raw Silk Dhoti Kurta Set',
    subtitle: 'Festive Golden Yellow Kurta with Readymade Maroon Border Dhoti',
    category: 'kids-ethnic',
    categoryName: "KIDS' ETHNIC",
    color: 'Haldi Yellow / Maroon',
    type: 'Kids Dhoti Kurta Set',
    gender: 'Kids',
    price: 1699,
    originalPrice: 3399,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 34,
    images: ['/images/products/kids_haldi_dhoti_kurta.jpg'],
    sizes: [
      { size: '2-3 Yrs', stock: 4 },
      { size: '4-5 Yrs', stock: 6 },
      { size: '6-7 Yrs', stock: 5 },
      { size: '8-9 Yrs', stock: 3 },
    ],
    description: 'Vibrant celebratory golden yellow raw silk kurta with subtle neckline threadwork, paired with a hassle-free pre-stitched maroon dhoti featuring a traditional gold zari border. Perfect for festive rituals and wedding ceremonies.',
    details: [
      'Soft Raw Silk Blend with 100% Cotton Lining',
      'Pre-stitched elasticated pull-on dhoti (easy to wear)',
      'Rich golden zari border along dhoti pleats',
      'Comfortable side slits on kurta'
    ],
    care: 'Hand wash in cold water.',
    fitNote: 'Relaxed easy-wear kids fit.'
  },
  {
    id: 'prod_kids_03',
    slug: 'kids-girls-pink-mint-lehenga-choli',
    title: 'Kids Girls Pastel Pink & Mint Silk Lehenga Set',
    subtitle: 'Embroidered Silk Choli, Flared Kalidar Lehenga & Ruffled Net Dupatta',
    category: 'kids-ethnic',
    categoryName: "KIDS' ETHNIC",
    color: 'Pastel Pink / Mint Green',
    type: 'Kids Lehenga Choli',
    gender: 'Kids',
    price: 2199,
    originalPrice: 4399,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 41,
    images: ['/images/products/kids_girls_lehenga_choli.jpg'],
    sizes: [
      { size: '2-3 Yrs', stock: 2 },
      { size: '4-5 Yrs', stock: 5 },
      { size: '6-7 Yrs', stock: 6 },
      { size: '8-9 Yrs', stock: 4 },
      { size: '10-11 Yrs', stock: 2 },
    ],
    description: 'Fairytale festive lehenga set for little girls. Features a pastel pink embroidered silk choli with puff sleeves, paired with a dual-tone mint green and pink kalidar skirt adorned with mirror work, and a pre-stitched ruffled net dupatta.',
    details: [
      'Pure Silk Brocade with Foil Mirror Work & Ruffled Net',
      'Soft cotton lining throughout to ensure zero irritation on delicate skin',
      'Elasticated lehenga waistband with decorative side latkans',
      'Lightweight construction for ease of dancing and movement'
    ],
    care: 'Dry clean recommended.',
    fitNote: 'Flared festive fit.'
  },
  {
    id: 'prod_kids_04',
    slug: 'kids-ivory-gold-royal-wedding-sherwani',
    title: 'Kids Royal Ivory & Gold Miniature Sherwani Set',
    subtitle: 'Grand Zari Embroidered Groom-Style Kids Sherwani with Churidar & Stole',
    category: 'kids-ethnic',
    categoryName: "KIDS' ETHNIC",
    color: 'Ivory Gold / Cream',
    type: 'Kids Sherwani Set',
    gender: 'Kids',
    price: 2499,
    originalPrice: 4999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 23,
    images: ['/images/products/kids_royal_sherwani.jpg'],
    sizes: [
      { size: '3-4 Yrs', stock: 2 },
      { size: '5-6 Yrs', stock: 4 },
      { size: '7-8 Yrs', stock: 5 },
      { size: '9-10 Yrs', stock: 3 },
    ],
    description: 'A stately royal miniature sherwani designed for weddings and grand family functions. Tailored in ivory silk with intricate gold zari brocade, ornamental metal buttons, matching churidar, and an embellished brocade shoulder stole.',
    details: [
      'Brocade Silk with Antique Gold Zari Embroidery',
      'Includes matching miniature stole and stretch cream churidar',
      'Soft breathable lining with padded collar structure',
      'Regal look tailored specially for young boys'
    ],
    care: 'Dry clean only in protective cover.',
    fitNote: 'Regal structured kids fit.'
  },

  // =========================================================================
  // 03 — MEN'S CHIKANKARI & SILK KURTAS (4 Products)
  // =========================================================================
  {
    id: 'prod_libas_01',
    slug: 'chikankari-cream-silk-kurta',
    title: 'Ivory Cream Chikankari Kurta Set',
    subtitle: 'Handcrafted Lucknowi Threadwork Silk Blend Kurta with Churidar',
    category: 'kurtas',
    categoryName: 'CHIKANKARI KURTAS',
    color: 'Ivory Cream',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2499,
    originalPrice: 4999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    images: ['/images/products/cream_chikankari_kurta.jpg', '/images/products/libas_outfit_1.jpg'],
    sizes: [
      { size: '38 (S)', stock: 4 },
      { size: '40 (M)', stock: 6 },
      { size: '42 (L)', stock: 5 },
      { size: '44 (XL)', stock: 3 },
    ],
    description: 'Exquisite ivory cream silk-cotton blend kurta embellished with delicate all-over tone-on-tone Lucknowi Chikankari embroidery. Designed with a classic mandarin collar, side pockets, and paired with tailored off-white trousers.',
    details: [
      'Premium Silk-Cotton Blend with Fine Chikankari Stitchwork',
      'Mandarin collar with subtle embroidered placket buttons',
      'Includes matching tailored off-white stretch churidar/pajama',
      'Soft breathable inner lining for all-day festive comfort'
    ],
    care: 'Dry clean recommended. Gentle hand wash in cold water.',
    fitNote: 'Tailored ethnic silhouette. True to size with a graceful straight fall.'
  },
  {
    id: 'prod_libas_02',
    slug: 'classic-white-georgette-chikankari-kurta',
    title: 'Pure White Georgette Chikankari Kurta',
    subtitle: 'Intricate Lucknowi Shadow Work Kurta Set with Inner Lining',
    category: 'kurtas',
    categoryName: 'CHIKANKARI KURTAS',
    color: 'Pure White',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2599,
    originalPrice: 5199,
    discount: '50% OFF',
    isNew: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 42,
    images: ['/images/products/classic_white_chikankari_kurta.jpg', '/images/products/libas_outfit_8.jpg'],
    sizes: [
      { size: '38 (S)', stock: 3 },
      { size: '40 (M)', stock: 8 },
      { size: '42 (L)', stock: 6 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Timeless pure white artisanal Chikankari kurta crafted on lightweight georgette with pure cotton inner lining. Showcases intricate floral jaal motifs and an elegant buttoned neckline.',
    details: [
      'Breathable Georgette with 100% Cotton Lining',
      'All-over Lucknowi jaal embroidery on front and sleeves',
      'Side slits with functional deep pockets',
      'Paired with crisp white cotton pajama'
    ],
    care: 'Dry clean only to maintain embroidery sheen.',
    fitNote: 'Comfortable regular ethnic fit.'
  },
  {
    id: 'prod_libas_03',
    slug: 'mint-green-embroidered-silk-kurta',
    title: 'Pastel Mint Embroidered Kurta Set',
    subtitle: 'Hand Embroidered Neckline Chanderi Silk Kurta Pajama',
    category: 'kurtas',
    categoryName: 'SILK KURTAS',
    color: 'Mint Green',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2299,
    originalPrice: 4599,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 29,
    images: ['/images/products/mint_green_embroidered_kurta.jpg', '/images/products/libas_outfit_3.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 5 },
      { size: '42 (L)', stock: 4 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Refreshing pastel mint green kurta tailored from rich Chanderi silk blend. Highlights intricate neckline embroidery with metallic dabka accents, styled with classic white churidar.',
    details: [
      'Fine Chanderi Silk Blend with Natural Sheen',
      'Subtle metallic zardozi detailing on mandarin band',
      'Comfortable side pockets and straight hem',
      'Includes premium white churidar'
    ],
    care: 'Dry clean recommended.',
    fitNote: 'Tailored fit for poojas, daytime weddings, and festive occasions.'
  },
  {
    id: 'prod_libas_04',
    slug: 'sage-green-textured-silk-kurta',
    title: 'Sage Olive Textured Silk Kurta Set',
    subtitle: 'Contemporary Minimalist Thread Embroidery Kurta Set',
    category: 'kurtas',
    categoryName: 'SILK KURTAS',
    color: 'Sage Green',
    type: 'Kurta Pajama Set',
    gender: 'Men',
    price: 2299,
    originalPrice: 4499,
    discount: '49% OFF',
    isNew: false,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 21,
    images: ['/images/products/sage_green_silk_kurta.jpg', '/images/products/libas_outfit_9.jpg'],
    sizes: [
      { size: '38 (S)', stock: 3 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 1 },
    ],
    description: 'Modern understated luxury in earthy sage olive green. Cut in premium raw silk blend with subtle self-textured slubs and delicate thread accents.',
    details: [
      'Textured Slub Raw Silk Blend',
      'Refined minimal bandhgala collar styling',
      'Full sleeves with slit cuffs',
      'Includes matching white trousers'
    ],
    care: 'Gentle hand wash or dry clean.',
    fitNote: 'Modern slim-straight fit.'
  },

  // =========================================================================
  // 04 — MEN'S FESTIVE & HALDI KURTAS (3 Products)
  // =========================================================================
  {
    id: 'prod_libas_05',
    slug: 'haldi-yellow-jacquard-silk-kurta',
    title: 'Royal Haldi Yellow Jacquard Kurta',
    subtitle: 'Self-Weave Jacquard Silk Festive Kurta for Weddings & Haldi',
    category: 'festive-kurtas',
    categoryName: 'FESTIVE KURTAS',
    color: 'Haldi Yellow / Gold',
    type: 'Festive Kurta Set',
    gender: 'Men',
    price: 2399,
    originalPrice: 4799,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 46,
    images: ['/images/products/haldi_yellow_silk_kurta.jpg', '/images/products/libas_outfit_4.jpg'],
    sizes: [
      { size: '38 (S)', stock: 5 },
      { size: '40 (M)', stock: 7 },
      { size: '42 (L)', stock: 6 },
      { size: '44 (XL)', stock: 4 },
    ],
    description: 'Vibrant celebratory golden yellow kurta woven in intricate self-jacquard motifs. The ideal ensemble for Haldi ceremonies, Sangeet functions, and Diwali festivities.',
    details: [
      'Lustrous Banarasi Jacquard Silk Weave',
      'Mandarin collar with tonal loop button details',
      'Side vents and deep pockets',
      'Complete with ivory white churidar'
    ],
    care: 'Dry clean recommended to preserve gold luster.',
    fitNote: 'Regular ethnic fit for easy movement during rituals and celebrations.'
  },
  {
    id: 'prod_libas_06',
    slug: 'rust-brown-copper-printed-silk-kurta',
    title: 'Rust Copper Printed Silk Kurta Set',
    subtitle: 'Geometric Micro-Print Festive Silk Kurta with Mandarin Collar',
    category: 'festive-kurtas',
    categoryName: 'FESTIVE KURTAS',
    color: 'Rust Brown / Copper',
    type: 'Festive Kurta Set',
    gender: 'Men',
    price: 2199,
    originalPrice: 4299,
    discount: '49% OFF',
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 31,
    images: ['/images/products/rust_brown_festive_kurta.jpg', '/images/products/libas_outfit_2.jpg'],
    sizes: [
      { size: '38 (S)', stock: 4 },
      { size: '40 (M)', stock: 5 },
      { size: '42 (L)', stock: 4 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Warm copper-rust festive kurta styled with geometric micro-print motifs and antique brass buttons. Offers a distinct traditional aesthetic with modern tailoring.',
    details: [
      'Art Silk with Metallic Foil & Micro Print',
      'Concealed placket with decorative buttons',
      'Comfortable breathable lining',
      'Paired with ivory white churidar'
    ],
    care: 'Hand wash cold or dry clean.',
    fitNote: 'Straight fit.'
  },
  {
    id: 'prod_libas_07',
    slug: 'midnight-black-sequin-mirror-kurta',
    title: 'Midnight Black Sequin Mirror Kurta',
    subtitle: 'Shimmer Mirror & Sequin Threadwork Kurta Set with Trousers',
    category: 'festive-kurtas',
    categoryName: 'FESTIVE KURTAS',
    color: 'Midnight Black',
    type: 'Festive Kurta Set',
    gender: 'Men',
    price: 2799,
    originalPrice: 5499,
    discount: '49% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 54,
    images: ['/images/products/midnight_black_sequin_kurta.jpg', '/images/products/libas_outfit_5.jpg'],
    sizes: [
      { size: '38 (S)', stock: 3 },
      { size: '40 (M)', stock: 7 },
      { size: '42 (L)', stock: 5 },
      { size: '44 (XL)', stock: 3 },
    ],
    description: 'Showstopping evening wear in jet black with subtle tonal sequins that catch the light effortlessly. Ideal for Sangeet nights, cocktail parties, and grand receptions.',
    details: [
      'Premium Georgette with Sequin Embellishments & Cotton Lining',
      'Mandarin collar with sequin border',
      'Includes matching jet black tailored trousers',
      'Dual side slits and pockets'
    ],
    care: 'Dry clean only.',
    fitNote: 'Tailored fit for a striking evening silhouette.'
  },

  // =========================================================================
  // 05 — MEN'S INDO-WESTERN & ACHKANS (3 Products)
  // =========================================================================
  {
    id: 'prod_libas_08',
    slug: 'blush-pink-floral-indo-western-achkan',
    title: 'Blush Pink Floral Indo-Western Achkan',
    subtitle: 'Intricate Floral Embroidered Indo-Western Bandhgala with Trousers',
    category: 'indo-western',
    categoryName: 'INDO-WESTERN',
    color: 'Blush Pink / Rose Gold',
    type: 'Indo-Western Set',
    gender: 'Men',
    price: 4499,
    originalPrice: 8999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 37,
    images: ['/images/products/blush_pink_indo_western.jpg', '/images/products/libas_outfit_6.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Royal pastel blush pink structured Indo-Western Achkan jacket featuring intricate all-over floral threadwork. Offers a regal front-slit design paired with crisp off-white trousers.',
    details: [
      'Heavy Raw Silk Jacquard with Resham Threadwork',
      'Front open buttoned placket with structured shoulder pads',
      'Dual concealed pockets and premium satin lining',
      'Includes tailored stretch trousers'
    ],
    care: 'Strictly dry clean only.',
    fitNote: 'Structured designer fit. Elevates the groom or wedding guest look.'
  },
  {
    id: 'prod_libas_11',
    slug: 'midnight-onyx-embroidered-bandhgala',
    title: 'Midnight Onyx Embroidered Bandhgala',
    subtitle: 'Contemporary Tuxedo-Style Indo-Western Set with Tonal Accents',
    category: 'indo-western',
    categoryName: 'INDO-WESTERN',
    color: 'Midnight Black',
    type: 'Indo-Western Set',
    gender: 'Men',
    price: 4799,
    originalPrice: 9499,
    discount: '49% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 28,
    images: ['/images/products/midnight_black_sequin_kurta.jpg', '/images/products/libas_outfit_5.jpg'],
    sizes: [
      { size: '38 (S)', stock: 3 },
      { size: '40 (M)', stock: 5 },
      { size: '42 (L)', stock: 4 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'A sharp, architectural black Indo-Western Bandhgala designed with modern asymmetric placket and micro-mirror embellishments for high-profile evening celebrations.',
    details: [
      'Structured Italian Poly-Viscose with Velvet Collar Trims',
      'Asymmetric overlap front with antique metallic buttons',
      'Full inner satin lining with double inner pockets',
      'Includes slim-fit matching black trousers'
    ],
    care: 'Dry clean only.',
    fitNote: 'Modern tailored slim fit.'
  },
  {
    id: 'prod_libas_12',
    slug: 'sage-mint-floral-achkan-suit',
    title: 'Sage Mint Floral Embroidered Achkan',
    subtitle: 'Artisanal Resham Thread Embroidered Longline Indo-Western Jacket',
    category: 'indo-western',
    categoryName: 'INDO-WESTERN',
    color: 'Sage Mint',
    type: 'Indo-Western Set',
    gender: 'Men',
    price: 4299,
    originalPrice: 8599,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 22,
    images: ['/images/products/sage_green_silk_kurta.jpg', '/images/products/libas_outfit_9.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 1 },
    ],
    description: 'Refreshing pastel sage green longline Indo-Western Achkan set accented with delicate ivory botanical motifs and paired with contrast cream trousers.',
    details: [
      'Chanderi Raw Silk Blend with Tone-on-Tone Resham Work',
      'Classic high band collar with decorative metallic buttoning',
      'Includes premium stretch cotton trousers',
      'Dual side slits for relaxed comfort'
    ],
    care: 'Dry clean only.',
    fitNote: 'Tailored ethnic silhouette.'
  },

  // =========================================================================
  // 06 — ROYAL WEDDING SHERWANIS (4 Products)
  // =========================================================================
  {
    id: 'prod_libas_09',
    slug: 'royal-navy-blue-embellished-sherwani',
    title: 'Royal Navy Blue Embellished Sherwani',
    subtitle: 'Sequined Bandhgala Indo-Western Sherwani for Reception & Sangeet',
    category: 'sherwanis',
    categoryName: 'WEDDING SHERWANIS',
    color: 'Royal Navy Blue',
    type: 'Sherwani Set',
    gender: 'Men',
    price: 4999,
    originalPrice: 9999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 49,
    images: ['/images/products/royal_navy_sherwani.jpg', '/images/products/libas_outfit_7.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 5 },
      { size: '42 (L)', stock: 4 },
      { size: '44 (XL)', stock: 2 },
    ],
    description: 'Opulent midnight navy blue sherwani adorned with micro-sequins and tone-on-tone embroidery across the torso and sleeves. Center slit cut creates an imposing, stately royal stature.',
    details: [
      'Heavy Brocade Silk with Metallic Sequin Embroidery',
      'High mandarin bandhgala collar with custom velvet buttons',
      'Full inner lining and structured chest architecture',
      'Complete with ivory white churidar'
    ],
    care: 'Dry clean only.',
    fitNote: 'Regal structured fit.'
  },
  {
    id: 'prod_libas_10',
    slug: 'royal-cream-gold-zari-wedding-sherwani',
    title: 'Royal Cream & Gold Zari Wedding Sherwani',
    subtitle: 'Heavy Handcrafted Zardozi & Resham Embroidered Groom Sherwani',
    category: 'sherwanis',
    categoryName: 'WEDDING SHERWANIS',
    color: 'Ivory Gold / Cream',
    type: 'Sherwani Set',
    gender: 'Men',
    price: 5999,
    originalPrice: 11999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 62,
    images: ['/images/products/luxury_cream_gold_sherwani.jpg', '/images/products/libas_outfit_10.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 1 },
    ],
    description: 'The pinnacle of wedding heritage — a mastercrafted ivory cream sherwani intricately hand-embroidered with antique gold zari, zardozi work, and subtle resham accents for the discerning Indian groom.',
    details: [
      'Pure Silk Brocade with Handcrafted Zari & Zardozi Work',
      'Ornate collar and pocket square welt with matching buttons',
      'Padded shoulders and full breathable satin lining',
      'Includes premium cream churidar'
    ],
    care: 'Dry clean only in protective garment bag.',
    fitNote: 'Grand royal wedding silhouette.'
  },
  {
    id: 'prod_libas_13',
    slug: 'regal-ivory-lucknowi-groom-sherwani',
    title: 'Regal Ivory Lucknowi Groom Sherwani',
    subtitle: 'Heavy Chikankari Threadwork & Pearl Work Sherwani Set',
    category: 'sherwanis',
    categoryName: 'WEDDING SHERWANIS',
    color: 'Ivory Pearl',
    type: 'Sherwani Set',
    gender: 'Men',
    price: 5499,
    originalPrice: 10999,
    discount: '50% OFF',
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 34,
    images: ['/images/products/cream_chikankari_kurta.jpg', '/images/products/libas_outfit_1.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 3 },
      { size: '42 (L)', stock: 3 },
      { size: '44 (XL)', stock: 1 },
    ],
    description: 'Artisanal masterpiece created with grand Lucknowi tone-on-tone jaal embroidery, accented with tiny seed pearls and paired with matching silk churidar.',
    details: [
      'Handcrafted Silk-Georgette with Mukaish and Seed Pearl Work',
      'Embroidered cuffs and mandarin collar border',
      'Full inner satin lining for structured drape',
      'Includes ivory silk churidar'
    ],
    care: 'Specialist dry clean only.',
    fitNote: 'Grand wedding groom fit.'
  },
  {
    id: 'prod_libas_14',
    slug: 'sovereign-white-reception-sherwani',
    title: 'Sovereign White Brocade Reception Sherwani',
    subtitle: 'Zari Bordered Contemporary Groom & Reception Sherwani',
    category: 'sherwanis',
    categoryName: 'WEDDING SHERWANIS',
    color: 'Pure White / Silver',
    type: 'Sherwani Set',
    gender: 'Men',
    price: 5299,
    originalPrice: 10599,
    discount: '50% OFF',
    isNew: false,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 27,
    images: ['/images/products/classic_white_chikankari_kurta.jpg', '/images/products/libas_outfit_8.jpg'],
    sizes: [
      { size: '38 (S)', stock: 2 },
      { size: '40 (M)', stock: 4 },
      { size: '42 (L)', stock: 2 },
      { size: '44 (XL)', stock: 1 },
    ],
    description: 'Crisp, contemporary white brocade sherwani with fine silver zari weave. Perfect for wedding receptions, engagement banquets, and grand celebrations.',
    details: [
      'Pure Jacquard Brocade Silk in Crisp White',
      'Silver metallic metal crest buttons',
      'Includes matching silk trousers',
      'Chest pocket with pre-folded matching square'
    ],
    care: 'Dry clean only.',
    fitNote: 'Sharp regal silhouette.'
  },
];

export const getCatalogSections = (productsList = initialProducts) => {
  const newArrivals = productsList.filter((p) => p.isNew === true);
  const womenEthnic = productsList.filter((p) => p.category === 'women-ethnic');
  const kidsEthnic = productsList.filter((p) => p.category === 'kids-ethnic');
  const kurtas = productsList.filter((p) => p.category === 'kurtas');
  const festiveKurtas = productsList.filter((p) => p.category === 'festive-kurtas');
  const indoWestern = productsList.filter((p) => p.category === 'indo-western');
  const sherwanis = productsList.filter((p) => p.category === 'sherwanis');

  const sections = [];

  if (newArrivals.length > 0) {
    sections.push({
      id: 'new-arrivals',
      sectionNumber: '00',
      title: '00 — NEW ARRIVALS',
      subtitle: 'Freshly arrived festive collections for Men, Women & Kids',
      badge: 'FRESH DROPS',
      products: newArrivals,
    });
  }

  if (womenEthnic.length > 0) {
    sections.push({
      id: 'women-ethnic',
      sectionNumber: '01',
      title: "01 — WOMEN'S ETHNIC & FESTIVE WEAR",
      subtitle: 'Chikankari Anarkalis, Bridal Velvet Lehengas & Mirror Work Sharara Sets',
      badge: 'EXCLUSIVE WOMEN',
      products: womenEthnic,
    });
  }

  if (kidsEthnic.length > 0) {
    sections.push({
      id: 'kids-ethnic',
      sectionNumber: '02',
      title: "02 — KIDS' ETHNIC & FESTIVE COLLECTION",
      subtitle: 'Festive Kurta Jacket Sets, Haldi Dhoti Kurtas & Miniature Sherwanis',
      badge: 'KIDS SPECIAL',
      products: kidsEthnic,
    });
  }

  if (kurtas.length > 0) {
    sections.push({
      id: 'kurtas',
      sectionNumber: '03',
      title: "03 — MEN'S CHIKANKARI & SILK KURTAS",
      subtitle: 'Handcrafted Lucknowi threadwork & fine silk kurta sets with churidar',
      badge: 'HOT FAVOURITE',
      products: kurtas,
    });
  }

  if (festiveKurtas.length > 0) {
    sections.push({
      id: 'festive-kurtas',
      sectionNumber: '04',
      title: "04 — MEN'S FESTIVE & HALDI KURTAS",
      subtitle: 'Vibrant Haldi yellows, mirror sequin & rich copper festive kurtas',
      badge: 'FESTIVE EDIT',
      products: festiveKurtas,
    });
  }

  if (indoWestern.length > 0) {
    sections.push({
      id: 'indo-western',
      sectionNumber: '05',
      title: "05 — MEN'S INDO-WESTERN & ACHKANS",
      subtitle: 'Structured designer bandhgalas & floral embroidered achkans with trousers',
      badge: 'DESIGNER CUT',
      products: indoWestern,
    });
  }

  if (sherwanis.length > 0) {
    sections.push({
      id: 'sherwanis',
      sectionNumber: '06',
      title: '06 — ROYAL WEDDING SHERWANIS',
      subtitle: 'Handcrafted zari, zardozi & sequined wedding sherwanis for grooms & receptions',
      badge: 'ROYAL HERITAGE',
      products: sherwanis,
    });
  }

  return sections;
};
