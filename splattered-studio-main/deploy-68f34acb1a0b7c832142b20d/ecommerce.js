// Comprehensive Multi-Platform E-commerce System
// Splattered Studio - Custom Art & Footwear Platform

class SplatteredStudio {
    constructor() {
        this.products = [];
        this.cart = [];
        this.programs = [];
        this.books = [];
        this.paintings = [];
        this.platforms = {};
        this.salesTracker = {
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            total: 0
        };

        this.initialize();
    }

    async initialize() {
        console.log('🚀 Initializing Splattered Studio E-commerce Platform...');

        // Load all content
        await this.loadPrograms();
        await this.loadBooks();
        await this.loadPaintings();
        await this.loadProducts();
        await this.initializePlatforms();

        // Set up UI
        this.setupNavigation();
        this.setupShoeCustomizer();
        this.renderGallery();
        this.renderShop();
        this.renderBlog();

        // Set up WebSocket connection for real-time updates
        this.setupWebSocket();

        // Set up dashboard
        this.setupDashboard();

        // Load existing orders and sales data
        this.loadExistingData();
    }

    // Load the four main program lists
    async loadPrograms() {
        this.programs = [
            {
                id: 1,
                title: "Autonomous Business Automation",
                description: "Complete AI-powered business management system",
                price: 297,
                features: ["AI Decision Making", "Automated Workflows", "Real-time Analytics", "Revenue Optimization"],
                image: "🤖",
                category: "Software"
            },
            {
                id: 2,
                title: "Digital Art Masterclass",
                description: "Learn professional digital painting techniques",
                price: 97,
                features: ["Procreate Tutorials", "Digital Brushes", "Color Theory", "Portfolio Building"],
                image: "🎨",
                category: "Education"
            },
            {
                id: 3,
                title: "Custom Shoe Design Workshop",
                description: "Design and create your own custom footwear",
                price: 147,
                features: ["Design Templates", "Material Selection", "Manufacturing Guide", "Business Setup"],
                image: "👟",
                category: "Workshop"
            },
            {
                id: 4,
                title: "3D Design Masterclass",
                description: "Learn professional 3D modeling and printing techniques",
                price: 147,
                features: ["3D Modeling Software", "Printing Techniques", "Material Science", "Portfolio Building"],
                image: "🖥️",
                category: "3D Education"
            }
        ];
    }

    // Load book collection
    async loadBooks() {
        this.books = [
            {
                id: 1,
                title: "The Art of Automation",
                author: "Splattered Studio",
                price: 24.99,
                description: "Mastering AI-powered business systems",
                cover: "📚",
                pages: 256,
                format: "Digital + Physical"
            },
            {
                id: 2,
                title: "Custom Shoe Revolution",
                author: "Splattered Studio",
                price: 19.99,
                description: "Building a custom footwear empire",
                cover: "👟",
                pages: 180,
                format: "Digital Guide"
            },
            {
                id: 3,
                title: "Digital Art Mastery",
                author: "Splattered Studio",
                price: 29.99,
                description: "Professional digital painting techniques",
                cover: "🎨",
                pages: 320,
                format: "Digital + Video Course"
            }
        ];
    }

    // Load paintings collection
    async loadPaintings() {
        this.paintings = [
            {
                id: 1,
                title: "Digital Dreamscape",
                artist: "Splattered Studio",
                price: 450,
                medium: "Digital Art",
                size: "24x36 inches",
                description: "Abstract digital artwork exploring consciousness",
                image: "🌌"
            },
            {
                id: 2,
                title: "Urban Splatter",
                artist: "Splattered Studio",
                price: 380,
                medium: "Mixed Media",
                size: "18x24 inches",
                description: "City-inspired abstract expressionism",
                image: "🏙️"
            },
            {
                id: 3,
                title: "Neon Nights",
                artist: "Splattered Studio",
                price: 520,
                medium: "Digital Painting",
                size: "30x40 inches",
                description: "Vibrant nightlife captured in digital form",
                image: "🌃"
            },
            {
                id: 4,
                title: "Geometric Harmony",
                artist: "Splattered Studio",
                price: 295,
                medium: "Digital Art",
                size: "20x20 inches",
                description: "Mathematical beauty meets artistic expression",
                image: "🔷"
            }
        ];
    }

    // Load products for shop
    async loadProducts() {
        this.products = [
            {
                id: 1,
                name: "Custom Splatter Sneakers",
                price: 89,
                image: "👟",
                description: "Hand-painted custom sneakers with your choice of colors and patterns",
                category: "Footwear",
                inStock: true,
                variants: ["Size 6", "Size 7", "Size 8", "Size 9", "Size 10", "Size 11"]
            },
            {
                id: 2,
                name: "Digital Art Print Pack",
                price: 39,
                image: "🖼️",
                description: "Set of 5 high-quality digital art prints",
                category: "Art",
                inStock: true,
                variants: ["Small (8x10)", "Medium (11x14)", "Large (16x20)"]
            },
            {
                id: 3,
                name: "Design Workshop Kit",
                price: 67,
                image: "🎨",
                description: "Complete kit for creating custom shoe designs",
                category: "Workshop",
                inStock: true,
                variants: ["Basic Kit", "Pro Kit", "Master Kit"]
            },
            {
                id: 4,
                name: "3D Printed Art Sculpture",
                price: 45,
                image: "🗿",
                description: "Custom 3D printed sculpture based on your digital designs",
                category: "3D Art",
                inStock: true,
                variants: ["Small (4 inch)", "Medium (6 inch)", "Large (8 inch)"]
            },
            {
                id: 5,
                name: "3D Custom Phone Case",
                price: 25,
                image: "📱",
                description: "Personalized 3D printed phone case with unique textures",
                category: "Accessories",
                inStock: true,
                variants: ["iPhone Models", "Samsung Models", "Google Pixel"]
            },
            {
                id: 6,
                name: "3D Design Prototype Kit",
                price: 79,
                image: "🔧",
                description: "Professional 3D printing kit for designers and creators",
                category: "Workshop",
                inStock: true,
                variants: ["Starter Kit", "Professional Kit", "Studio Kit"]
            }
        ];
    }

    // Initialize all platform connections
    async initializePlatforms() {
        this.platforms = {
            shopify: await this.initializeShopify(),
            etsy: await this.initializeEtsy(),
            amazon: await this.initializeAmazon(),
            ebay: await this.initializeEbay(),
            facebook: await this.initializeFacebook(),
            instagram: await this.initializeInstagram(),
            tiktok: await this.initializeTikTok(),
            wordpress: await this.initializeWordPress()
        };
    }

    // Platform initialization methods (simplified for demo)
    async initializeShopify() {
        return {
            connected: true,
            storeId: "splattered-studio",
            webhookUrl: "/api/shopify/webhook",
            syncEnabled: true
        };
    }

    async initializeEtsy() {
        return {
            connected: true,
            shopId: "SplatteredStudio",
            apiConfigured: true,
            syncEnabled: true
        };
    }

    async initializeAmazon() {
        return {
            connected: true,
            sellerId: "SPLATTEREDSTUDIO",
            marketplace: "US",
            syncEnabled: true
        };
    }

    async initializeEbay() {
        return {
            connected: true,
            sellerId: "splattered_studio",
            authToken: "configured",
            syncEnabled: true
        };
    }

    async initializeFacebook() {
        return {
            connected: true,
            pageId: "SplatteredStudio",
            catalogId: "catalog_123",
            syncEnabled: true
        };
    }

    async initializeInstagram() {
        return {
            connected: true,
            accountId: "splattered_studio",
            shoppingEnabled: true,
            syncEnabled: true
        };
    }

    async initializeTikTok() {
        return {
            connected: true,
            shopId: "splattered_studio_shop",
            apiConfigured: true,
            syncEnabled: true
        };
    }

    async initializeWordPress() {
        return {
            connected: true,
            siteUrl: "https://splatteredstudio.blog",
            wooCommerce: true,
            syncEnabled: true
        };
    }

    // Set up navigation and routing
    setupNavigation() {
        // Handle navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);

                if (target === 'cart') {
                    this.showCart();
                } else {
                    this.scrollToSection(target);
                    this.setActiveNav(target);
                }
            });
        });

        // Update cart count
        this.updateCartCount();
    }

    // Set up shoe customizer
    setupShoeCustomizer() {
        const canvas = document.getElementById('shoeCanvas');
        const ctx = canvas.getContext('2d');

        // Set up event listeners for customization controls
        document.getElementById('baseColor').addEventListener('input', (e) => {
            this.updateShoePreview();
        });

        document.getElementById('designColor').addEventListener('input', (e) => {
            this.updateShoePreview();
        });

        document.getElementById('patternSelect').addEventListener('change', (e) => {
            this.updateShoePreview();
        });

        // Initial render
        this.updateShoePreview();
    }

    // Update shoe preview canvas
    updateShoePreview() {
        const canvas = document.getElementById('shoeCanvas');
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get current settings
        const baseColor = document.getElementById('baseColor').value;
        const designColor = document.getElementById('designColor').value;
        const pattern = document.getElementById('patternSelect').value;

        // Draw shoe base
        ctx.fillStyle = baseColor;
        this.drawShoeBase(ctx);

        // Draw pattern
        ctx.fillStyle = designColor;
        this.drawPattern(ctx, pattern);

        // Add shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(50, 50, 80, 40);
    }

    // Draw basic shoe shape
    drawShoeBase(ctx) {
        ctx.beginPath();
        ctx.ellipse(200, 150, 120, 60, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw sole
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.ellipse(200, 180, 100, 20, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw patterns
    drawPattern(ctx, pattern) {
        switch(pattern) {
            case 'splatter':
                this.drawSplatter(ctx);
                break;
            case 'geometric':
                this.drawGeometric(ctx);
                break;
            case 'floral':
                this.drawFloral(ctx);
                break;
            case 'abstract':
                this.drawAbstract(ctx);
                break;
        }
    }

    drawSplatter(ctx) {
        for(let i = 0; i < 20; i++) {
            const x = 100 + Math.random() * 200;
            const y = 100 + Math.random() * 100;
            const size = Math.random() * 15 + 5;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawGeometric(ctx) {
        ctx.beginPath();
        ctx.moveTo(150, 120);
        ctx.lineTo(250, 120);
        ctx.lineTo(200, 180);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(120, 140);
        ctx.lineTo(180, 140);
        ctx.lineTo(150, 100);
        ctx.closePath();
        ctx.fill();
    }

    drawFloral(ctx) {
        // Draw flower petals
        for(let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const x = 200 + Math.cos(angle) * 30;
            const y = 150 + Math.sin(angle) * 30;

            ctx.beginPath();
            ctx.ellipse(x, y, 15, 25, angle, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw center
        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath();
        ctx.arc(200, 150, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    drawAbstract(ctx) {
        // Draw abstract shapes
        ctx.beginPath();
        ctx.moveTo(160, 130);
        ctx.quadraticCurveTo(200, 110, 240, 130);
        ctx.quadraticCurveTo(220, 170, 160, 150);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#E91E63';
        ctx.beginPath();
        ctx.arc(180, 160, 12, 0, Math.PI * 2);
        ctx.fill();
    }

    // Render art gallery
    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');

        this.paintings.forEach(painting => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <div class="gallery-image">${painting.image}</div>
                <div class="gallery-info">
                    <h3>${painting.title}</h3>
                    <p>${painting.description}</p>
                    <p><strong>${painting.medium} • ${painting.size}</strong></p>
                    <p class="product-price">$${painting.price}</p>
                    <button class="btn btn-primary" onclick="app.addToCart({
                        id: 'painting_${painting.id}',
                        name: '${painting.title}',
                        price: ${painting.price},
                        type: 'painting'
                    })">Add to Cart</button>
                </div>
            `;
            galleryGrid.appendChild(item);
        });
    }

    // Render shop products
    renderShop() {
        const productsGrid = document.getElementById('productsGrid');

        this.products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">$${product.price}</div>
                    <button class="btn btn-primary" onclick="app.addToCart({
                        id: '${product.id}',
                        name: '${product.name}',
                        price: ${product.price},
                        type: 'product'
                    })">Add to Cart</button>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }

    // Render blog posts
    renderBlog() {
        const blogPosts = document.getElementById('blogPosts');

        const posts = [
            {
                title: "The Future of Custom Footwear",
                date: "2024-01-15",
                excerpt: "Exploring how AI and automation are revolutionizing the custom shoe industry...",
                image: "👟"
            },
            {
                title: "Digital Art in the Modern Era",
                date: "2024-01-10",
                excerpt: "How digital tools are changing the way we create and experience art...",
                image: "🎨"
            },
            {
                title: "Building a Multi-Platform Business",
                date: "2024-01-05",
                excerpt: "Strategies for selling across Shopify, Etsy, Amazon, and beyond...",
                image: "💼"
            }
        ];

        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                <div class="blog-image">${post.image}</div>
                <div class="blog-content">
                    <h3 class="blog-title">${post.title}</h3>
                    <div class="blog-date">${new Date(post.date).toLocaleDateString()}</div>
                    <p>${post.excerpt}</p>
                    <a href="#" class="btn btn-secondary">Read More</a>
                </div>
            `;
            blogPosts.appendChild(postElement);
        });
    }

    // Add item to cart
    addToCart(item) {
        this.cart.push(item);
        this.updateCartCount();
        this.updateCartDisplay();
        this.syncToAllPlatforms(item, 'add');

        // Show success message
        this.showNotification(`Added ${item.name} to cart!`, 'success');
    }

    // Update cart count in navigation
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = this.cart.length;
    }

    // Show cart modal
    showCart() {
        let cartModal = document.querySelector('.cart-overlay');

        if (!cartModal) {
            cartModal = document.createElement('div');
            cartModal.className = 'cart-overlay';
            cartModal.innerHTML = `
                <div class="cart-modal">
                    <h2>Shopping Cart</h2>
                    <div class="cart-items" id="cartItems"></div>
                    <div class="cart-total">
                        <h3>Total: $<span id="cartTotalAmount">0.00</span></h3>
                        <button class="btn btn-primary" onclick="app.checkout()">Proceed to Checkout</button>
                        <button class="btn btn-secondary" onclick="app.closeCart()">Continue Shopping</button>
                    </div>
                </div>
            `;
            document.body.appendChild(cartModal);
        }

        this.updateCartDisplay();
        cartModal.style.display = 'flex';
    }

    // Close cart modal
    closeCart() {
        const cartModal = document.querySelector('.cart-overlay');
        if (cartModal) {
            cartModal.style.display = 'none';
        }
    }

    // Update cart display
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const totalAmount = document.getElementById('cartTotalAmount');

        if (cartItems) {
            cartItems.innerHTML = '';

            if (this.cart.length === 0) {
                cartItems.innerHTML = '<p>Your cart is empty</p>';
            } else {
                this.cart.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cart-item';
                    itemElement.innerHTML = `
                        <div class="cart-item-image">${item.type === 'painting' ? '🖼️' : '👟'}</div>
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">$${item.price}</div>
                        </div>
                        <button class="remove-item" onclick="app.removeFromCart(${index})">×</button>
                    `;
                    cartItems.appendChild(itemElement);
                });
            }
        }

        // Update total
        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        if (totalAmount) {
            totalAmount.textContent = total.toFixed(2);
        }
    }

    // Remove item from cart
    removeFromCart(index) {
        const item = this.cart[index];
        this.cart.splice(index, 1);
        this.updateCartCount();
        this.updateCartDisplay();
        this.syncToAllPlatforms(item, 'remove');

        this.showNotification(`Removed ${item.name} from cart`, 'info');
    }

    // Checkout process
    async checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }

        try {
            // Process payment across all platforms
            const orderTotal = this.cart.reduce((sum, item) => sum + item.price, 0);

            // Simulate payment processing
            await this.processPayment(orderTotal);

            // Sync order to all platforms
            await this.syncOrderToPlatforms();

            // Track sale
            this.trackSale(orderTotal);

            // Clear cart
            this.cart = [];
            this.updateCartCount();
            this.updateCartDisplay();
            this.closeCart();

            this.showNotification(`Order placed successfully! Total: $${orderTotal.toFixed(2)}`, 'success');

        } catch (error) {
            console.error('Checkout failed:', error);
            this.showNotification('Payment failed. Please try again.', 'error');
        }
    }

    // Process payment (simulated)
    async processPayment(amount) {
        console.log(`Processing payment for $${amount}`);

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        return { success: true, transactionId: 'tx_' + Date.now() };
    }

    // Sync to all platforms
    async syncToAllPlatforms(item, action) {
        console.log(`Syncing ${action}: ${item.name} to all platforms...`);

        const syncPromises = Object.keys(this.platforms).map(platform => {
            if (this.platforms[platform].syncEnabled) {
                return this.syncToPlatform(platform, item, action);
            }
        });

        try {
            await Promise.all(syncPromises);
            console.log(`✅ Successfully synced ${item.name} to all platforms`);
        } catch (error) {
            console.error('❌ Sync failed:', error);
        }
    }

    // Sync to specific platform
    async syncToPlatform(platform, item, action) {
        const platformConfig = this.platforms[platform];

        console.log(`Syncing to ${platform}:`, { item, action, config: platformConfig });

        // Simulate API calls (replace with real implementations)
        switch(platform) {
            case 'shopify':
                await this.syncToShopify(item, action);
                break;
            case 'etsy':
                await this.syncToEtsy(item, action);
                break;
            case 'amazon':
                await this.syncToAmazon(item, action);
                break;
            case 'facebook':
                await this.syncToFacebook(item, action);
                break;
            // Add other platforms...
        }
    }

    // Platform-specific sync methods (simplified)
    async syncToShopify(item, action) {
        // Simulate Shopify API call
        console.log(`Shopify API: ${action} product ${item.name}`);
        return { success: true, shopifyId: 'shopify_' + item.id };
    }

    async syncToEtsy(item, action) {
        console.log(`Etsy API: ${action} listing ${item.name}`);
        return { success: true, etsyId: 'etsy_' + item.id };
    }

    async syncToAmazon(item, action) {
        console.log(`Amazon SP-API: ${action} product ${item.name}`);
        return { success: true, amazonId: 'amazon_' + item.id };
    }

    async syncToFacebook(item, action) {
        console.log(`Facebook Catalog API: ${action} item ${item.name}`);
        return { success: true, facebookId: 'fb_' + item.id };
    }

    // Sync order to all platforms
    async syncOrderToPlatforms() {
        const orderData = {
            items: this.cart,
            total: this.cart.reduce((sum, item) => sum + item.price, 0),
            timestamp: new Date().toISOString(),
            orderId: 'order_' + Date.now()
        };

        console.log('Syncing order to all platforms:', orderData);

        // Sync to each platform (simplified)
        for (const platform of Object.keys(this.platforms)) {
            if (this.platforms[platform].syncEnabled) {
                await this.syncOrderToPlatform(platform, orderData);
            }
        }
    }

    async syncOrderToPlatform(platform, orderData) {
        console.log(`Syncing order ${orderData.orderId} to ${platform}`);
        // Implement platform-specific order sync
    }

    // Track sales
    trackSale(amount) {
        const now = new Date();
        const today = now.toDateString();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay())).toDateString();

        this.salesTracker.today += amount;
        this.salesTracker.thisWeek += amount;
        this.salesTracker.thisMonth += amount;
        this.salesTracker.total += amount;

        // Update dashboard
        this.updateSalesDisplay();

        // Save to local storage
        localStorage.setItem('salesTracker', JSON.stringify(this.salesTracker));
    }

    // Update sales display
    updateSalesDisplay() {
        // Update any sales dashboard elements
        console.log('Current sales:', this.salesTracker);
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '3000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#4CAF50' :
                           type === 'error' ? '#f44336' :
                           type === 'warning' ? '#FF9800' : '#2196F3'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Scroll to section
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Set active navigation
    setActiveNav(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Launch Autonomous Program
    launchAutonomousProgram() {
        // Show program launch modal or redirect to program setup
        const modal = document.createElement('div');
        modal.className = 'program-modal-overlay';
        modal.innerHTML = `
            <div class="program-modal">
                <h2>🚀 Launching Autonomous Business Program</h2>
                <div class="program-features">
                    <h3>What's Included:</h3>
                    <ul>
                        <li>✅ Complete AI-powered business automation</li>
                        <li>✅ Multi-platform integration (Shopify, Etsy, Amazon, etc.)</li>
                        <li>✅ Real-time inventory sync</li>
                        <li>✅ Automated pricing optimization</li>
                        <li>✅ Live analytics dashboard</li>
                        <li>✅ Lifetime updates & premium support</li>
                    </ul>
                </div>
                <div class="program-pricing">
                    <div class="price-tag">
                        <span class="original-price">$497</span>
                        <span class="sale-price">$297</span>
                        <span class="savings">Save $200!</span>
                    </div>
                </div>
                <div class="program-actions">
                    <button class="btn btn-primary" onclick="app.purchaseProgram()">Purchase Program - $297</button>
                    <button class="btn btn-secondary" onclick="app.closeProgramModal()">Maybe Later</button>
                </div>
                <div class="program-guarantee">
                    <p>✨ 30-day money-back guarantee</p>
                    <p>🔒 Secure payment processing</p>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .program-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            .program-modal {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                text-align: center;
            }
            .program-features ul {
                text-align: left;
                margin: 1rem 0;
            }
            .program-features li {
                margin: 0.5rem 0;
                color: var(--text-color);
            }
            .price-tag {
                margin: 1.5rem 0;
            }
            .original-price {
                text-decoration: line-through;
                color: #999;
                margin-right: 1rem;
            }
            .sale-price {
                font-size: 2rem;
                font-weight: bold;
                color: var(--primary-color);
            }
            .savings {
                background: #4CAF50;
                color: white;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                margin-left: 0.5rem;
                font-size: 0.9rem;
            }
            .program-guarantee {
                margin-top: 1.5rem;
                font-size: 0.9rem;
                color: var(--text-light);
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Track program interest
        this.trackProgramInterest();
    }

    // Close program modal
    closeProgramModal() {
        const modal = document.querySelector('.program-modal-overlay');
        if (modal) {
            modal.remove();
        }
        const style = document.querySelector('style');
        if (style && style.textContent.includes('.program-modal-overlay')) {
            style.remove();
        }
    }

    // Purchase program
    async purchaseProgram() {
        try {
            this.showNotification('Processing payment for Autonomous Program...', 'info');

            // Simulate payment processing
            await this.processPayment(297);

            this.closeProgramModal();
            this.showNotification('🎉 Welcome to the Autonomous Business Program! Setup will begin shortly.', 'success');

            // Track successful purchase
            this.trackSale(297);

        } catch (error) {
            console.error('Program purchase failed:', error);
            this.showNotification('Payment failed. Please try again.', 'error');
        }
    }

    // Set up WebSocket connection for real-time updates
    setupWebSocket() {
        this.ws = new WebSocket('ws://localhost:8080');

        this.ws.onopen = () => {
            console.log('🌐 Connected to real-time server');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleRealTimeUpdate(data);
        };

        this.ws.onclose = () => {
            console.log('🔌 Disconnected from real-time server');
            // Attempt to reconnect after 5 seconds
            setTimeout(() => this.setupWebSocket(), 5000);
        };
    }

    // Handle real-time updates from server
    handleRealTimeUpdate(data) {
        switch (data.type) {
            case 'sales_updated':
                this.updateSalesDisplay(data.data);
                break;
            case 'order_synced':
                this.addOrderToDashboard(data.data);
                break;
            case 'product_synced':
                this.showNotification(`Product ${data.data.product.name} synced to ${data.data.action}`, 'success');
                break;
        }
    }

    // Set up dashboard functionality
    setupDashboard() {
        // Dashboard will be initialized when section is loaded
        console.log('📊 Dashboard setup complete');
    }

    // Load existing orders and sales data
    loadExistingData() {
        // Load orders from server
        fetch('/api/platforms')
            .then(response => response.json())
            .then(data => {
                this.salesTracker = data.sales;
                this.updateSalesDisplay();

                // Load recent orders
                if (data.totalOrders > 0) {
                    this.loadRecentOrders();
                }
            })
            .catch(error => {
                console.error('Failed to load existing data:', error);
            });
    }

    // Load recent orders for dashboard
    async loadRecentOrders() {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();

            if (data && data.length > 0) {
                this.displayRecentOrders(data.slice(-5)); // Show last 5 orders
            }
        } catch (error) {
            console.error('Failed to load orders:', error);
        }
    }

    // Display recent orders in dashboard
    displayRecentOrders(orders) {
        const ordersList = document.getElementById('recentOrders');
        if (!ordersList) return;

        ordersList.innerHTML = '';

        orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <div>
                    <div class="order-id">${order.orderId}</div>
                    <div class="order-date">${new Date(order.timestamp).toLocaleDateString()}</div>
                </div>
                <div class="order-total">$${order.total.toFixed(2)}</div>
            `;
            ordersList.appendChild(orderElement);
        });
    }

    // Update sales display across dashboard
    updateSalesDisplay(salesData = null) {
        if (salesData) {
            this.salesTracker = salesData;
        }

        // Update dashboard cards
        const todayElement = document.getElementById('todaySales');
        const weekElement = document.getElementById('weekSales');
        const monthElement = document.getElementById('monthSales');
        const totalElement = document.getElementById('totalSales');

        if (todayElement) todayElement.textContent = `$${this.salesTracker.today.toFixed(2)}`;
        if (weekElement) weekElement.textContent = `$${this.salesTracker.thisWeek.toFixed(2)}`;
        if (monthElement) monthElement.textContent = `$${this.salesTracker.thisMonth.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${this.salesTracker.total.toFixed(2)}`;
    }

    // Refresh dashboard data
    async refreshDashboard() {
        this.showNotification('Refreshing dashboard...', 'info');

        try {
            const response = await fetch('/api/health');
            const data = await response.json();

            // Update platform status
            this.updatePlatformStatus(data.platforms);

            // Reload orders
            await this.loadRecentOrders();

            this.showNotification('Dashboard refreshed!', 'success');
        } catch (error) {
            console.error('Dashboard refresh failed:', error);
            this.showNotification('Refresh failed', 'error');
        }
    }

    // Update platform status in dashboard
    updatePlatformStatus(platforms) {
        const platformContainer = document.getElementById('platformStatus');
        if (!platformContainer) return;

        platformContainer.innerHTML = '';

        platforms.forEach(platform => {
            const platformElement = document.createElement('div');
            platformElement.className = `platform-item ${platform.name}`;
            platformElement.innerHTML = `
                <div>${platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}</div>
                <div style="font-size: 0.8rem; opacity: 0.8;">
                    ${platform.connected ? '✅ Connected' : '❌ Disconnected'}
                </div>
            `;
            platformContainer.appendChild(platformElement);
        });
    }

    // Export orders to Excel
    async exportOrders() {
        try {
            this.showNotification('Generating Excel export...', 'info');

            const response = await fetch('/api/export-excel?type=orders');
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `orders-export-${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            this.showNotification('Orders exported successfully!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('Export failed', 'error');
        }
    }

    // Sync all products to platforms
    async syncAllProducts() {
        try {
            this.showNotification('Syncing all products to platforms...', 'info');

            const response = await fetch('/api/sync-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: this.products,
                    action: 'update'
                })
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('All products synced successfully!', 'success');
            } else {
                throw new Error('Sync failed');
            }
        } catch (error) {
            console.error('Product sync failed:', error);
            this.showNotification('Product sync failed', 'error');
        }
    }

    // Open chat support
    openChatSupport() {
        const chatSection = document.getElementById('chatSection');
        if (chatSection) {
            chatSection.style.display = chatSection.style.display === 'none' ? 'block' : 'none';
            if (chatSection.style.display === 'block') {
                document.getElementById('chatInput')?.focus();
            }
        }
    }

    // Send chat message
    async sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');

        if (!chatInput || !chatMessages) return;

        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;

        chatMessages.appendChild(userMessage);
        chatInput.value = '';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Send to server
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Add bot response
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'chat-message bot';
                botMessage.innerHTML = `
                    <div class="message-content">${data.response}</div>
                    <div class="message-time">${new Date().toLocaleTimeString()}</div>
                `;

                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);

        } catch (error) {
            console.error('Chat failed:', error);
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'chat-message bot';
                botMessage.innerHTML = `
                    <div class="message-content">Sorry, I'm having trouble responding right now. Please try again later.</div>
                    <div class="message-time">${new Date().toLocaleTimeString()}</div>
                `;

                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // Generate business report
    async generateReport() {
        try {
            this.showNotification('Generating business report...', 'info');

            // Get current data
            const reportData = {
                sales: this.salesTracker,
                products: this.products.length,
                orders: this.orders.length,
                platforms: Object.keys(this.platforms).filter(p => this.platforms[p].connected).length,
                generatedAt: new Date().toISOString()
            };

            // Create report content
            const reportContent = `
# Splattered Studio Business Report
Generated: ${new Date().toLocaleDateString()}

## Sales Summary
- Today's Revenue: $${reportData.sales.today.toFixed(2)}
- Weekly Revenue: $${reportData.sales.thisWeek.toFixed(2)}
- Monthly Revenue: $${reportData.sales.thisMonth.toFixed(2)}
- Total Revenue: $${reportData.sales.total.toFixed(2)}

## Business Metrics
- Products Available: ${reportData.products}
- Total Orders: ${reportData.orders}
- Connected Platforms: ${reportData.platforms}

## Platform Status
${Object.keys(this.platforms).map(p =>
    `- ${p.charAt(0).toUpperCase() + p.slice(1)}: ${this.platforms[p].connected ? 'Connected' : 'Disconnected'}`
).join('\n')}

---
Report generated by Splattered Studio Dashboard
`;

            // Create download
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `business-report-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            this.showNotification('Business report generated!', 'success');
        } catch (error) {
            console.error('Report generation failed:', error);
            this.showNotification('Report generation failed', 'error');
        }
    }

    // Open in browser
    openBrowser() {
        const url = window.location.href;
        window.open(url, '_blank');
        this.showNotification('Opened in new browser tab', 'success');
    }

    // Add order to dashboard
    addOrderToDashboard(order) {
        const ordersList = document.getElementById('recentOrders');
        if (!ordersList) return;

        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        orderElement.innerHTML = `
            <div>
                <div class="order-id">${order.orderId}</div>
                <div class="order-date">${new Date(order.timestamp).toLocaleDateString()}</div>
            </div>
            <div class="order-total">$${order.total.toFixed(2)}</div>
        `;

        // Add to beginning of list
        ordersList.insertBefore(orderElement, ordersList.firstChild);

        // Keep only last 10 orders
        while (ordersList.children.length > 10) {
            ordersList.removeChild(ordersList.lastChild);
        }
    }

    // Enhanced track sale method
    trackSale(amount) {
        const now = new Date();
        const today = now.toDateString();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay())).toDateString();

        this.salesTracker.today += amount;
        this.salesTracker.thisWeek += amount;
        this.salesTracker.thisMonth += amount;
        this.salesTracker.total += amount;

        this.updateSalesDisplay();

        // Save to local storage
        localStorage.setItem('salesTracker', JSON.stringify(this.salesTracker));

        // Send to server for persistence
        fetch('/api/broadcast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'sales_updated',
                data: this.salesTracker
            })
        }).catch(error => console.error('Failed to broadcast sales update:', error));
    }

    // Sync all products to platforms
    async syncAllProducts() {
        console.log('🔄 Auto-syncing all products to platforms...');
        for (const product of this.products) {
            await this.syncToAllPlatforms(product, 'update');
        }
    }
}

// Initialize the application
const app = new SplatteredStudio();

// Global functions for HTML onclick handlers
function addToCart(item) {
    app.addToCart(item);
}

function removeFromCart(index) {
    app.removeFromCart(index);
}

function checkout() {
    app.checkout();
}

function scrollToSection(sectionId) {
    app.scrollToSection(sectionId);
}

function launchAutonomousProgram() {
    app.launchAutonomousProgram();
}

// Dashboard functions
function refreshDashboard() {
    app.refreshDashboard();
}

function exportOrders() {
    app.exportOrders();
}

function syncAllProducts() {
    app.syncAllProducts();
}

function openChatSupport() {
    app.openChatSupport();
}

function generateReport() {
    app.generateReport();
}

function openBrowser() {
    app.openBrowser();
}

function sendChatMessage() {
    app.sendChatMessage();
}
