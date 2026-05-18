// Quick Order Restaurant - App Controller
// Handles State Management, Views Rendering, Charts generation, and Synthesized Audio Cues

// 1. INITIAL STATE
const MENU_DATA = [
  {
    id: "food-1",
    name: "Sate Ayam Madura",
    category: "food",
    price: 28000,
    desc: "Sate ayam empuk disiram bumbu kacang premium legit khas Madura dan bawang goreng renyah.",
    icon: "🍢"
  },
  {
    id: "food-2",
    name: "Nasi Goreng Spesial",
    category: "food",
    price: 25000,
    desc: "Nasi goreng bumbu rempah legendaris disajikan dengan topping telur mata sapi, sosis, baso, acar segar.",
    icon: "🍳"
  },
  {
    id: "food-3",
    name: "Ayam Goreng Kremes",
    category: "food",
    price: 30000,
    desc: "Ayam ungkep bumbu kuning digoreng garing bertabur kremesan gurih berlimpah serta sambal terasi matang.",
    icon: "🍗"
  },
  {
    id: "drink-1",
    name: "Es Teh Manis Melati",
    category: "drink",
    price: 6000,
    desc: "Es teh segar beraroma bunga melati alami khas Jawa Tengah, manisnya pas menyegarkan kerongkongan.",
    icon: "🍹"
  },
  {
    id: "drink-2",
    name: "Es Jeruk Peras Segar",
    category: "drink",
    price: 8000,
    desc: "Jeruk peras lokal segar diperas langsung dengan paduan sirup gula pasir murni dingin.",
    icon: "🍊"
  },
  {
    id: "drink-3",
    name: "Kopi Susu Aren Premium",
    category: "drink",
    price: 18000,
    desc: "Kopi espresso blend dipadukan dengan susu segar yang creamy dan sirup gula aren organik harum.",
    icon: "☕"
  },
  {
    id: "dessert-1",
    name: "Pisang Goreng Keju Susu",
    category: "dessert",
    price: 15000,
    desc: "Pisang raja manis dibalut tepung krispi bertabur keju cheddar melimpah dan susu kental manis.",
    icon: "🍌"
  },
  {
    id: "dessert-2",
    name: "Croissant Cokelat Lumer",
    category: "dessert",
    price: 22000,
    desc: "Croissant mentega renyah berlapis-lapis khas Perancis dengan isian pasta cokelat Belgia lumer.",
    icon: "🥐"
  }
];

let appState = {
  activeRole: "customer", // customer | kitchen | admin
  activeCategory: "all",
  searchQuery: "",
  cart: [],
  orders: [
    {
      id: "ORD-9281",
      tableNo: "03",
      items: [
        { id: "food-1", name: "Sate Ayam Madura", price: 28000, qty: 2, note: "Bumbu kacang dipisah" },
        { id: "drink-3", name: "Kopi Susu Aren Premium", price: 18000, qty: 1, note: "Less ice, less sugar" }
      ],
      total: 74000,
      status: "ready", // pending | cooking | ready | completed
      time: "20:15",
      timestamp: Date.now() - 30 * 60 * 1000 // 30 mins ago
    },
    {
      id: "ORD-9282",
      tableNo: "08",
      items: [
        { id: "food-2", name: "Nasi Goreng Spesial", price: 25000, qty: 1, note: "Pedas sedang" },
        { id: "dessert-1", name: "Pisang Goreng Keju Susu", price: 15000, qty: 1, note: "" },
        { id: "drink-1", name: "Es Teh Manis Melati", price: 6000, qty: 2, note: "" }
      ],
      total: 52000,
      status: "cooking",
      time: "20:32",
      timestamp: Date.now() - 10 * 60 * 1000 // 10 mins ago
    }
  ],
  menuStock: {
    "food-1": true,
    "food-2": true,
    "food-3": true,
    "drink-1": true,
    "drink-2": true,
    "drink-3": true,
    "dessert-1": true,
    "dessert-2": true
  },
  selectedReceiptOrder: null,
  audioEnabled: true
};

// 2. SYNTHESIZED SOUND EFFECTS ENGINE (Web Audio API)
// This creates satisfying sound prompts directly inside the browser using standard synth oscillators.
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!appState.audioEnabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playAddToCart() {
    if (!appState.audioEnabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5
    
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playNewOrder() {
    if (!appState.audioEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Play a dual tone alarm
    const playTone = (freq, delay, dur) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0.15, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + dur);
      osc.start(now + delay);
      osc.stop(now + delay + dur);
    };

    playTone(587.33, 0, 0.15); // D5
    playTone(880.00, 0.15, 0.15); // A5
    playTone(587.33, 0.3, 0.15); // D5
    playTone(880.00, 0.45, 0.3); // A5
  }

  playSuccessPayment() {
    if (!appState.audioEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Triumphant ascending major arpeggio chime!
    const playChime = (freq, delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0.1, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.4);
      osc.start(now + delay);
      osc.stop(now + delay + 0.4);
    };

    playChime(523.25, 0);     // C5
    playChime(659.25, 0.08);  // E5
    playChime(783.99, 0.16);  // G5
    playChime(1046.50, 0.24); // C6
  }
}

const sound = new SoundEngine();

// 3. CORE RENDERING ENGINE & VIEW ACTIONS

// View Role switching
function setRole(role) {
  sound.playClick();
  appState.activeRole = role;
  
  // Update header buttons
  document.querySelectorAll(".role-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`.role-btn[data-role="${role}"]`).classList.add("active");
  
  // Show target panel
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.remove("active");
  });
  document.getElementById(`${role}-panel`).classList.add("active");
  
  // Perform page-specific renders
  if (role === "customer") {
    renderMenu();
    renderCart();
  } else if (role === "kitchen") {
    renderKitchenOrders();
    // Default selection
    if (!appState.selectedReceiptOrder && appState.orders.length > 0) {
      appState.selectedReceiptOrder = appState.orders[0];
    }
    renderKitchenReceipt();
  } else if (role === "admin") {
    renderAdminStock();
    renderAdminStats();
  }
}

// ----------------------------------------
// CUSTOMER VIEW RENDERING & CONTROLLER
// ----------------------------------------

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = "";
  
  const filtered = MENU_DATA.filter(item => {
    const matchesCategory = appState.activeCategory === "all" || item.category === appState.activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(appState.searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(appState.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fas fa-search" style="font-size: 32px; margin-bottom: 12px; opacity: 0.5;"></i>
        <p>Menu tidak ditemukan</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(item => {
    const isAvailable = appState.menuStock[item.id] !== false;
    const priceStr = formatRupiah(item.price);
    
    const card = document.createElement("div");
    card.className = `menu-card ${isAvailable ? '' : 'out-of-stock'}`;
    
    // Generate beautiful inline SVG background with custom icon for visually impressive dynamic cards
    const cardImgHtml = `
      <div class="menu-image-container">
        ${!isAvailable ? '<span class="stock-tag">Habis</span>' : ''}
        <div class="menu-svg-placeholder">
          <span style="font-size: 54px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));">${item.icon}</span>
        </div>
      </div>
    `;
    
    card.innerHTML = `
      ${cardImgHtml}
      <div class="menu-info">
        <h3 class="menu-name">${item.name}</h3>
        <p class="menu-desc">${item.desc}</p>
        <div class="menu-footer">
          <span class="menu-price">${priceStr}</span>
          <button class="add-to-cart-btn" onclick="addToCart('${item.id}')" title="Tambah ke keranjang" ${!isAvailable ? 'disabled' : ''}>
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function selectCategory(category) {
  sound.playClick();
  appState.activeCategory = category;
  
  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.classList.remove("active");
  });
  event.target.classList.add("active");
  
  renderMenu();
}

function handleSearch(val) {
  appState.searchQuery = val;
  renderMenu();
}

function addToCart(id) {
  const isAvailable = appState.menuStock[id] !== false;
  if (!isAvailable) return;
  
  sound.playAddToCart();
  
  const existing = appState.cart.find(c => c.menuId === id);
  if (existing) {
    existing.qty++;
  } else {
    appState.cart.push({
      menuId: id,
      qty: 1,
      note: ""
    });
  }
  renderCart();
  
  // Highlight cart panel/sidebar visually
  const cartCard = document.querySelector(".cart-card");
  cartCard.style.transform = "scale(1.02)";
  cartCard.style.borderColor = "var(--primary)";
  setTimeout(() => {
    cartCard.style.transform = "scale(1)";
    cartCard.style.borderColor = "var(--border-glass)";
  }, 300);
}

function changeQty(id, diff) {
  sound.playClick();
  const item = appState.cart.find(c => c.menuId === id);
  if (item) {
    item.qty += diff;
    if (item.qty <= 0) {
      removeCartItem(id);
    } else {
      renderCart();
    }
  }
}

function removeCartItem(id) {
  sound.playClick();
  appState.cart = appState.cart.filter(c => c.menuId !== id);
  renderCart();
}

function updateCartItemNote(id, note) {
  const item = appState.cart.find(c => c.menuId === id);
  if (item) {
    item.note = note;
  }
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalItems = document.getElementById("cartItemCount");
  const totalAmountDom = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  
  container.innerHTML = "";
  
  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <i class="fas fa-shopping-basket empty-cart-icon"></i>
        <p>Keranjang belanja masih kosong.</p>
        <span style="font-size: 11px; color: var(--text-muted);">Pilih menu nikmat di kiri untuk memesan!</span>
      </div>
    `;
    totalItems.innerText = "0";
    totalAmountDom.innerText = "Rp 0";
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
    return;
  }
  
  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = "1";
  
  let totalQty = 0;
  let totalAmount = 0;
  
  appState.cart.forEach(cartItem => {
    const itemData = MENU_DATA.find(m => m.id === cartItem.menuId);
    if (!itemData) return;
    
    totalQty += cartItem.qty;
    totalAmount += itemData.price * cartItem.qty;
    
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span style="font-size: 24px;">${itemData.icon}</span>
      <div class="cart-item-detail">
        <div class="cart-item-name">${itemData.name}</div>
        <div class="cart-item-price">${formatRupiah(itemData.price)}</div>
        <input type="text" class="cart-item-note-input" placeholder="Tulis catatan (misal: pedas sekali)" 
               value="${cartItem.note}" oninput="updateCartItemNote('${cartItem.menuId}', this.value)">
      </div>
      <div class="cart-item-actions">
        <button class="remove-item-btn" onclick="removeCartItem('${cartItem.menuId}')" title="Hapus">
          <i class="fas fa-trash"></i>
        </button>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty('${cartItem.menuId}', -1)"><i class="fas fa-minus"></i></button>
          <span class="qty-val">${cartItem.qty}</span>
          <button class="qty-btn" onclick="changeQty('${cartItem.menuId}', 1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
  
  totalItems.innerText = totalQty;
  totalAmountDom.innerText = formatRupiah(totalAmount);
}

// ----------------------------------------
// CHECKOUT & PAYMENT METHOD (QRIS SIMULATION)
// ----------------------------------------
let paymentTimerInterval = null;

function openCheckoutModal() {
  sound.playClick();
  const modal = document.getElementById("paymentModal");
  const modalBody = document.getElementById("modalBody");
  
  // Calculate total
  let totalAmount = 0;
  appState.cart.forEach(item => {
    const data = MENU_DATA.find(m => m.id === item.menuId);
    if (data) totalAmount += data.price * item.qty;
  });
  
  // Render Dynamic QRIS Simulation Screen
  modalBody.innerHTML = `
    <div id="paymentInitiated">
      <h3 class="modal-title">Selesaikan Pembayaran</h3>
      <p class="modal-subtitle">Scan QRIS dinamis di bawah untuk memproses pesanan otomatis ke dapur</p>
      
      <div class="qris-box">
        <div class="qris-logo">QRIS<span>⏱️</span></div>
        <div class="qris-qr-code" id="qrisQrCode"></div>
        <div class="qris-timer" id="qrisTimer">02:00</div>
      </div>
      
      <div style="font-size: 13px; text-align: center; color: var(--text-secondary); margin-bottom: 12px;">
        ID Meja: <strong>Meja 05</strong> | ID Transaksi: <strong>TX-${Math.floor(1000 + Math.random() * 9000)}</strong>
      </div>
      
      <div class="payment-amount-row">
        <span>Total Bayar:</span>
        <span class="payment-amount-val">${formatRupiah(totalAmount)}</span>
      </div>
      
      <div class="payment-actions">
        <button class="pay-btn-simulate" onclick="simulatePayment()">
          <i class="fas fa-check-circle"></i> Simulasi Bayar Berhasil (Lunas)
        </button>
      </div>
    </div>
  `;
  
  // Draw an dynamic SVG graphic inside qrisQrCode that looks like an actual QR Code but styled neatly
  const qrisQr = document.getElementById("qrisQrCode");
  qrisQr.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background:#fff; padding:6px; border-radius:6px;">
      <!-- Corner Markers -->
      <rect x="5" y="5" width="20" height="20" fill="#000" />
      <rect x="8" y="8" width="14" height="14" fill="#fff" />
      <rect x="11" y="11" width="8" height="8" fill="#000" />
      
      <rect x="75" y="5" width="20" height="20" fill="#000" />
      <rect x="78" y="8" width="14" height="14" fill="#fff" />
      <rect x="81" y="81" width="8" height="8" fill="#000" />
      
      <rect x="5" y="75" width="20" height="20" fill="#000" />
      <rect x="8" y="78" width="14" height="14" fill="#fff" />
      <rect x="11" y="81" width="8" height="8" fill="#000" />
      
      <!-- Random QR Pixel Simulation -->
      <rect x="35" y="5" width="8" height="8" fill="#000" />
      <rect x="50" y="10" width="12" height="6" fill="#000" />
      <rect x="65" y="5" width="6" height="12" fill="#000" />
      
      <rect x="30" y="30" width="10" height="10" fill="#000" />
      <rect x="45" y="25" width="15" height="15" fill="#10b981" /> <!-- Primary accent center QR block -->
      <rect x="65" y="35" width="8" height="8" fill="#000" />
      
      <rect x="30" y="55" width="15" height="8" fill="#000" />
      <rect x="50" y="50" width="10" height="10" fill="#000" />
      <rect x="65" y="60" width="12" height="6" fill="#000" />
      
      <rect x="35" y="75" width="8" height="12" fill="#000" />
      <rect x="50" y="75" width="14" height="6" fill="#000" />
      <rect x="55" y="85" width="8" height="8" fill="#000" />
      
      <!-- Bottom right marker -->
      <rect x="75" y="75" width="20" height="20" fill="#000" />
      <rect x="78" y="78" width="14" height="14" fill="#fff" />
      <rect x="81" y="81" width="8" height="8" fill="#000" />
    </svg>
  `;
  
  modal.classList.add("active");
  
  // Timer countdown
  let minutes = 2;
  let seconds = 0;
  const timerDom = document.getElementById("qrisTimer");
  
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);
  paymentTimerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(paymentTimerInterval);
        alert("Waktu pembayaran QRIS habis. Silakan coba lagi.");
        closeModal();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    const secStr = seconds < 10 ? `0${seconds}` : seconds;
    const minStr = minutes < 10 ? `0${minutes}` : minutes;
    if (timerDom) timerDom.innerText = `${minStr}:${secStr}`;
  }, 1000);
}

function closeModal() {
  sound.playClick();
  const modal = document.getElementById("paymentModal");
  modal.classList.remove("active");
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);
}

function simulatePayment() {
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);
  sound.playSuccessPayment();
  
  // Format items from cart
  const orderedItems = appState.cart.map(cItem => {
    const itemData = MENU_DATA.find(m => m.id === cItem.menuId);
    return {
      id: cItem.menuId,
      name: itemData.name,
      price: itemData.price,
      qty: cItem.qty,
      note: cItem.note
    };
  });
  
  // Compute total
  let totalAmt = 0;
  orderedItems.forEach(i => totalAmt += i.price * i.qty);
  
  // Create dynamic new order
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    tableNo: "05", // Mock Table QR scan
    items: orderedItems,
    total: totalAmt,
    status: "pending",
    time: timeStr,
    timestamp: Date.now()
  };
  
  // Add to active orders list (Real-time synced)
  appState.orders.push(newOrder);
  
  // Clear Cart
  appState.cart = [];
  
  // Render Success screen inside Modal
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <div class="payment-success-content">
      <div class="success-icon-animation">
        <i class="fas fa-check"></i>
      </div>
      <h3 class="modal-title" style="color: var(--primary);">Pembayaran Sukses!</h3>
      <p class="modal-subtitle" style="margin-bottom:12px;">Transaksi lunas via QRIS E-Wallet</p>
      
      <div style="font-size: 13px; color: var(--text-secondary); background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:10px; padding:12px; width:100%; margin-bottom:16px;">
        <div>No Pesanan: <strong>${newOrder.id}</strong></div>
        <div style="margin-top: 4px;">Status Dapur: <span style="color: var(--danger); font-weight:700;">Menunggu Antrean Dapur</span></div>
      </div>
      
      <p style="font-size: 11px; color: var(--text-muted);">Pesananmu otomatis dikirim ke layar Dapur restoran secara real-time. Pelayan akan mengantarkan hidangan ke <strong>Meja 05</strong> setelah matang!</p>
      
      <button class="success-done-btn" onclick="closeModal()">Selesai & Tutup</button>
    </div>
  `;
  
  // Refresh customer view cart
  renderCart();
  
  // If kitchen or admin views are open or updated behind the scenes, we make sure they sync!
  // Send virtual notification to kitchen view if anyone is monitoring
  setTimeout(() => {
    sound.playNewOrder();
  }, 1000);
}

// ----------------------------------------
// KITCHEN VIEW RENDERING & CONTROLLER
// ----------------------------------------

function renderKitchenOrders() {
  const container = document.getElementById("kitchenOrdersGrid");
  const cookingCountDom = document.getElementById("kitchenCookingCount");
  const pendingCountDom = document.getElementById("kitchenPendingCount");
  
  container.innerHTML = "";
  
  // Exclude fully completed orders from the kitchen list to keep active queue
  const activeOrders = appState.orders.filter(o => o.status !== "completed");
  
  // Update stats counters
  const cookingCount = appState.orders.filter(o => o.status === "cooking").length;
  const pendingCount = appState.orders.filter(o => o.status === "pending").length;
  
  cookingCountDom.innerText = `${cookingCount} Memasak`;
  pendingCountDom.innerText = `${pendingCount} Menunggu`;
  
  if (activeOrders.length === 0) {
    container.innerHTML = `
      <div class="kitchen-empty-state">
        <i class="fas fa-utensils kitchen-empty-icon"></i>
        <h3>Belum ada pesanan masuk</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-top:8px;">Pesanan dari pelanggan yang lunas akan otomatis muncul di sini</p>
      </div>
    `;
    return;
  }
  
  // Render newest orders first
  const sortedOrders = [...activeOrders].sort((a, b) => b.timestamp - a.timestamp);
  
  sortedOrders.forEach(order => {
    const card = document.createElement("div");
    card.className = `kitchen-order-card ${order.status}`;
    
    // Status text details
    let statusClass = "status-pending";
    let statusLabel = "Menunggu";
    let actionBtnHtml = "";
    
    if (order.status === "pending") {
      statusClass = "status-pending";
      statusLabel = "Menunggu";
      actionBtnHtml = `
        <button class="kitchen-btn kitchen-btn-cook" onclick="kitchenStartCooking('${order.id}')">
          <i class="fas fa-fire"></i> Masak
        </button>
      `;
    } else if (order.status === "cooking") {
      statusClass = "status-cooking";
      statusLabel = "Sedang Dimasak";
      actionBtnHtml = `
        <button class="kitchen-btn kitchen-btn-ready" onclick="kitchenReady('${order.id}')">
          <i class="fas fa-check"></i> Siap Saji
        </button>
      `;
    } else if (order.status === "ready") {
      statusClass = "status-ready";
      statusLabel = "Siap Diantar";
      actionBtnHtml = `
        <button class="kitchen-btn kitchen-btn-ready" style="background:var(--accent);" onclick="kitchenComplete('${order.id}')">
          <i class="fas fa-paper-plane"></i> Selesai/Diantar
        </button>
      `;
    }
    
    // Items html list
    let itemsHtml = "";
    order.items.forEach(it => {
      itemsHtml += `
        <div class="kitchen-item-row">
          <div class="kitchen-item-qty-name">
            <span class="kitchen-item-qty">${it.qty}x</span>
            <span class="kitchen-item-name">${it.name}</span>
          </div>
        </div>
        ${it.note ? `<div class="kitchen-item-note"><i class="fas fa-comment-dots"></i> ${it.note}</div>` : ''}
      `;
    });
    
    card.innerHTML = `
      <div class="kitchen-card-header">
        <div class="order-meta-info">
          <span class="order-table">MEJA ${order.tableNo}</span>
          <span class="order-time">${order.id} | Jam ${order.time}</span>
        </div>
        <span class="kitchen-order-status ${statusClass}">${statusLabel}</span>
      </div>
      <div class="kitchen-order-items">
        ${itemsHtml}
      </div>
      <div class="kitchen-card-actions">
        <button class="kitchen-btn kitchen-btn-print" onclick="kitchenSelectForReceipt('${order.id}')" title="Pilih Struk">
          <i class="fas fa-file-receipt"></i> Struk
        </button>
        ${actionBtnHtml}
      </div>
    `;
    
    container.appendChild(card);
  });
}

function kitchenStartCooking(orderId) {
  sound.playClick();
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = "cooking";
    renderKitchenOrders();
    // If selected in receipt, refresh it too
    if (appState.selectedReceiptOrder && appState.selectedReceiptOrder.id === orderId) {
      renderKitchenReceipt();
    }
  }
}

function kitchenReady(orderId) {
  sound.playSuccessPayment(); // Nice high chime
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = "ready";
    renderKitchenOrders();
    if (appState.selectedReceiptOrder && appState.selectedReceiptOrder.id === orderId) {
      renderKitchenReceipt();
    }
  }
}

function kitchenComplete(orderId) {
  sound.playClick();
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = "completed";
    renderKitchenOrders();
    
    // Auto-update analytics in admin panel if active
    renderAdminStats();
    
    if (appState.selectedReceiptOrder && appState.selectedReceiptOrder.id === orderId) {
      renderKitchenReceipt();
    }
  }
}

function kitchenSelectForReceipt(orderId) {
  sound.playClick();
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    appState.selectedReceiptOrder = order;
    renderKitchenReceipt();
  }
}

function renderKitchenReceipt() {
  const container = document.getElementById("virtualReceiptContainer");
  const order = appState.selectedReceiptOrder;
  
  if (!order) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted); font-family: monospace;">
        <i class="fas fa-receipt" style="font-size: 32px; margin-bottom: 8px; opacity: 0.5;"></i>
        <p>Pilih tombol "Struk" pada pesanan di kiri untuk melihat struk cetak dapur</p>
      </div>
    `;
    return;
  }
  
  let itemsHtml = "";
  order.items.forEach(it => {
    itemsHtml += `
      <div class="receipt-item-row">
        <span>${it.name}</span>
        <span>${it.qty}x</span>
      </div>
      ${it.note ? `<div class="receipt-item-note">* Catatan: ${it.note}</div>` : ''}
    `;
  });
  
  // Format total
  const totalStr = formatRupiah(order.total);
  
  container.innerHTML = `
    <div class="receipt-paper-wrapper" id="receiptPaper">
      <div class="receipt-center">
        <div class="receipt-title">RASA LEGENDARIS</div>
        <div style="font-size: 10px;">Ruko Clean & Delicious Kav. 12</div>
        <div style="font-size: 10px;">Telp: (021) 555-8291</div>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-row">
        <span>NO: ${order.id}</span>
        <span>MEJA: ${order.tableNo}</span>
      </div>
      <div class="receipt-row">
        <span>TGL: 18-05-2026</span>
        <span>JAM: ${order.time}</span>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-items">
        ${itemsHtml}
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-row" style="font-weight: 800;">
        <span>TOTAL LUNAS</span>
        <span>${totalStr}</span>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-center" style="font-weight: 700; margin-top: 10px;">
        STATUS: ${order.status.toUpperCase()}
      </div>
      
      <div class="receipt-footer">
        * TERIMA KASIH *<br>
        Silakan Nikmati Hidangan Anda
      </div>
    </div>
    
    <button class="print-trigger-btn" onclick="window.print()">
      <i class="fas fa-print"></i> Cetak ke Printer Dapur
    </button>
  `;
}

// ----------------------------------------
// ADMIN VIEW RENDERING & CONTROLLER
// ----------------------------------------

function renderAdminStock() {
  const container = document.getElementById("adminStockList");
  container.innerHTML = "";
  
  MENU_DATA.forEach(item => {
    const isAvailable = appState.menuStock[item.id] !== false;
    
    const div = document.createElement("div");
    div.className = "stock-list-item";
    div.innerHTML = `
      <div class="stock-item-info">
        <div class="stock-item-avatar">
          <span style="font-size: 20px;">${item.icon}</span>
        </div>
        <div class="stock-item-text">
          <span class="stock-item-name">${item.name}</span>
          <span class="stock-item-category">${item.category.toUpperCase()} | ${formatRupiah(item.price)}</span>
        </div>
      </div>
      <div class="switch-wrapper">
        <span class="status-label ${isAvailable ? 'in-stock' : 'out-of-stock'}">
          ${isAvailable ? 'Tersedia' : 'Habis'}
        </span>
        <label class="switch-control">
          <input type="checkbox" ${isAvailable ? 'checked' : ''} onchange="adminToggleStock('${item.id}', this.checked)">
          <span class="switch-slider"></span>
        </label>
      </div>
    `;
    container.appendChild(div);
  });
}

function adminToggleStock(menuId, checkState) {
  sound.playClick();
  appState.menuStock[menuId] = checkState;
  
  // Sync view components immediately
  renderAdminStock();
  renderMenu();
}

function renderAdminStats() {
  // Compute total completed order revenues & dynamic item scores
  let totalRevenue = 0;
  let activeOrdersCount = 0;
  let itemSalesMap = {};
  
  // Count items sold based on all orders
  appState.orders.forEach(order => {
    if (order.status === "completed" || order.status === "ready" || order.status === "cooking") {
      totalRevenue += order.total;
    }
    
    if (order.status !== "completed") {
      activeOrdersCount++;
    }
    
    order.items.forEach(it => {
      if (!itemSalesMap[it.name]) {
        itemSalesMap[it.name] = 0;
      }
      itemSalesMap[it.name] += it.qty;
    });
  });
  
  // Find top selling item
  let topItemName = "Belum ada data";
  let topItemQty = 0;
  Object.keys(itemSalesMap).forEach(name => {
    if (itemSalesMap[name] > topItemQty) {
      topItemQty = itemSalesMap[name];
      topItemName = name;
    }
  });
  
  // Render counters
  document.getElementById("statTotalRevenue").innerText = formatRupiah(totalRevenue);
  document.getElementById("statActiveOrders").innerText = `${activeOrdersCount} Aktif`;
  document.getElementById("statTopSelling").innerText = topItemQty > 0 ? `${topItemName} (${topItemQty}x)` : "Belum ada";
  
  // Generate Premium SVG Line Chart for revenue trends
  generateRevenueChart();
  
  // Generate Premium SVG Horizontal Bar Chart for product scores
  generateProductChart(itemSalesMap);
}

// Dynamically generate a gorgeous premium Line Chart inside SVG container
function generateRevenueChart() {
  const container = document.getElementById("salesRevenueChart");
  
  // Hypothetical sales points for the last 5 days
  const dataPoints = [420000, 580000, 390000, 710000, 620000];
  
  // Add current active revenue dynamically as the latest data point
  let activeToday = 0;
  appState.orders.forEach(o => activeToday += o.total);
  dataPoints.push(activeToday);
  
  const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab/Hari Ini"];
  
  const width = 360;
  const height = 180;
  const padding = 30;
  
  const maxVal = Math.max(...dataPoints) * 1.15;
  const minVal = 0;
  
  // Build SVG string
  let svgHtml = `
    <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chartLineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(16, 185, 129, 0.4)" />
          <stop offset="100%" stop-color="rgba(16, 185, 129, 0.0)" />
        </linearGradient>
        <linearGradient id="glowFilter" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
      </defs>
      
      <!-- Grid lines -->
      <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      <line x1="${padding}" y1="${(height - padding * 2) / 2 + padding}" x2="${width - padding}" y2="${(height - padding * 2) / 2 + padding}" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  `;
  
  // Calculate point coordinates
  const coords = dataPoints.map((val, idx) => {
    const x = padding + (idx * (width - padding * 2)) / (dataPoints.length - 1);
    const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);
    return { x, y };
  });
  
  // 1. Build fill area path
  let pathArea = `M ${coords[0].x} ${height - padding} `;
  coords.forEach(pt => {
    pathArea += `L ${pt.x} ${pt.y} `;
  });
  pathArea += `L ${coords[coords.length - 1].x} ${height - padding} Z`;
  svgHtml += `<path d="${pathArea}" fill="url(#chartLineGrad)" />`;
  
  // 2. Build stroke line path
  let strokePath = `M ${coords[0].x} ${coords[0].y} `;
  for(let i=1; i<coords.length; i++) {
    strokePath += `L ${coords[i].x} ${coords[i].y} `;
  }
  svgHtml += `<path d="${strokePath}" fill="none" stroke="url(#glowFilter)" stroke-width="3.5" stroke-linecap="round" />`;
  
  // 3. Draw circles and text labels
  coords.forEach((pt, idx) => {
    // Label texts on X axis
    svgHtml += `
      <text x="${pt.x}" y="${height - 12}" fill="var(--text-secondary)" font-size="9" font-family="Plus Jakarta Sans" text-anchor="middle">${labels[idx]}</text>
    `;
    
    // Glowing dots on nodes
    svgHtml += `
      <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="#fff" stroke="#10b981" stroke-width="2" />
      <text x="${pt.x}" y="${pt.y - 10}" fill="#fff" font-size="8" font-family="monospace" text-anchor="middle" font-weight="700">${Math.round(dataPoints[idx]/1000)}k</text>
    `;
  });
  
  svgHtml += `</svg>`;
  container.innerHTML = svgHtml;
}

// Generate premium vertical/horizontal bar indicators for menu sales count
function generateProductChart(salesMap) {
  const container = document.getElementById("topProductChart");
  
  // Pre-fill some defaults if sales list is dry
  let itemsData = [
    { name: "Sate Ayam", qty: salesMap["Sate Ayam Madura"] || 5 },
    { name: "Nasi Goreng", qty: salesMap["Nasi Goreng Spesial"] || 4 },
    { name: "Ayam Goreng", qty: salesMap["Ayam Goreng Kremes"] || 3 },
    { name: "Kopi Aren", qty: salesMap["Kopi Susu Aren Premium"] || 2 },
    { name: "Pisang Keju", qty: salesMap["Pisang Goreng Keju Susu"] || 1 }
  ];
  
  // Sort descending
  itemsData.sort((a,b) => b.qty - a.qty);
  
  const width = 360;
  const height = 180;
  const paddingLeft = 90;
  const paddingRight = 40;
  const paddingTop = 15;
  const paddingBottom = 15;
  
  const maxQty = Math.max(...itemsData.map(d => d.qty)) || 1;
  const rowHeight = (height - paddingTop - paddingBottom) / itemsData.length;
  
  let svgHtml = `
    <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
  `;
  
  itemsData.forEach((item, idx) => {
    const y = paddingTop + idx * rowHeight + (rowHeight - 16) / 2;
    const barWidth = ((width - paddingLeft - paddingRight) * item.qty) / maxQty;
    
    svgHtml += `
      <!-- Label -->
      <text x="${paddingLeft - 10}" y="${y + 12}" fill="var(--text-secondary)" font-size="10" font-family="Plus Jakarta Sans" text-anchor="end" font-weight="600">${item.name}</text>
      
      <!-- Base Background Bar -->
      <rect x="${paddingLeft}" y="${y}" width="${width - paddingLeft - paddingRight}" height="14" fill="rgba(255,255,255,0.03)" rx="4" />
      
      <!-- Filled Glowing Bar -->
      <rect x="${paddingLeft}" y="${y}" width="${Math.max(barWidth, 4)}" height="14" fill="url(#barGrad)" rx="4" />
      
      <!-- Score Count Label -->
      <text x="${paddingLeft + barWidth + 8}" y="${y + 11}" fill="#fff" font-size="10" font-family="monospace" font-weight="700">${item.qty} Porsi</text>
    `;
  });
  
  svgHtml += `</svg>`;
  container.innerHTML = svgHtml;
}

// ----------------------------------------
// CORE HELPER & INITIALIZER UTILITIES
// ----------------------------------------

function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

function toggleAudio() {
  appState.audioEnabled = !appState.audioEnabled;
  sound.init(); // Warm up context on human action
  
  const pill = document.getElementById("audioPill");
  if (appState.audioEnabled) {
    pill.classList.add("active");
    pill.innerHTML = `<i class="fas fa-volume-up"></i> Suara Efek: Aktif`;
  } else {
    pill.classList.remove("active");
    pill.innerHTML = `<i class="fas fa-volume-mute"></i> Suara Efek: Sunyi`;
  }
}

// Page load event
window.addEventListener("DOMContentLoaded", () => {
  // Initialize default views
  setRole("customer");
  
  // Set up event listeners that aren't inline
  document.getElementById("searchInput").addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });
});
