/* ====================================
   AMAZON CLONE — PRODUCT DATA
   ==================================== */

const PRODUCTS = [
  {
    id: 1,
    title: "Nova X20 Smartphone – 6.7\" AMOLED, 50MP Triple Camera, 5000mAh Battery",
    brand: "Nova Electronics",
    category: "electronics",
    price: 18999,
    originalPrice: 29999,
    discount: 37,
    rating: 4.3,
    reviewCount: 12847,
    image: "product_phone.png",
    badge: "37% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "Tomorrow",
    description: "Experience next-generation smartphone performance with the Nova X20. Featuring a stunning 6.7-inch Super AMOLED display with 120Hz refresh rate.",
    features: [
      "6.7\" Super AMOLED 120Hz display",
      "50MP + 12MP + 5MP Triple Camera System",
      "5000mAh battery with 67W fast charging",
      "8GB RAM + 128GB Storage (expandable)",
      "Android 14 | 5G Ready",
      "Under-display fingerprint sensor"
    ]
  },
  {
    id: 2,
    title: "Aurora Pro Wireless Headphones – Active Noise Cancellation, 40hr Battery",
    brand: "Aurora Sound",
    category: "electronics",
    price: 7999,
    originalPrice: 15999,
    discount: 50,
    rating: 4.5,
    reviewCount: 8923,
    image: "product_headphones.png",
    badge: "50% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "2 days",
    description: "Immerse yourself in studio-quality sound with Aurora Pro's industry-leading Active Noise Cancellation technology.",
    features: [
      "Industry-leading Active Noise Cancellation",
      "40-hour battery life",
      "Premium leather ear cushions",
      "Multipoint Bluetooth 5.3 connectivity",
      "Hi-Res Audio certified",
      "Foldable design with carrying case"
    ]
  },
  {
    id: 3,
    title: "SlimBook Pro 14\" Laptop – Intel Core i7, 16GB RAM, 512GB SSD, 2K Display",
    brand: "SlimBook",
    category: "electronics",
    price: 62999,
    originalPrice: 89999,
    discount: 30,
    rating: 4.4,
    reviewCount: 3421,
    image: "product_laptop.png",
    badge: "30% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "Tomorrow",
    description: "The SlimBook Pro 14 redefines portable performance. Ultra-thin aluminum chassis houses powerful Intel Core i7 internals.",
    features: [
      "14\" 2K IPS Display, 100% sRGB",
      "Intel Core i7-13th Gen Processor",
      "16GB LPDDR5 RAM",
      "512GB NVMe SSD",
      "Intel Iris Xe Graphics",
      "Backlit keyboard, fingerprint reader",
      "13 hours battery life"
    ]
  },
  {
    id: 4,
    title: "FitPulse SmartWatch – GPS, Heart Rate Monitor, Blood Oxygen, 7-day Battery",
    brand: "FitPulse",
    category: "electronics",
    price: 4499,
    originalPrice: 9999,
    discount: 55,
    rating: 4.2,
    reviewCount: 21056,
    image: "product_watch.png",
    badge: "55% off",
    isPrime: false,
    inStock: true,
    deliveryDate: "3 days",
    description: "Track your fitness journey with FitPulse SmartWatch. Built-in GPS, advanced health monitoring, and a vibrant AMOLED display.",
    features: [
      "1.43\" AMOLED Always-on Display",
      "Built-in GPS + GLONASS",
      "Heart Rate & SpO2 monitoring",
      "100+ Sports Modes",
      "7-day battery life",
      "5ATM water resistance",
      "Sleep & Stress monitoring"
    ]
  },
  {
    id: 5,
    title: "Men's Premium Cotton Polo T-Shirt – Regular Fit, Breathable Fabric",
    brand: "StyleHub",
    category: "fashion",
    price: 599,
    originalPrice: 1499,
    discount: 60,
    rating: 4.1,
    reviewCount: 5432,
    image: "product_headphones.png",
    badge: "60% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "Tomorrow",
    description: "Premium 100% cotton polo t-shirt for everyday comfort. Regular fit design suitable for casual and semi-formal occasions.",
    features: [
      "100% combed cotton fabric",
      "Regular fit design",
      "Available in 8 colors",
      "Machine washable",
      "Ribbed collar and cuffs",
      "Sizes: S to 4XL"
    ]
  },
  {
    id: 6,
    title: "Women's Casual Sneakers – Lightweight, Memory Foam Insole, Non-slip",
    brand: "ComfortStep",
    category: "fashion",
    price: 1299,
    originalPrice: 3499,
    discount: 63,
    rating: 4.3,
    reviewCount: 7831,
    image: "product_watch.png",
    badge: "63% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "2 days",
    description: "Walk in comfort all day with ComfortStep sneakers. Memory foam insole provides exceptional cushioning for your every step.",
    features: [
      "Memory foam cushioned insole",
      "Lightweight EVA sole",
      "Breathable mesh upper",
      "Non-slip rubber outsole",
      "Available in 6 colors",
      "Sizes: 3 to 9 UK"
    ]
  },
  {
    id: 7,
    title: "Stainless Steel Pressure Cooker 5L – Induction Compatible, ISI Certified",
    brand: "KitchenPro",
    category: "home",
    price: 1899,
    originalPrice: 3499,
    discount: 46,
    rating: 4.4,
    reviewCount: 18762,
    image: "product_phone.png",
    badge: "46% off",
    isPrime: false,
    inStock: true,
    deliveryDate: "3 days",
    description: "Cook faster and healthier with KitchenPro's premium stainless steel pressure cooker. ISI certified for safety.",
    features: [
      "Premium 304 stainless steel",
      "5 Litre capacity",
      "Induction and gas compatible",
      "ISI & CE certified",
      "Multi-layer safety valve",
      "Ergonomic bakelite handles",
      "10-year manufacturer warranty"
    ]
  },
  {
    id: 8,
    title: "Atomic Habits by James Clear – Paperback Bestseller",
    brand: "Penguin Random House",
    category: "books",
    price: 349,
    originalPrice: 799,
    discount: 56,
    rating: 4.7,
    reviewCount: 45623,
    image: "product_laptop.png",
    badge: "56% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "Tomorrow",
    description: "The #1 New York Times bestseller. A revolutionary system to get 1% better every day. Transform your life with tiny habits.",
    features: [
      "Author: James Clear",
      "320 pages, Paperback",
      "Language: English",
      "Publisher: Penguin Random House",
      "ISBN: 978-0735224292",
      "#1 Bestseller in Self-Help"
    ]
  },
  {
    id: 9,
    title: "Vitamin C Face Serum 30ml – 20% Vitamin C + Hyaluronic Acid, Brightening",
    brand: "GlowUp Beauty",
    category: "beauty",
    price: 499,
    originalPrice: 1299,
    discount: 62,
    rating: 4.2,
    reviewCount: 9341,
    image: "product_headphones.png",
    badge: "62% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "2 days",
    description: "Brighten and even your skin tone with GlowUp's advanced Vitamin C Serum. Formulated with 20% L-Ascorbic Acid and Hyaluronic Acid.",
    features: [
      "20% pure Vitamin C (L-Ascorbic Acid)",
      "Hyaluronic Acid for hydration",
      "Niacinamide for pore minimization",
      "Dermatologist tested",
      "Suitable for all skin types",
      "Vegan & cruelty-free",
      "30ml / 60 days supply"
    ]
  },
  {
    id: 10,
    title: "Adjustable Dumbbell Set 5-52.5 lbs – Quick Adjust, Space-Saving Design",
    brand: "IronFlex",
    category: "sports",
    price: 8499,
    originalPrice: 18999,
    discount: 55,
    rating: 4.6,
    reviewCount: 4231,
    image: "product_phone.png",
    badge: "55% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "3 days",
    description: "Replace 15 sets of dumbbells with one! IronFlex adjustable dumbbells allow quick weight changes from 5 to 52.5 lbs.",
    features: [
      "Adjusts 5-52.5 lbs in 2.5 lb increments",
      "Replaces 15 pairs of dumbbells",
      "Quick-select dial system",
      "Space-saving tray included",
      "Durable metal and rubber construction",
      "Ergonomic grip handle"
    ]
  },
  {
    id: 11,
    title: "LEGO Technic Lamborghini Model Kit – 3696 Pieces, 1:8 Scale",
    brand: "LEGO",
    category: "toys",
    price: 16999,
    originalPrice: 24999,
    discount: 32,
    rating: 4.8,
    reviewCount: 2341,
    image: "product_laptop.png",
    badge: "32% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "2 days",
    description: "Build the iconic Lamborghini Huracán in stunning 1:8 scale. Features working V10 engine, gearbox, and aerodynamic components.",
    features: [
      "3696 pieces",
      "1:8 scale replica",
      "Working V10 engine",
      "Functional gearbox",
      "Adjustable suspension",
      "For ages 18+",
      "Includes instruction booklet"
    ]
  },
  {
    id: 12,
    title: "Organic Chia Seeds 500g – Rich in Omega-3, Protein & Fiber, Gluten-free",
    brand: "NatureFarm",
    category: "grocery",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.3,
    reviewCount: 8731,
    image: "product_watch.png",
    badge: "50% off",
    isPrime: false,
    inStock: true,
    deliveryDate: "Tomorrow",
    description: "Premium quality organic chia seeds packed with nutrients. Perfect for smoothies, puddings, and healthy snacking.",
    features: [
      "Certified Organic",
      "500g pack",
      "Rich in Omega-3 fatty acids",
      "High protein & fiber content",
      "Gluten-free & vegan",
      "No preservatives or additives",
      "FSSAI approved"
    ]
  },
  {
    id: 13,
    title: "True Wireless Earbuds – 30hr Playtime, IPX5, Active Noise Cancellation",
    brand: "SoundZone",
    category: "electronics",
    price: 2499,
    originalPrice: 5999,
    discount: 58,
    rating: 4.1,
    reviewCount: 15432,
    image: "product_headphones.png",
    badge: "58% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "Tomorrow",
    description: "Premium true wireless earbuds with exceptional sound quality and long battery life.",
    features: [
      "Active Noise Cancellation",
      "30 hours total playtime",
      "IPX5 water resistance",
      "Bluetooth 5.2",
      "Quick charge - 15min = 2hr",
      "Touch controls",
      "6 ear tip sizes"
    ]
  },
  {
    id: 14,
    title: "Non-Stick Cookware Set 8-Piece – Granite Coated, PFOA Free, Induction Ready",
    brand: "GraniteChef",
    category: "home",
    price: 3299,
    originalPrice: 6999,
    discount: 53,
    rating: 4.3,
    reviewCount: 11234,
    image: "product_phone.png",
    badge: "53% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "2 days",
    description: "Complete your kitchen with the GraniteChef 8-piece cookware set. Premium granite coating ensures non-stick performance without harmful chemicals.",
    features: [
      "8-piece complete set",
      "PFOA-free granite coating",
      "Induction & gas compatible",
      "Oven-safe up to 220°C",
      "Ergonomic soft-touch handles",
      "Tempered glass lids",
      "Dishwasher safe"
    ]
  },
  {
    id: 15,
    title: "Psychology of Money by Morgan Housel – International Bestseller",
    brand: "Jaico Publishing",
    category: "books",
    price: 279,
    originalPrice: 599,
    discount: 53,
    rating: 4.6,
    reviewCount: 38921,
    image: "product_laptop.png",
    badge: "53% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "Tomorrow",
    description: "Learn how money really works through timeless lessons on wealth, greed, and happiness. A must-read for everyone.",
    features: [
      "Author: Morgan Housel",
      "256 pages, Paperback",
      "Language: English",
      "Publisher: Jaico",
      "International Bestseller",
      "Over 4 million copies sold"
    ]
  },
  {
    id: 16,
    title: "Men's Running Shoes – Lightweight, Responsive Cushioning, Breathable Mesh",
    brand: "SpeedStride",
    category: "sports",
    price: 2299,
    originalPrice: 5999,
    discount: 62,
    rating: 4.4,
    reviewCount: 6782,
    image: "product_watch.png",
    badge: "62% off",
    isPrime: true,
    inStock: true,
    deliveryDate: "2 days",
    description: "Achieve your personal best with SpeedStride running shoes. Advanced foam cushioning and breathable upper for peak performance.",
    features: [
      "Responsive foam midsole",
      "Breathable mesh upper",
      "Anti-slip rubber outsole",
      "Reflective details for visibility",
      "Sizes: UK 6 to 12",
      "Weight: 290g (size 9)",
      "Drop: 10mm"
    ]
  }
];

// Wishlist storage
let wishlist = JSON.parse(localStorage.getItem('amazon_wishlist') || '[]');
// Cart storage
let cart = JSON.parse(localStorage.getItem('amazon_cart') || '[]');

function saveWishlist() { localStorage.setItem('amazon_wishlist', JSON.stringify(wishlist)); }
function saveCart() { localStorage.setItem('amazon_cart', JSON.stringify(cart)); }

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 10);
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart();
  updateCartCount();
  return product;
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartCount();
}

function updateCartQty(productId, qty) {
  const item = cart.find(i => i.id === productId);
  if (item) { item.qty = qty; }
  saveCart();
}

function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) { wishlist.push(productId); }
  else { wishlist.splice(idx, 1); }
  saveWishlist();
  return wishlist.includes(productId);
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCartItemCount();
}

function formatPrice(num) {
  return '₹' + num.toLocaleString('en-IN');
}

function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
