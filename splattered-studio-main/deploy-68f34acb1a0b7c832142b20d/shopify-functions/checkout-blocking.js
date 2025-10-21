/**
 * Shopify Function: Block checkout for temperature-sensitive items
 * Blocks checkout when temperature-sensitive items are in zones that cannot fulfill them
 */

export function run(input) {
  // Define temperature-sensitive product tags
  const TEMPERATURE_SENSITIVE_TAGS = ['chocolate', 'frozen', 'refrigerated', 'heat-sensitive'];

  // Define zones that cannot properly fulfill temperature-sensitive items
  const RESTRICTED_ZONES = ['zone_hawaii', 'zone_alaska', 'zone_puerto_rico'];

  // Check if cart contains temperature-sensitive items
  const hasTemperatureSensitiveItems = input.cart.lines.some(line => {
    return line.merchandise.product.tags.some(tag =>
      TEMPERATURE_SENSITIVE_TAGS.includes(tag.toLowerCase())
    );
  });

  // If no temperature-sensitive items, allow checkout
  if (!hasTemperatureSensitiveItems) {
    return { status: 'continue' };
  }

  // Check delivery zone
  const deliveryZone = getDeliveryZone(input);

  if (RESTRICTED_ZONES.includes(deliveryZone)) {
    return {
      status: 'blocked',
      errors: [{
        code: 'TEMPERATURE_SENSITIVE_RESTRICTION',
        message: 'Temperature-sensitive items cannot be delivered to this location. Please remove these items or choose a different delivery address.'
      }]
    };
  }

  return { status: 'continue' };
}

function getDeliveryZone(input) {
  // Extract delivery zone from shipping address or other context
  const shippingAddress = input.cart.deliveryGroups[0]?.deliveryAddress;

  if (!shippingAddress) {
    return 'unknown';
  }

  // Simple zone determination based on state/province
  const state = shippingAddress.provinceCode?.toLowerCase();
  const country = shippingAddress.countryCode?.toLowerCase();

  if (country === 'us') {
    if (state === 'hi') return 'zone_hawaii';
    if (state === 'ak') return 'zone_alaska';
  }

  if (country === 'pr') return 'zone_puerto_rico';

  return 'standard';
}
