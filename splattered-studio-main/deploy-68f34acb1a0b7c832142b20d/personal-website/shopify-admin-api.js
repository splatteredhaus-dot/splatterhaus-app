/**
 * GraphQL Admin API utilities for Shopify integration
 * Handles product variants, orders, and customer management
 */

const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL || 'splatteredhaus.myshopify.com';

class ShopifyAdminAPI {
  constructor() {
    this.baseURL = `https://${SHOPIFY_STORE_URL}/admin/api/2023-10/graphql.json`;
    this.headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
    };
  }

  async query(query, variables = {}) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ query, variables })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return result.data;
    } catch (error) {
      console.error('Shopify API Error:', error);
      throw error;
    }
  }

  // Create product variants
  async createProductVariants(productId, variants) {
    const mutation = `
      mutation productVariantsCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsCreate(productId: $productId, variants: $variants) {
          product {
            id
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    return this.query(mutation, { productId, variants });
  }

  // Get orders over $500
  async getHighValueOrders() {
    const query = `
      query {
        orders(first: 100, query: "totalPriceSet.shopMoney.amount:>500") {
          edges {
            node {
              id
              name
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              customer {
                id
                displayName
                email
              }
              createdAt
            }
          }
        }
      }
    `;

    return this.query(query);
  }

  // Add note to customer
  async addCustomerNote(customerId, note) {
    const mutation = `
      mutation customerUpdate($input: CustomerInput!) {
        customerUpdate(input: $input) {
          customer {
            id
            note
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    return this.query(mutation, {
      input: {
        id: customerId,
        note: note
      }
    });
  }
}

module.exports = ShopifyAdminAPI;
