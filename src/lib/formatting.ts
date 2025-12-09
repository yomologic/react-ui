/**
 * Input formatting utilities
 */

export type FormatType =
    | "phone"
    | "phone-intl"
    | "credit-card"
    | "date"
    | "datetime";

/**
 * Format US phone number: (123) 456-7890
 */
export const formatPhoneUS = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Limit to 10 digits
    const limited = digits.slice(0, 10);

    // Format based on length
    if (limited.length === 0) return "";
    if (limited.length <= 3) return `(${limited}`;
    if (limited.length <= 6)
        return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
};

/**
 * Format international phone number: +1 (123) 456-7890
 */
export const formatPhoneIntl = (value: string): string => {
    // Remove all non-digit and non-plus characters
    let cleaned = value.replace(/[^\d+]/g, "");

    // Ensure it starts with +
    if (!cleaned.startsWith("+")) {
        cleaned = "+" + cleaned;
    }

    // Limit to reasonable length (country code + number)
    cleaned = cleaned.slice(0, 16);

    const digits = cleaned.slice(1); // Remove + for processing

    if (digits.length === 0) return "+";
    if (digits.length <= 1) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 1)} (${digits.slice(1)}`;
    if (digits.length <= 7)
        return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
};

/**
 * Format credit card number: 1234 5678 9012 3456
 */
export const formatCreditCard = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    const limited = digits.slice(0, 16);

    // Add space every 4 digits
    return limited.replace(/(\d{4})/g, "$1 ").trim();
};

/**
 * Format date: MM/DD/YYYY
 */
export const formatDate = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    const limited = digits.slice(0, 8);

    if (limited.length === 0) return "";
    if (limited.length <= 2) return limited;
    if (limited.length <= 4)
        return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
};

/**
 * Format datetime: MM/DD/YYYY HH:MM AM/PM
 */
export const formatDateTime = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    const limited = digits.slice(0, 12); // MMDDYYYYHHMM

    if (limited.length === 0) return "";
    if (limited.length <= 2) return limited;
    if (limited.length <= 4)
        return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    if (limited.length <= 8)
        return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;

    // Add time
    const datePart = `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4, 8)}`;
    if (limited.length <= 10) return `${datePart} ${limited.slice(8)}`;

    // Format time with AM/PM
    let hours = parseInt(limited.slice(8, 10));
    const minutes = limited.slice(10, 12);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${datePart} ${hours}:${minutes} ${ampm}`;
};

/**
 * Get raw value from formatted string
 * - For phone/credit-card: returns digits only
 * - For date: returns YYYY-MM-DD format (ISO 8601)
 * - For datetime: returns ISO 8601 with timezone offset
 */
export const getRawValue = (value: string, format?: FormatType): string => {
    // For date format, convert to ISO 8601 (YYYY-MM-DD)
    if (format === "date") {
        const digits = value.replace(/\D/g, "");
        if (digits.length === 8) {
            // Convert MMDDYYYY to YYYY-MM-DD
            const month = digits.slice(0, 2);
            const day = digits.slice(2, 4);
            const year = digits.slice(4, 8);
            return `${year}-${month}-${day}`;
        }
        return digits; // Return partial input as-is
    }

    // For datetime format, convert to ISO 8601 with timezone offset
    if (format === "datetime") {
        const digits = value.replace(/\D/g, "");
        if (digits.length === 12) {
            // Convert MMDDYYYYHHMM to ISO 8601
            const month = digits.slice(0, 2);
            const day = digits.slice(2, 4);
            const year = digits.slice(4, 8);
            const hours = digits.slice(8, 10);
            const minutes = digits.slice(10, 12);

            // Create date in local timezone
            const date = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day),
                parseInt(hours),
                parseInt(minutes)
            );

            // Return ISO 8601 with timezone offset
            return date.toISOString();
        }
        return digits; // Return partial input as-is
    }

    // For other formats, return digits only
    return value.replace(/\D/g, "");
};

/**
 * Apply format based on format type
 */
export const applyFormat = (value: string, format: FormatType): string => {
    switch (format) {
        case "phone":
            return formatPhoneUS(value);
        case "phone-intl":
            return formatPhoneIntl(value);
        case "credit-card":
            return formatCreditCard(value);
        case "date":
            return formatDate(value);
        case "datetime":
            return formatDateTime(value);
        default:
            return value;
    }
};
