/**
 * Returns random number in range of [min, max].
 * @param {number} min integer number.
 * @param {number} max integer number.
 */
export function range(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Returns a rounded number.
 * @param {number} float float number.
 * @param {number} precision numbers after comma.
 */
export function round(float, precision) {
  const power = Math.pow(10, precision || 0);
  return Math.round(float * power) / power;
}

const colors = [
  "#ffaf5f",
  "#4acfac",
  "#7e8ce0",
  "#b57ee0",
  "#ef4444",
  "#ffa48e",
  "#36c7d0",
  "#5c6ccf",
  "#a059d9",
  "#dc2626",
  "#bcc3cd",
  "#6596e2",
  "#4b68cc",
  "#8846ff",
  "#d22ce6",
  "#eb4b4b",
  "#caab05",
  "#886a08",
];

/**
 * Returns color in hex format from `colors` list.
 * @param {number} index color index.
 */
export function getCellColor(index) {
  const limit = colors.length - 1;
  return colors[index % limit];
}
