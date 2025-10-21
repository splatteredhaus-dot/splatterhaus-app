// Spladdered Haus™ Shopify Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  initMobileMenu();

  // Product quick add functionality
  initQuickAdd();

  // Train dashboard functionality
  initTrainDashboard();

  // Collection sorting and filtering
  initCollectionControls();

  // Cart functionality
  initCartFeatures();
});

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
}

// Quick Add to Cart
function initQuickAdd() {
  const quickAddBtns = document.querySelectorAll('.quick-add-btn');

  quickAddBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      const form = this.closest('form');
      if (form) {
        fetch('/cart/add', {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            // Update cart count
            updateCartCount(data.items.length);

            // Show success message
            showNotification('Product added to cart!', 'success');
          }
        })
        .catch(error => {
          showNotification('Error adding product to cart', 'error');
        });
      }
    });
  });
}

// Train Dashboard
function initTrainDashboard() {
  const availableTools = document.querySelectorAll('.tool-item');
  const selectedTools = document.getElementById('selectedTools');
  const startTrainBtn = document.getElementById('startTrain');
  const stopTrainBtn = document.getElementById('stopTrain');
  const trainStatus = document.getElementById('trainStatus');
  const monitoringData = document.getElementById('monitoringData');

  let isRunning = false;
  let trainTools = [];

  if (!selectedTools) return;

  // Drag and drop functionality
  availableTools.forEach(tool => {
    tool.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('tool', this.dataset.tool);
    });
  });

  selectedTools.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  selectedTools.addEventListener('drop', function(e) {
    e.preventDefault();
    const tool = e.dataTransfer.getData('tool');
    if (tool && !trainTools.includes(tool)) {
      addToolToTrain(tool);
    }
  });

  function addToolToTrain(tool) {
    trainTools.push(tool);
    const toolElement = document.createElement('div');
    toolElement.className = 'train-car';
    toolElement.innerHTML = `
      <span>🚂 ${tool}</span>
      <button onclick="removeTool('${tool}')">❌</button>
    `;
    selectedTools.appendChild(toolElement);
  }

  window.removeTool = function(tool) {
    trainTools = trainTools.filter(t => t !== tool);
    const trainCars = selectedTools.querySelectorAll('.train-car');
    trainCars.forEach(car => {
      if (car.textContent.includes(tool)) {
        car.remove();
      }
    });
  };

  if (startTrainBtn) {
    startTrainBtn.addEventListener('click', function() {
      if (trainTools.length === 0) {
        showNotification('Please add tools to your train before starting!', 'warning');
        return;
      }
      isRunning = true;
      trainStatus.textContent = 'Status: 🚂 Running';
      startTrainBtn.disabled = true;
      stopTrainBtn.disabled = false;
      startMonitoring();
    });
  }

  if (stopTrainBtn) {
    stopTrainBtn.addEventListener('click', function() {
      isRunning = false;
      trainStatus.textContent = 'Status: ⏹️ Stopped';
      startTrainBtn.disabled = false;
      stopTrainBtn.disabled = true;
      monitoringData.innerHTML = '';
    });
  }

  function startMonitoring() {
    if (!isRunning) return;

    const data = {};
    trainTools.forEach(tool => {
      data[tool] = {
        status: Math.random() > 0.1 ? 'Running' : 'Error',
        posts: Math.floor(Math.random() * 50),
        sales: Math.floor(Math.random() * 20),
        revenue: (Math.random() * 500).toFixed(2)
      };
    });

    displayMonitoringData(data);
  }

  function displayMonitoringData(data) {
    monitoringData.innerHTML = '';
    Object.entries(data).forEach(([tool, info]) => {
      const card = document.createElement('div');
      card.className = 'monitoring-card';
      card.innerHTML = `
        <h4>${tool}</h4>
        <p><strong>Status:</strong> <span class="${info.status === 'Running' ? 'success' : 'error'}">${info.status}</span></p>
        <p><strong>Posts/Sales:</strong> ${info.posts}</p>
        <p><strong>Revenue:</strong> $${info.revenue}</p>
      `;
      monitoringData.appendChild(card);
    });

    if (isRunning) {
      setTimeout(() => startMonitoring(), 2000);
    }
  }
}

// Collection Controls
function initCollectionControls() {
  const sortSelect = document.getElementById('sort-by');
  const viewBtns = document.querySelectorAll('.view-btn');
  const productGrid = document.getElementById('productGrid');

  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      // Implement sorting logic here
      console.log('Sorting by:', this.value);
    });
  }

  viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      viewBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      if (productGrid) {
        if (this.dataset.view === 'list') {
          productGrid.classList.add('list-view');
        } else {
          productGrid.classList.remove('list-view');
        }
      }
    });
  });
}

// Cart Features
function initCartFeatures() {
  updateCartCount();

  // Cart drawer toggle
  const cartToggle = document.querySelector('.cart-toggle');
  const cartDrawer = document.querySelector('.cart-drawer');

  if (cartToggle && cartDrawer) {
    cartToggle.addEventListener('click', function() {
      cartDrawer.classList.toggle('open');
    });
  }
}

function updateCartCount(count) {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    if (count !== undefined) {
      cartCount.textContent = count;
    } else {
      // Fetch current cart count
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          cartCount.textContent = cart.item_count;
        });
    }
  }
}

// Utility Functions
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);
