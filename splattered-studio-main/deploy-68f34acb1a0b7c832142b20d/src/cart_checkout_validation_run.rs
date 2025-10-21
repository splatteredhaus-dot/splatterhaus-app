use crate::schema;
use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function]
fn run(input: schema::run::Input) -> Result<schema::FunctionRunResult> {
    // Define the tags and restricted zones
    const TEMPERATURE_SENSITIVE_TAGS: [&str; 4] = ["chocolate", "frozen", "refrigerated", "heat-sensitive"];
    const RESTRICTED_ZONES: [&str; 3] = ["zone_hawaii", "zone_alaska", "zone_puerto_rico"];

    // Check if any cart line has a temperature sensitive tag
    let has_temp_sensitive = input.cart().lines().iter().any(|line| {
        match &line.merchandise() {
            schema::run::input::cart::lines::Merchandise::ProductVariant(variant) => {
                // Check tags using has_any_tag for each sensitive tag
                TEMPERATURE_SENSITIVE_TAGS.iter().any(|tag| {
                    // For each tag, call has_any_tag(tags: [tag])
                    // In the input query, you must fetch hasTags for all tags
                    variant.product().has_tags().iter().any(|tag_info| {
                        tag_info.has_tag() && TEMPERATURE_SENSITIVE_TAGS.contains(&tag_info.tag().to_lowercase().as_str())
                    })
                })
            }
            _ => false,
        }
    });

    if !has_temp_sensitive {
        return Ok(schema::FunctionRunResult { errors: vec![] });
    }

    // Get delivery address (first delivery group)
    let delivery_zone = input.cart().delivery_groups().get(0)
        .and_then(|group| group.delivery_address())
        .map(|addr| {
            let country = addr.country_code().map(|c| c.to_lowercase());
            let province = addr.province_code().map(|p| p.to_lowercase());

            match (country.as_deref(), province.as_deref()) {
                (Some("us"), Some("hi")) => "zone_hawaii",
                (Some("us"), Some("ak")) => "zone_alaska",
                (Some("pr"), _) => "zone_puerto_rico",
                _ => "standard"
            }
        })
        .unwrap_or("unknown");

    if RESTRICTED_ZONES.contains(&delivery_zone) {
        return Ok(schema::FunctionRunResult {
            errors: vec![schema::FunctionError {
                localized_message: Some("Temperature-sensitive items cannot be delivered to this location. Please remove these items or choose a different delivery address.".to_string()),
                target: Some("cart".to_string()),
                ..Default::default()
            }]
        });
    }

    Ok(schema::FunctionRunResult { errors: vec![] })
}
