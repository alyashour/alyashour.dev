/**
 * Converts fps to ms per frame
 * @param {number} fps 
 */
export function frameRateToMs(fps) {
    return 1000 / fps; // 1000ms / second * 1 / fps = ms / frame
}

/**
 * Rounds a number to n decimal places.
 * @param {number} num
 * @param {number} number integer of decimal places. 
 */
export function round(num, x) {
    x = Math.round(x)
    return Math.round((num + Number.EPSILON) * Math.pow(10, x)) / Math.pow(10, x);
}