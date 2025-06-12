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

export function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export function rectsIntersect(ax, ay, awidth, aheight, bx, by, bwidth, bheight) {
    return (
        ax < bx + bwidth &&
        ax + awidth > bx &&
        ay < by + bheight &&
        ay + aheight > by
    );
}

export function circlesIntersect(ax, ay, aradius, bx, by, bradius) {
    const dx = ax - bx;
    const dy = ay - by;
    const distance = Math.hypot(dx, dy);
    return distance < aradius + bradius;
}