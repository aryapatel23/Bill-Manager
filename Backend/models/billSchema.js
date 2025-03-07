module.exports.validateBill = (billData) => {
    const { customerName, items, totalAmount, date, address } = billData;

    if (!customerName || typeof customerName !== 'string') {
        return { valid: false, error: "Invalid or missing customerName" };
    }
    if (!Array.isArray(items) || items.length === 0) {
        return { valid: false, error: "Items must be a non-empty array" };
    }
    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
        return { valid: false, error: "Total amount must be a positive number" };
    }
    if (!date || isNaN(new Date(date).getTime())) {
        return { valid: false, error: "Invalid date format" };
    }

    // Validate address (without area)
    if (!address || typeof address !== 'object') {
        return { valid: false, error: "Address is required and must be an object" };
    }
    const { houseNo, street, city, taluka, district, state } = address;

    if (!houseNo || typeof houseNo !== 'string') {
        return { valid: false, error: "Invalid or missing house number" };
    }
    if (!street || typeof street !== 'string') {
        return { valid: false, error: "Invalid or missing street name" };
    }
    if (!city || typeof city !== 'string') {
        return { valid: false, error: "Invalid or missing city" };
    }
    if (!taluka || typeof taluka !== 'string') {
        return { valid: false, error: "Invalid or missing taluka" };
    }
    if (!district || typeof district !== 'string') {
        return { valid: false, error: "Invalid or missing district" };
    }
    if (!state || typeof state !== 'string') {
        return { valid: false, error: "Invalid or missing state" };
    }

    // Validate each item in the array
    for (const item of items) {
        if (!item.name || typeof item.name !== 'string') {
            return { valid: false, error: "Each item must have a valid name" };
        }
        if (typeof item.price !== 'number' || item.price <= 0) {
            return { valid: false, error: "Each item must have a valid price" };
        }
        if (typeof item.quantity !== 'number' || item.quantity <= 0) {
            return { valid: false, error: "Each item must have a valid quantity" };
        }
    }

    return { valid: true };
};
