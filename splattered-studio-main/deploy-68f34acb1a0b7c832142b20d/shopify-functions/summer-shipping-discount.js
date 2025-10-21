/**
 * Shopify Function: Auto-apply shipping discount for summer collection
 * Applies shipping discount when cart contains 2+ items from summer collection
 */

export function run(input) {
  const SUMMER_COLLECTION_TAG = 'summer-collection';
  const MIN_SUMMER_ITEMS = 2;
  const SHIPPING_DISCOUNT_CODE = 'SUMMER-SHIPPING-50';

  // Count summer collection items
  const summerItemsCount = input.cart.lines.reduce((count, line) => {
    const hasSummerTag = line.merchandise.product.tags.some(tag =>
      tag.toLowerCase().includes('summer')
    );
    return hasSummerTag ? count + line.quantity : count;
  }, 0);

  // If not enough summer items, no discount
  if (summerItemsCount < MIN_SUMMER_ITEMS) {
    return { status: 'continue' };
  }

  // Add shipping discount
  const discountApplication = {
    type: 'shipping_discount',
    title: 'Summer Collection Shipping Discount',
    description: '50% off shipping for 2+ summer items',
    value: 0.5, // 50% discount
    valueType: 'percentage'
  };

  return {
    status: 'continue',
    discounts: [discountApplication]
  };
}
