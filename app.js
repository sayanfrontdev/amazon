/* ====================================
   AMAZON CLONE — MAIN APP LOGIC
   ==================================== */

/* ---- STATE ---- */
let currentCategory = 'all';
let currentSort = 'featured';
let displayedCount = 0;
const PAGE_SIZE = 8;
let carouselIndex = 0;
let carouselTimer = null;
let currentUser = JSON.parse(localStorage.getItem('amazon_user') || 'null');

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initCarousel();
  renderProducts();
  initSearch();
  initSidebar();
  updateAuthUI();
});

/* ---- AUTH ---- */
function updateAuthUI() {
  const navItem = document.getElementById('account-nav-btn');
  if (!navItem) return;
  const label = navItem.querySelector('.nav-label');
  if (currentUser) {
    label.textContent = `Hello, ${currentUser.name.split(' ')[0]}`;
  } else {
    label.textContent = 'Hello, Sign in';
  }
}

function handleSignIn(e) {
  e.preventDefault();
  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value;
  if (!email || !password) { showToast('Please fill all fields', 'error'); return; }
  // Simulate auth
  currentUser = { name: email.split('@')[0] || 'User', email };
  localStorage.setItem('amazon_user', JSON.stringify(currentUser));
  closeModal('signin-modal');
  updateAuthUI();
  showToast(`✅ Welcome back, ${currentUser.name}!`, 'success');
}

function handleSignUp(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm-password').value;
  if (!name || !email || !password) { showToast('Please fill all fields', 'error'); return; }
  if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }
  if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
  currentUser = { name, email };
  localStorage.setItem('amazon_user', JSON.stringify(currentUser));
  closeModal('signup-modal');
  updateAuthUI();
  showToast(`🎉 Account created! Welcome, ${name}!`, 'success');
}

/* ---- SIDEBAR ---- */
function initSidebar() {
  const btn = document.getElementById('nav-hamburger-btn');
  if (btn) btn.addEventListener('click', openSidebar);
}
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

/* ---- CAROUSEL ---- */
function initCarousel() {
  document.getElementById('carousel-prev').addEventListener('click', () => { goToSlide(carouselIndex - 1); resetTimer(); });
  document.getElementById('carousel-next').addEventListener('click', () => { goToSlide(carouselIndex + 1); resetTimer(); });
  startTimer();
}
function startTimer() { carouselTimer = setInterval(() => goToSlide(carouselIndex + 1), 5000); }
function resetTimer() { clearInterval(carouselTimer); startTimer(); }
function goToSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  const total = slides.length;
  carouselIndex = ((idx % total) + total) % total;
  slides.forEach((s, i) => s.classList.toggle('active', i === carouselIndex));
  dots.forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
}

/* ---- SEARCH ---- */
function initSearch() {
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  const suggestions = document.getElementById('search-suggestions');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { suggestions.classList.remove('show'); return; }
    const matches = PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);
    if (!matches.length) { suggestions.classList.remove('show'); return; }
    suggestions.innerHTML = matches.map(p => `
      <div class="suggestion-item" onclick="selectSuggestion('${p.id}')">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><circle cx="9" cy="9" r="7"/><line x1="15" y1="15" x2="19" y2="19"/></svg>
        <div>
          <div>${highlightMatch(p.title.length > 50 ? p.title.substring(0,50)+'…' : p.title, q)}</div>
          <span>${p.brand} — ${p.category}</span>
        </div>
      </div>
    `).join('');
    suggestions.classList.add('show');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { performSearch(); suggestions.classList.remove('show'); }
  });
  btn.addEventListener('click', () => { performSearch(); suggestions.classList.remove('show'); });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar-container')) suggestions.classList.remove('show');
  });
}

function highlightMatch(text, q) {
  const re = new RegExp(`(${q})`, 'gi');
  return text.replace(re, '<strong>$1</strong>');
}

function selectSuggestion(productId) {
  const p = PRODUCTS.find(pr => pr.id === parseInt(productId));
  if (!p) return;
  document.getElementById('search-input').value = p.title;
  document.getElementById('search-suggestions').classList.remove('show');
  openProductModal(p.id);
}

function performSearch() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  if (!q) { currentCategory = 'all'; renderProducts(); return; }
  const matching = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  renderFilteredProducts(matching, `Search results for "${q}"`);
}

/* ---- CATEGORY FILTER ---- */
function filterCategory(e, category) {
  if (e) e.preventDefault();
  currentCategory = category;
  document.getElementById('search-input').value = '';

  // Update nav links
  document.querySelectorAll('.nav-link[data-category]').forEach(el => {
    el.classList.toggle('active', el.dataset.category === category);
  });
  // Update chips
  document.querySelectorAll('.filter-chip').forEach(el => {
    el.classList.toggle('active', el.dataset.category === category);
  });

  renderProducts();
}

function sortProducts() {
  currentSort = document.getElementById('sort-select').value;
  renderProducts();
}

/* ---- RENDER PRODUCTS ---- */
function renderProducts() {
  let filtered = currentCategory === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === currentCategory);

  filtered = applySort(filtered);

  const headingEl = document.getElementById('products-heading');
  const categoryNames = { all: "Today's Deals", electronics: "Electronics", fashion: "Fashion", home: "Home & Kitchen", books: "Books", beauty: "Beauty", sports: "Sports", toys: "Toys & Games", grocery: "Grocery" };
  if (headingEl) headingEl.textContent = categoryNames[currentCategory] || "Products";

  displayedCount = Math.min(PAGE_SIZE, filtered.length);
  renderGrid(filtered.slice(0, displayedCount), filtered);
}

function renderFilteredProducts(products, heading) {
  const headingEl = document.getElementById('products-heading');
  if (headingEl) headingEl.textContent = heading;
  products = applySort(products);
  displayedCount = Math.min(PAGE_SIZE, products.length);
  renderGrid(products.slice(0, displayedCount), products);
}

function applySort(arr) {
  const s = document.getElementById('sort-select');
  const sort = s ? s.value : 'featured';
  switch (sort) {
    case 'price-low': return [...arr].sort((a,b) => a.price - b.price);
    case 'price-high': return [...arr].sort((a,b) => b.price - a.price);
    case 'rating': return [...arr].sort((a,b) => b.rating - a.rating);
    case 'newest': return [...arr].sort((a,b) => b.id - a.id);
    default: return arr;
  }
}

function renderGrid(products, allProducts) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('results-count');
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!grid) return;

  if (countEl) countEl.textContent = `${allProducts.length} result${allProducts.length !== 1 ? 's' : ''}`;

  if (!products.length) {
    grid.innerHTML = `<div class="empty-state"><h3>No products found</h3><p>Try a different category or search term.</p></div>`;
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  grid.innerHTML = products.map((p, i) => createProductCard(p, i)).join('');

  if (loadMoreBtn) {
    loadMoreBtn.style.display = displayedCount < allProducts.length ? 'inline-block' : 'none';
    loadMoreBtn.dataset.allProducts = JSON.stringify(allProducts.map(p => p.id));
  }
}

window.loadMoreProducts = function() {
  const btn = document.getElementById('load-more-btn');
  const allIds = JSON.parse(btn.dataset.allProducts || '[]');
  const allProducts = allIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const nextCount = Math.min(displayedCount + PAGE_SIZE, allProducts.length);
  const grid = document.getElementById('products-grid');
  const newCards = allProducts.slice(displayedCount, nextCount).map((p, i) => createProductCard(p, i)).join('');
  grid.insertAdjacentHTML('beforeend', newCards);
  displayedCount = nextCount;
  if (displayedCount >= allProducts.length) btn.style.display = 'none';
};

function createProductCard(p, index) {
  const wishlisted = wishlist.includes(p.id);
  const delay = (index % PAGE_SIZE) * 0.05;
  return `
    <div class="product-card" style="animation-delay:${delay}s" role="article" aria-label="${p.title}">
      <div class="product-img-wrap" onclick="openProductModal(${p.id})">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        ${p.isPrime ? `<span class="product-badge prime-badge-card">prime</span>` : ''}
        <button class="product-wishlist-btn ${wishlisted ? 'wishlisted' : ''}"
          id="wishlist-btn-${p.id}"
          aria-label="${wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          onclick="handleWishlist(event, ${p.id})">
          ${wishlisted ? '❤️' : '🤍'}
        </button>
        <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'" />
      </div>
      <div class="product-info" onclick="openProductModal(${p.id})">
        <p class="product-brand">${p.brand}</p>
        <h3 class="product-title">${p.title}</h3>
        <div class="product-rating">
          <span class="stars" aria-label="${p.rating} stars">${generateStars(p.rating)}</span>
          <span class="rating-count">${p.reviewCount.toLocaleString('en-IN')}</span>
        </div>
        <div class="product-price-wrap">
          <div class="price-row">
            <span class="price-main"><span class="price-currency">₹</span>${p.price.toLocaleString('en-IN')}</span>
            <span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="price-discount">${p.discount}% off</span>
          </div>
          <div class="delivery-info">
            ${p.isPrime ? '<strong>FREE</strong> delivery' : 'Delivery'} by <strong>${p.deliveryDate}</strong>
          </div>
        </div>
      </div>
      <div class="product-card-footer">
        <button class="btn-add-cart" id="add-cart-${p.id}" onclick="handleAddToCart(${p.id})">Add to Cart</button>
        <button class="btn-buy-now" onclick="handleBuyNow(${p.id})">Buy Now</button>
      </div>
    </div>
  `;
}

/* ---- WISHLIST ---- */
function handleWishlist(e, productId) {
  e.stopPropagation();
  const isWishlisted = toggleWishlist(productId);
  const btn = document.getElementById(`wishlist-btn-${productId}`);
  if (btn) {
    btn.innerHTML = isWishlisted ? '❤️' : '🤍';
    btn.classList.toggle('wishlisted', isWishlisted);
    btn.setAttribute('aria-label', isWishlisted ? 'Remove from wishlist' : 'Add to wishlist');
  }
  showToast(isWishlisted ? '❤️ Added to Wishlist' : 'Removed from Wishlist');
}

/* ---- ADD TO CART ---- */
function handleAddToCart(productId) {
  const product = addToCart(productId);
  if (product) {
    showToast(`🛒 "${product.title.substring(0, 30)}…" added to cart!`, 'success');
    // Animate cart count
    const countEl = document.getElementById('cart-count');
    if (countEl) { countEl.style.animation = 'none'; void countEl.offsetWidth; countEl.style.animation = 'pop 0.25s ease'; }
  }
}

function handleBuyNow(productId) {
  addToCart(productId);
  window.location.href = 'cart.html';
}

/* ---- PRODUCT MODAL ---- */
function openProductModal(productId) {
  const p = PRODUCTS.find(pr => pr.id === productId);
  if (!p) return;
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('product-modal-content');
  const wishlisted = wishlist.includes(p.id);
  const savings = p.originalPrice - p.price;

  content.innerHTML = `
    <div class="modal-image-side">
      <img src="${p.image}" alt="${p.title}" onerror="this.style.display='none'" />
    </div>
    <div class="modal-info-side">
      <p class="modal-brand">${p.brand}</p>
      <h2 class="modal-title" id="product-modal-title">${p.title}</h2>
      <div class="modal-rating">
        <span class="stars">${generateStars(p.rating)}</span>
        <a href="#">${p.reviewCount.toLocaleString('en-IN')} ratings</a>
        ${p.isPrime ? '<span class="prime-badge" style="background:#00A8E1;color:white;font-style:italic;padding:2px 8px;border-radius:3px;font-size:12px">prime</span>' : ''}
      </div>
      <hr style="border:none;border-top:1px solid #ddd;margin:10px 0">
      <div class="modal-price-row">
        <span class="modal-price-main"><span style="font-size:18px;font-weight:400">₹</span>${p.price.toLocaleString('en-IN')}</span>
        <span class="modal-price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
        <span class="modal-discount">${p.discount}% off</span>
      </div>
      <p class="modal-savings">You save: ₹${savings.toLocaleString('en-IN')}</p>
      <p class="modal-delivery">
        ${p.isPrime ? '<strong style="color:#00A8E1">FREE</strong> Prime delivery' : 'Standard delivery'}
        by <strong>${p.deliveryDate}</strong>
      </p>
      <p class="modal-in-stock">✅ In Stock</p>
      <div class="modal-qty-row">
        <label class="modal-qty-label" for="modal-qty-${p.id}">Qty:</label>
        <select class="modal-qty-select" id="modal-qty-${p.id}">
          ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}">${n}</option>`).join('')}
        </select>
      </div>
      <div class="modal-btn-row">
        <button class="btn-add-cart" onclick="handleModalAddCart(${p.id})">🛒 Add to Cart</button>
        <button class="btn-buy-now" onclick="handleModalBuyNow(${p.id})">⚡ Buy Now</button>
        <button class="btn-auth-secondary" style="border-radius:24px" onclick="handleWishlist(event,${p.id})">
          ${wishlisted ? '❤️ Wishlisted' : '🤍 Add to Wish List'}
        </button>
      </div>
      <div class="modal-description">
        <h4>About this item</h4>
        <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
        <p style="margin-top:10px">${p.description}</p>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function handleModalAddCart(productId) {
  const qtyEl = document.getElementById(`modal-qty-${productId}`);
  const qty = qtyEl ? parseInt(qtyEl.value) : 1;
  const product = addToCart(productId, qty);
  if (product) {
    closeModal('product-modal');
    showToast(`🛒 Added ${qty} × "${product.title.substring(0, 25)}…" to cart!`, 'success');
    const countEl = document.getElementById('cart-count');
    if (countEl) { countEl.style.animation = 'none'; void countEl.offsetWidth; countEl.style.animation = 'pop 0.25s ease'; }
  }
}

function handleModalBuyNow(productId) {
  const qtyEl = document.getElementById(`modal-qty-${productId}`);
  const qty = qtyEl ? parseInt(qtyEl.value) : 1;
  addToCart(productId, qty);
  closeModal('product-modal');
  window.location.href = 'cart.html';
}

/* ---- MODALS ---- */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

// Close on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Escape key closes modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => { m.classList.remove('active'); document.body.style.overflow = ''; });
    closeSidebar();
  }
});

/* ---- TOAST ---- */
let toastTimer = null;
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 3000);
}
