/**
 * Cart Controller
 * Manages cart state, variant selections, sticky bottom bar, and cart drawer.
 */

export class CartController {
  constructor(options = {}) {
    this.items = new Map(); // key: `${itemId}_${variantLabel}` -> item object
    this.onCartChange = options.onCartChange || null;

    // DOM references
    this.headerCartBadge = document.getElementById('header-cart-badge');
    this.stickyCartBar = document.getElementById('sticky-cart-bar');
    this.stickyCartCount = document.getElementById('sticky-cart-count');
    this.stickyCartTotal = document.getElementById('sticky-cart-total');
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    this.cartDrawerItems = document.getElementById('cart-drawer-items');
    this.cartDrawerSubtotal = document.getElementById('cart-drawer-subtotal');
    this.cartDrawerTotal = document.getElementById('cart-drawer-total');

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    // Open drawer on clicking View Cart or header cart icon
    const viewCartBtns = document.querySelectorAll('.trigger-view-cart, #header-cart-btn');
    viewCartBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close drawer buttons
    const closeDrawerBtns = document.querySelectorAll('.close-cart-drawer, #cart-drawer-overlay');
    closeDrawerBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.closeDrawer();
      });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.getTotalCount() === 0) return;
        this.handleCheckout();
      });
    }
  }

  getKey(itemId, variantLabel = 'Standard') {
    return `${itemId}__${variantLabel}`;
  }

  addItem(item, variant = null) {
    const variantLabel = variant ? variant.label : (item.hasVariants ? item.variants[0].label : 'Standard');
    const price = variant ? variant.price : item.defaultPrice;
    const key = this.getKey(item.id, variantLabel);

    if (this.items.has(key)) {
      const existing = this.items.get(key);
      existing.quantity += 1;
    } else {
      this.items.set(key, {
        id: item.id,
        name: item.name,
        variantLabel: variantLabel !== 'Standard' ? variantLabel : null,
        price,
        quantity: 1,
        image: item.image,
        dietary: item.dietary
      });
    }

    this.render();
  }

  updateQuantity(key, delta) {
    if (!this.items.has(key)) return;

    const item = this.items.get(key);
    item.quantity += delta;

    if (item.quantity <= 0) {
      this.items.delete(key);
    }

    this.render();
  }

  removeItem(key) {
    this.items.delete(key);
    this.render();
  }

  clear() {
    this.items.clear();
    this.render();
  }

  getTotalCount() {
    let count = 0;
    for (const item of this.items.values()) {
      count += item.quantity;
    }
    return count;
  }

  getSubtotal() {
    let sum = 0;
    for (const item of this.items.values()) {
      sum += item.price * item.quantity;
    }
    return sum;
  }

  getItemQuantity(itemId, variantLabel = 'Standard') {
    const key = this.getKey(itemId, variantLabel);
    return this.items.has(key) ? this.items.get(key).quantity : 0;
  }

  openDrawer() {
    if (this.cartDrawer) {
      this.cartDrawer.classList.add('is-open');
    }
    if (this.cartDrawerOverlay) {
      this.cartDrawerOverlay.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (this.cartDrawer) {
      this.cartDrawer.classList.remove('is-open');
    }
    if (this.cartDrawerOverlay) {
      this.cartDrawerOverlay.classList.remove('is-open');
    }
    document.body.style.overflow = '';
  }

  render() {
    const totalCount = this.getTotalCount();
    const subtotal = this.getSubtotal();

    // 1. Update Header Badge
    if (this.headerCartBadge) {
      this.headerCartBadge.textContent = totalCount;
      this.headerCartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    // 2. Update Sticky Bottom Cart Bar
    if (this.stickyCartBar) {
      if (totalCount > 0) {
        this.stickyCartBar.classList.add('is-visible');
        if (this.stickyCartCount) {
          this.stickyCartCount.textContent = `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`;
        }
        if (this.stickyCartTotal) {
          this.stickyCartTotal.textContent = `₹${subtotal}`;
        }
      } else {
        this.stickyCartBar.classList.remove('is-visible');
      }
    }

    // 3. Render Cart Drawer Items
    if (this.cartDrawerItems) {
      if (totalCount === 0) {
        this.cartDrawerItems.innerHTML = `
          <div class="cart-empty-state">
            <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p class="empty-title">Your Cart is Empty</p>
            <p class="empty-subtitle">Explore our delicious biryanis and specials to add items.</p>
          </div>
        `;
      } else {
        let html = '';
        for (const [key, item] of this.items.entries()) {
          const itemTotal = item.price * item.quantity;
          const isVeg = item.dietary === 'veg';

          html += `
            <div class="cart-drawer-item" data-key="${key}">
              <div class="cart-item-dietary ${isVeg ? 'veg' : 'non-veg'}">
                <span class="dietary-marker"></span>
              </div>
              <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                ${item.variantLabel ? `<span class="cart-item-variant">${item.variantLabel}</span>` : ''}
                <div class="cart-item-price-unit">₹${item.price} each</div>
              </div>
              <div class="cart-item-stepper">
                <button class="cart-step-btn btn-cart-dec" data-key="${key}" aria-label="Decrease quantity">−</button>
                <span class="cart-step-qty">${item.quantity}</span>
                <button class="cart-step-btn btn-cart-inc" data-key="${key}" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-item-total">₹${itemTotal}</div>
              <button class="cart-item-remove" data-key="${key}" aria-label="Remove item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          `;
        }
        this.cartDrawerItems.innerHTML = html;

        // Attach listeners to cart drawer steppers
        this.cartDrawerItems.querySelectorAll('.btn-cart-dec').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const key = e.currentTarget.getAttribute('data-key');
            this.updateQuantity(key, -1);
          });
        });

        this.cartDrawerItems.querySelectorAll('.btn-cart-inc').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const key = e.currentTarget.getAttribute('data-key');
            this.updateQuantity(key, 1);
          });
        });

        this.cartDrawerItems.querySelectorAll('.cart-item-remove').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const key = e.currentTarget.getAttribute('data-key');
            this.removeItem(key);
          });
        });
      }
    }

    // 4. Update Subtotals & Totals
    if (this.cartDrawerSubtotal) {
      this.cartDrawerSubtotal.textContent = `₹${subtotal}`;
    }
    if (this.cartDrawerTotal) {
      this.cartDrawerTotal.textContent = `₹${subtotal}`;
    }

    // 5. Notify external listeners (e.g. food cards)
    if (this.onCartChange) {
      this.onCartChange(this);
    }
  }

  handleCheckout() {
    const modal = document.createElement('div');
    modal.className = 'order-confirm-modal';
    modal.innerHTML = `
      <div class="order-confirm-card">
        <div class="confirm-icon">✓</div>
        <h3 class="confirm-title">Order Request Received!</h3>
        <p class="confirm-desc">
          Your delicious order of <strong>${this.getTotalCount()} items</strong> (₹${this.getSubtotal()}) is being prepared at our kitchen located at <strong>Meherma Barahat Pirpanti Road</strong>.
        </p>
        <button class="confirm-close-btn" id="confirm-ok-btn">Enjoy Your Meal!</button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('confirm-ok-btn').addEventListener('click', () => {
      modal.remove();
      this.clear();
      this.closeDrawer();
    });
  }
}
