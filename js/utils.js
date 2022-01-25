/**
 * Returns random number in range of [min, max].
 * @param {number} min - integer number.
 * @param {number} max - integer number.
 */
export const range = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

/**
 * Returns a rounded number.
 * @param {number} float - float number.
 * @param {number} precision - numbers after comma.
 */
export const round = (float, precision) => {
  const power = Math.pow(10, precision || 0);
  return Math.round(float * power) / power;
};
