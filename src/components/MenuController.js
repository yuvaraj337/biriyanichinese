import { MENU_CATEGORIES, MENU_ITEMS } from './menuData.js';

/**
 * Menu Controller
 * Handles category filtering, live search, sorting, food card rendering,
 * and variant selection.
 */
export class MenuController {
  constructor(cartController) {
    this.cart = cartController;
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.activeSort = 'popularity';
    this.selectedVariants = new Map(); // itemId -> selectedVariantObject

    // DOM references
    this.categoriesContainer = document.getElementById('menu-categories-list');
    this.foodGrid = document.getElementById('menu-food-grid');
    this.searchInput = document.getElementById('menu-search-input');
    this.sortSelect = document.getElementById('menu-sort-select');
    this.menuCountLabel = document.getElementById('menu-count-label');

    this.init();
  }

  init() {
    this.initVariants();
    this.renderCategories();
    this.setupEventListeners();
    this.renderDishes();

    // Subscribe to cart updates to synchronize card button steppers
    if (this.cart) {
      this.cart.onCartChange = () => {
        this.updateCardButtons();
      };
    }
  }

  initVariants() {
    MENU_ITEMS.forEach((item) => {
      if (item.hasVariants) {
        const defaultVar = item.variants.find((v) => v.default) || item.variants[0];
        this.selectedVariants.set(item.id, defaultVar);
      }
    });
  }

  setupEventListeners() {
    // Live Search
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.renderDishes();
      });
    }

    // Sort Dropdown
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.activeSort = e.target.value;
        this.renderDishes();
      });
    }

    // Location Pill Click
    const locationBtn = document.getElementById('header-location-pill');
    if (locationBtn) {
      locationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📍 Restaurant Address:\nMeherma Barahat Pirpanti Road, Near Purana Naaz Cinema Hall\nHours: 11:00 AM – 11:30 PM Daily');
      });
    }

    // Promo banner clicks
    document.querySelectorAll('.promo-action-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetCategory = e.currentTarget.getAttribute('data-target-cat');
        if (targetCategory) {
          this.setCategory(targetCategory);
          const menuAnchor = document.getElementById('menu-category-section');
          if (menuAnchor) {
            menuAnchor.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  renderCategories() {
    if (!this.categoriesContainer) return;

    let html = '';
    MENU_CATEGORIES.forEach((cat) => {
      const isActive = cat.id === this.activeCategory;
      const isAll = cat.id === 'all';

      html += `
        <button class="menu-cat-btn ${isActive ? 'is-active' : ''}" data-cat="${cat.id}">
          <div class="cat-icon-frame">
            ${isAll ? `
              <div class="cat-grid-icon">
                <span class="grid-cell"></span>
                <span class="grid-cell"></span>
                <span class="grid-cell"></span>
                <span class="grid-cell"></span>
              </div>
            ` : `
              <img src="${cat.image}" alt="${cat.name}" class="cat-img" loading="lazy" />
            `}
          </div>
          <span class="cat-label">${cat.name}</span>
          <span class="cat-active-bar"></span>
        </button>
      `;
    });

    this.categoriesContainer.innerHTML = html;

    // Attach click listeners to category buttons
    this.categoriesContainer.querySelectorAll('.menu-cat-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const catId = e.currentTarget.getAttribute('data-cat');
        this.setCategory(catId);
      });
    });
  }

  setCategory(catId) {
    this.activeCategory = catId;
    this.categoriesContainer.querySelectorAll('.menu-cat-btn').forEach((btn) => {
      if (btn.getAttribute('data-cat') === catId) {
        btn.classList.add('is-active');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        btn.classList.remove('is-active');
      }
    });

    this.renderDishes();
  }

  getFilteredDishes() {
    let list = MENU_ITEMS.filter((item) => {
      // 1. Category Filter
      if (this.activeCategory !== 'all' && item.category !== this.activeCategory) {
        return false;
      }
      // 2. Search Filter
      if (this.searchQuery) {
        const matchesName = item.name.toLowerCase().includes(this.searchQuery);
        const matchesDesc = item.description.toLowerCase().includes(this.searchQuery);
        const matchesCat = item.category.toLowerCase().includes(this.searchQuery);
        if (!matchesName && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    });

    // 3. Sorting
    if (this.activeSort === 'price-low-high') {
      list.sort((a, b) => a.defaultPrice - b.defaultPrice);
    } else if (this.activeSort === 'price-high-low') {
      list.sort((a, b) => b.defaultPrice - a.defaultPrice);
    } else if (this.activeSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Popularity
      list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return list;
  }

  renderDishes() {
    if (!this.foodGrid) return;

    const dishes = this.getFilteredDishes();

    if (this.menuCountLabel) {
      this.menuCountLabel.textContent = `${dishes.length} ${dishes.length === 1 ? 'dish' : 'dishes'}`;
    }

    if (dishes.length === 0) {
      this.foodGrid.innerHTML = `
        <div class="menu-empty-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p class="empty-title">No matching dishes found</p>
          <p class="empty-desc">Try searching for "biryani", "chicken", or selecting "All".</p>
        </div>
      `;
      return;
    }

    let html = '';
    dishes.forEach((item) => {
      const isVeg = item.dietary === 'veg';
      const activeVariant = item.hasVariants ? this.selectedVariants.get(item.id) : null;
      const currentPrice = activeVariant ? activeVariant.price : item.defaultPrice;
      const currentVariantLabel = activeVariant ? activeVariant.label : 'Standard';
      const currentQty = this.cart ? this.cart.getItemQuantity(item.id, currentVariantLabel) : 0;

      html += `
        <article class="food-card" id="card-${item.id}" data-id="${item.id}">
          
          <!-- Card Top Bar: Dietary badge + Wishlist heart -->
          <div class="food-card-topbar">
            <div class="dietary-badge ${isVeg ? 'veg' : 'non-veg'}" title="${isVeg ? 'Vegetarian' : 'Non-Vegetarian'}">
              <span class="dietary-marker"></span>
            </div>
            <button class="food-card-wishlist" aria-label="Add to favorites">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>

          <!-- Food Image Frame -->
          <div class="food-image-frame">
            <img src="${item.image}" alt="${item.name}" class="food-image" loading="lazy" />
          </div>

          <!-- Food Info -->
          <div class="food-card-body">
            <h3 class="food-card-title">${item.name}</h3>
            <p class="food-card-desc">${item.description}</p>

            <!-- Variants Selector if available -->
            ${item.hasVariants ? `
              <div class="food-variant-pills" data-id="${item.id}">
                ${item.variants.map((v) => `
                  <button class="variant-pill ${activeVariant && activeVariant.label === v.label ? 'is-selected' : ''}" data-label="${v.label}" data-price="${v.price}">
                    ${v.label} ₹${v.price}
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <!-- Rating Row -->
            <div class="food-rating-row">
              <span class="rating-star">★</span>
              <span class="rating-val">${item.rating}</span>
              <span class="rating-count">(${item.reviews})</span>
            </div>

            <!-- Price & Add Action Row -->
            <div class="food-card-action-row">
              <div class="food-card-price" id="price-${item.id}">₹${currentPrice}</div>

              <!-- Add Button or Quantity Stepper -->
              <div class="card-action-container" id="action-container-${item.id}">
                ${currentQty > 0 ? `
                  <div class="card-stepper">
                    <button class="card-step-btn btn-card-dec" data-id="${item.id}" data-var="${currentVariantLabel}">−</button>
                    <span class="card-step-qty">${currentQty}</span>
                    <button class="card-step-btn btn-card-inc" data-id="${item.id}" data-var="${currentVariantLabel}">+</button>
                  </div>
                ` : `
                  <button class="btn-card-add" data-id="${item.id}">
                    <span>Add</span>
                    <span class="plus-icon">+</span>
                  </button>
                `}
              </div>
            </div>

          </div><!-- /.food-card-body -->
        </article>
      `;
    });

    this.foodGrid.innerHTML = html;
    this.attachCardListeners();
  }

  attachCardListeners() {
    // 1. Variant Pill Clicks
    this.foodGrid.querySelectorAll('.food-variant-pills').forEach((pillGroup) => {
      const itemId = pillGroup.getAttribute('data-id');
      const item = MENU_ITEMS.find((i) => i.id === itemId);
      if (!item) return;

      pillGroup.querySelectorAll('.variant-pill').forEach((pill) => {
        pill.addEventListener('click', (e) => {
          const label = e.currentTarget.getAttribute('data-label');
          const variant = item.variants.find((v) => v.label === label);
          if (!variant) return;

          this.selectedVariants.set(itemId, variant);

          // Update pill active class
          pillGroup.querySelectorAll('.variant-pill').forEach((p) => p.classList.remove('is-selected'));
          e.currentTarget.classList.add('is-selected');

          // Update price display
          const priceEl = document.getElementById(`price-${itemId}`);
          if (priceEl) priceEl.textContent = `₹${variant.price}`;

          // Update card button state for this variant
          this.updateSingleCardButton(itemId);
        });
      });
    });

    // 2. Add Button Clicks
    this.foodGrid.querySelectorAll('.btn-card-add').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-id');
        const item = MENU_ITEMS.find((i) => i.id === itemId);
        if (!item || !this.cart) return;

        const variant = item.hasVariants ? this.selectedVariants.get(itemId) : null;
        this.cart.addItem(item, variant);
      });
    });

    // 3. Stepper Decrement Clicks
    this.foodGrid.querySelectorAll('.btn-card-dec').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-id');
        const varLabel = e.currentTarget.getAttribute('data-var');
        if (!this.cart) return;

        const key = this.cart.getKey(itemId, varLabel);
        this.cart.updateQuantity(key, -1);
      });
    });

    // 4. Stepper Increment Clicks
    this.foodGrid.querySelectorAll('.btn-card-inc').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-id');
        const item = MENU_ITEMS.find((i) => i.id === itemId);
        const varLabel = e.currentTarget.getAttribute('data-var');
        if (!this.cart || !item) return;

        const variant = item.hasVariants ? item.variants.find((v) => v.label === varLabel) : null;
        this.cart.addItem(item, variant);
      });
    });

    // 5. Wishlist Hearts
    this.foodGrid.querySelectorAll('.food-card-wishlist').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('is-favorited');
      });
    });
  }

  updateSingleCardButton(itemId) {
    const item = MENU_ITEMS.find((i) => i.id === itemId);
    if (!item || !this.cart) return;

    const actionContainer = document.getElementById(`action-container-${itemId}`);
    if (!actionContainer) return;

    const activeVariant = item.hasVariants ? this.selectedVariants.get(itemId) : null;
    const currentVariantLabel = activeVariant ? activeVariant.label : 'Standard';
    const currentQty = this.cart.getItemQuantity(itemId, currentVariantLabel);

    if (currentQty > 0) {
      actionContainer.innerHTML = `
        <div class="card-stepper">
          <button class="card-step-btn btn-card-dec" data-id="${item.id}" data-var="${currentVariantLabel}">−</button>
          <span class="card-step-qty">${currentQty}</span>
          <button class="card-step-btn btn-card-inc" data-id="${item.id}" data-var="${currentVariantLabel}">+</button>
        </div>
      `;

      actionContainer.querySelector('.btn-card-dec').addEventListener('click', () => {
        const key = this.cart.getKey(item.id, currentVariantLabel);
        this.cart.updateQuantity(key, -1);
      });

      actionContainer.querySelector('.btn-card-inc').addEventListener('click', () => {
        this.cart.addItem(item, activeVariant);
      });
    } else {
      actionContainer.innerHTML = `
        <button class="btn-card-add" data-id="${item.id}">
          <span>Add</span>
          <span class="plus-icon">+</span>
        </button>
      `;

      actionContainer.querySelector('.btn-card-add').addEventListener('click', () => {
        this.cart.addItem(item, activeVariant);
      });
    }
  }

  updateCardButtons() {
    MENU_ITEMS.forEach((item) => {
      this.updateSingleCardButton(item.id);
    });
  }
}
