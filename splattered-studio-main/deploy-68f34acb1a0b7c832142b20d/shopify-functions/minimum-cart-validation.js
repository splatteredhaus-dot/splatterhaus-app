/**
 * Shopify Function: Cart validation requiring minimum 5 items
 * Blocks checkout if cart has fewer than 5 items
 */

export function run(input) {
  const MINIMUM_ITEMS = 5;
  const totalItems = input.cart.lines.reduce((sum, line) => sum + line.quantity, 0);

  if (totalItems < MINIMUM_ITEMS) {
    return {
      status: 'blocked',
      errors: [{
        code: 'MINIMUM_CART_SIZE',
        message: `Minimum ${MINIMUM_ITEMS} items required for checkout. You currently have ${totalItems} items.`
      }]
    };
  }

  return { status: 'continue' };
}
