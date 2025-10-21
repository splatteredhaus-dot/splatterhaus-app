const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');
const cron = require('node-cron');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// WebSocket connection for real-time updates
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

// Store connected clients
let connectedClients = new Set();

// Multi-platform integration manager
class MultiPlatformManager {
    constructor() {
        this.platforms = {
            shopify: { connected: false, apiKey: process.env.SHOPIFY_API_KEY },
            etsy: { connected: false, apiKey: process.env.ETSY_API_KEY },
            amazon: { connected: false, accessKey: process.env.AMAZON_ACCESS_KEY },
            ebay: { connected: false, authToken: process.env.EBAY_AUTH_TOKEN },
            facebook: { connected: false, accessToken: process.env.FACEBOOK_ACCESS_TOKEN },
            instagram: { connected: false, accessToken: process.env.INSTAGRAM_ACCESS_TOKEN },
            tiktok: { connected: false, accessToken: process.env.TIKTOK_ACCESS_TOKEN }
        };
        this.products = [];
        this.orders = [];
        this.salesTracker = {
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            total: 0
        };
    }

    async initializePlatforms() {
        console.log('🚀 Initializing multi-platform connections...');

        // Simulate platform connections (replace with real API calls)
        for (const [platform, config] of Object.entries(this.platforms)) {
            try {
                await this.connectToPlatform(platform, config);
            } catch (error) {
                console.error(`Failed to connect to ${platform}:`, error.message);
            }
        }

        console.log('✅ Platform initialization complete');
    }

    async connectToPlatform(platform, config) {
        // Simulate API connection
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.platforms[platform].connected = true;
        this.platforms[platform].lastSync = new Date();

        console.log(`✅ Connected to ${platform}`);
    }

    async syncProduct(product, action = 'create') {
        const syncPromises = Object.keys(this.platforms)
            .filter(platform => this.platforms[platform].connected)
            .map(platform => this.syncToPlatform(platform, product, action));

        try {
            await Promise.all(syncPromises);
            this.broadcastUpdate('product_synced', { product, action });
        } catch (error) {
            console.error('Platform sync failed:', error);
            throw error;
        }
    }

    async syncToPlatform(platform, product, action) {
        // Simulate platform-specific API calls
        console.log(`Syncing ${action} to ${platform}:`, product.name);

        // In real implementation, make actual API calls here
        await new Promise(resolve => setTimeout(resolve, 500));

        return { success: true, platform, productId: `${platform}_${product.id}` };
    }

    async syncOrder(order) {
        for (const platform of Object.keys(this.platforms)) {
            if (this.platforms[platform].connected) {
                await this.syncOrderToPlatform(platform, order);
            }
        }
        this.broadcastUpdate('order_synced', order);
    }

    async syncOrderToPlatform(platform, order) {
        console.log(`Syncing order ${order.orderId} to ${platform}`);
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    trackSale(amount) {
        const now = new Date();
        this.salesTracker.today += amount;
        this.salesTracker.thisWeek += amount;
        this.salesTracker.thisMonth += amount;
        this.salesTracker.total += amount;

        this.broadcastUpdate('sales_updated', this.salesTracker);

        // Save to file for persistence
        fs.writeFileSync('sales-tracker.json', JSON.stringify(this.salesTracker));
    }

    broadcastUpdate(type, data) {
        const message = JSON.stringify({ type, data, timestamp: new Date() });
        connectedClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    loadProductsFromCSV() {
        try {
            if (fs.existsSync('shoply_products.csv')) {
                const workbook = xlsx.readFile('shoply_products.csv');
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                this.products = xlsx.utils.sheet_to_json(worksheet);
                console.log(`📦 Loaded ${this.products.length} products from CSV`);
            }
        } catch (error) {
            console.error('Failed to load products from CSV:', error.message);
        }
    }
}

// Initialize platform manager
const platformManager = new MultiPlatformManager();

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        platforms: Object.keys(platformManager.platforms).map(p => ({
            name: p,
            connected: platformManager.platforms[p].connected
        }))
    });
});

// Get platform status
app.get('/api/platforms', (req, res) => {
    res.json({
        platforms: platformManager.platforms,
        totalProducts: platformManager.products.length,
        totalOrders: platformManager.orders.length,
        sales: platformManager.salesTracker
    });
});

// Create payment intent (Stripe)
app.post('/api/create-payment-intent', async (req, res) => {
    const { amount, currency = 'usd' } = req.body;

    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: 'Stripe not configured' });
    }

    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency,
            metadata: {
                source: 'splattered-studio'
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Payment intent creation failed:', error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
});

// Process order
app.post('/api/orders', async (req, res) => {
    const { items, total, customerInfo } = req.body;

    const order = {
        orderId: 'order_' + Date.now(),
        items,
        total,
        customerInfo,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };

    try {
        // Track sale
        platformManager.trackSale(total);

        // Sync to all platforms
        await platformManager.syncOrder(order);

        // Store order locally
        platformManager.orders.push(order);

        // Save orders to file
        fs.writeFileSync('orders.json', JSON.stringify(platformManager.orders));

        res.json({
            success: true,
            orderId: order.orderId,
            message: 'Order processed successfully'
        });

    } catch (error) {
        console.error('Order processing failed:', error);
        res.status(500).json({ error: 'Order processing failed' });
    }
});

// Sync products to all platforms
app.post('/api/sync-products', async (req, res) => {
    try {
        const { products, action = 'update' } = req.body;

        for (const product of products) {
            await platformManager.syncProduct(product, action);
        }

        res.json({ success: true, message: 'Products synced successfully' });
    } catch (error) {
        console.error('Product sync failed:', error);
        res.status(500).json({ error: 'Product sync failed' });
    }
});

// Export data to Excel
app.get('/api/export-excel', (req, res) => {
    try {
        const { type = 'orders' } = req.query;

        let data = [];
        let filename = '';

        switch (type) {
            case 'orders':
                data = platformManager.orders;
                filename = 'orders-export.xlsx';
                break;
            case 'products':
                data = platformManager.products;
                filename = 'products-export.xlsx';
                break;
            case 'sales':
                data = [platformManager.salesTracker];
                filename = 'sales-export.xlsx';
                break;
            default:
                return res.status(400).json({ error: 'Invalid export type' });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'No data to export' });
        }

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, type);

        const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(buffer);

    } catch (error) {
        console.error('Export failed:', error);
        res.status(500).json({ error: 'Export failed' });
    }
});

// Chat API endpoint
app.post('/api/chat', (req, res) => {
    const { message } = req.body;

    // Simple chatbot logic (can be enhanced with AI)
    let response = '';

    if (message.toLowerCase().includes('help')) {
        response = 'I can help you with orders, products, and account information. What do you need assistance with?';
    } else if (message.toLowerCase().includes('order')) {
        response = 'You can place orders through our website or contact us directly. Would you like to see our current products?';
    } else if (message.toLowerCase().includes('shipping')) {
        response = 'We offer worldwide shipping with tracking. Delivery typically takes 3-7 business days.';
    } else if (message.toLowerCase().includes('return')) {
        response = 'We accept returns within 30 days of delivery. Items must be in original condition.';
    } else {
        response = 'Thank you for your message! Our team will get back to you shortly.';
    }

    res.json({ response, timestamp: new Date().toISOString() });
});

// WebSocket broadcast for real-time updates
app.post('/api/broadcast', (req, res) => {
    const { type, data } = req.body;
    platformManager.broadcastUpdate(type, data);
    res.json({ success: true });
});

// Serve static files with fallback to index.html for SPA routing
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.path === '/' ? 'index.html' : req.path);

    // Check if file exists
    if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
        res.sendFile(filePath);
    } else {
        // Fallback to index.html for SPA routing
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Initialize everything
async function initialize() {
    console.log('🚀 Starting Splattered Studio E-commerce Platform...');

    // Load products from CSV
    platformManager.loadProductsFromCSV();

    // Load existing data
    try {
        if (fs.existsSync('orders.json')) {
            platformManager.orders = JSON.parse(fs.readFileSync('orders.json'));
        }
        if (fs.existsSync('sales-tracker.json')) {
            platformManager.salesTracker = JSON.parse(fs.readFileSync('sales-tracker.json'));
        }
    } catch (error) {
        console.error('Failed to load existing data:', error.message);
    }

    // Initialize platforms
    await platformManager.initializePlatforms();

    // Schedule automatic sync every hour
    cron.schedule('0 * * * *', async () => {
        console.log('🔄 Running scheduled platform sync...');
        try {
            for (const product of platformManager.products) {
                await platformManager.syncProduct(product, 'update');
            }
        } catch (error) {
            console.error('Scheduled sync failed:', error);
        }
    });

    console.log('✅ Splattered Studio platform fully initialized!');
}

// Start server
initialize().then(() => {
    server.listen(port, () => {
        console.log(`🌟 Server running at http://localhost:${port}`);
        console.log(`📊 Dashboard available at http://localhost:${port}/api/health`);
        console.log(`💰 Ready to process orders and sync across platforms!`);
    });
}).catch(error => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;
