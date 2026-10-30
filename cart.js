/* ====================================
   AMAZON CLONE — CART PAGE LOGIC
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartPage();
});

function renderCartPage() {
  const listEl = document.getElementById('cart-items-list');
  if (!listEl) return;

  if (!cart.length) {
    listEl.innerHTML = `
      <div class="empty-cart">
        <div style="font-size:64px;margin-bottom:16px">🛒</div>
        <h3>Your Amazon Cart is empty</h3>
        <p style="margin-bottom:20px;color:#565959">Your shopping cart is waiting. Give it purpose – fill it with groceries, electronics, fashion and more.</p>
        <a href="index.html" style="background:#FFD814;padding:10px 24px;border-radius:24px;color:#0f1111;font-weight:600;font-size:15px;display:inline-block">Continue Shopping</a>
      </div>
    `;
    updateSummary();
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  listEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item" id="cart-item-${p.id}">
        <img src="${p.image}" alt="${p.title}" class="cart-item-img" onerror="this.style.display='none'" />
        <div class="cart-item-info">
          <a href="#" class="cart-item-title" onclick="openProductDetailFromCart(${p.id})">${p.title}</a>
          <span class="cart-item-in-stock">In Stock</span>
          ${p.isPrime ? '<span style="color:#00A8E1;font-weight:700;font-size:13px;font-style:italic">prime</span>' : ''}
          <div class="cart-item-actions">
            <select class="cart-qty-select" id="qty-${p.id}" onchange="changeCartQty(${p.id}, this.value)" aria-label="Quantity">
              ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${item.qty === n ? 'selected' : ''}>${n}</option>`).join('')}
            </select>
            <span class="cart-action-sep">|</span>
            <button class="btn-cart-action" onclick="deleteCartItem(${p.id})">Delete</button>
            <span class="cart-action-sep">|</span>
            <button class="btn-cart-action" onclick="saveForLater(${p.id})">Save for later</button>
          </div>
        </div>
        <div class="cart-item-price" id="item-price-${p.id}">${formatPrice(p.price * item.qty)}</div>
      </div>
    `;
  }).join('');

  updateSummary();
}

function updateSummary() {
  const total = getCartTotal();
  const count = getCartItemCount();
  const els = {
    top: document.getElementById('cart-subtotal-top'),
    bottom: document.getElementById('cart-subtotal-bottom'),
    countTop: document.getElementById('cart-item-count-top'),
    countBottom: document.getElementById('cart-item-count-bottom'),
  };
  if (els.top) els.top.textContent = formatPrice(total);
  if (els.bottom) els.bottom.textContent = formatPrice(total);
  if (els.countTop) els.countTop.textContent = count;
  if (els.countBottom) els.countBottom.textContent = count;
}

function changeCartQty(productId, qty) {
  qty = parseInt(qty);
  updateCartQty(productId, qty);
  const p = PRODUCTS.find(pr => pr.id === productId);
  const priceEl = document.getElementById(`item-price-${productId}`);
  if (priceEl && p) priceEl.textContent = formatPrice(p.price * qty);
  updateSummary();
  updateCartCount();
}

function deleteCartItem(productId) {
  removeFromCart(productId);
  const el = document.getElementById(`cart-item-${productId}`);
  if (el) {
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    setTimeout(() => renderCartPage(), 300);
  }
  showToast('Item removed from cart');
  updateCartCount();
}

function saveForLater(productId) {
  toggleWishlist(productId);
  removeFromCart(productId);
  const el = document.getElementById(`cart-item-${productId}`);
  if (el) {
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '0';
    setTimeout(() => renderCartPage(), 300);
  }
  showToast('❤️ Saved to Wish List');
  updateCartCount();
}

function toggleSelectAll(checkbox) {
  // Visual only for demo
  checkbox.parentElement.textContent = checkbox.checked ? '✓ Deselect all items' : 'Deselect all items';
}

function handleCheckout() {
  if (!cart.length) { showToast('Your cart is empty!', 'error'); return; }
  const orderId = 'AMZ-' + Math.random().toString(36).substr(2,9).toUpperCase();
  const total = getCartTotal();
  const count = getCartItemCount();
  document.getElementById('order-id-display').textContent = orderId;

  // Show order details
  const details = document.getElementById('order-details-mini');
  if (details) {
    details.innerHTML = cart.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      if (!p) return '';
      return `<div><strong>${p.title.substring(0,40)}…</strong> × ${item.qty} = ${formatPrice(p.price * item.qty)}</div>`;
    }).join('') + `<div style="font-weight:700;margin-top:8px">Total: ${formatPrice(total)}</div>`;
  }

  // Clear cart
  cart = [];
  saveCart();
  updateCartCount();

  openModal('order-modal');
}

function openProductDetailFromCart(productId) {
  // Redirect to homepage with modal intent stored
  sessionStorage.setItem('openProduct', productId);
  window.location.href = 'index.html';
}

/* ---- TOAST ---- */
let toastTimer = null;
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});
