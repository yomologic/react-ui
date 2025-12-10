/**
 * Validation constants and regex patterns
 */

/**
 * Email validation regex
 * Matches standard email formats like: user@example.com
 * Requires @ symbol, domain name, and TLD (like .com, .org, etc.)
 */
export const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

/**
 * URL validation regex
 * Matches http(s) URLs
 */
export const URL_REGEX =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Phone number validation regex (US format)
 * Matches formats like: (123) 456-7890, 123-456-7890, 1234567890
 */
export const PHONE_REGEX =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
    return URL_REGEX.test(url);
};

/**
 * Date validation regex (MM/DD/YYYY)
 * Matches formats like: 12/31/2024, 01/01/2024
 */
export const DATE_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
    return PHONE_REGEX.test(phone);
};

/**
 * Validate date format and value
 * Checks if date is in MM/DD/YYYY format and is a valid calendar date
 */
export const isValidDate = (date: string): boolean => {
    // First check format
    if (!DATE_REGEX.test(date)) {
        return false;
    }

    // Parse and validate actual date
    const [month, day, year] = date.split("/").map(Number);

    // Check year is reasonable (1900-2100)
    if (year < 1900 || year > 2100) {
        return false;
    }

    // Check month
    if (month < 1 || month > 12) {
        return false;
    }

    // Check day based on month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Leap year check
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (isLeapYear && month === 2) {
        daysInMonth[1] = 29;
    }

    if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }

    return true;
};
