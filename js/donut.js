import game from "./game.js";
import { round, getCellColor } from "./utils.js";

const sdoBase = 25;
const svgViewbox = 31.831;
const cellStrokeWidth = svgViewbox * 0.02; // takes 2% of total svg size
const cellGutterRatio = 1.5; // gutter size equal to 150% of cell stroke width
const cellGutterCoeff = cellGutterRatio * 2;
const cellGutter = cellGutterCoeff * cellStrokeWidth;

const numberOfGutters = game.players.length;
const sumOfAllGutters = numberOfGutters * cellGutter;
const correctionCoeff = 100 / (100 + sumOfAllGutters);

if (sumOfAllGutters >= 100) {
  throw new Error("No room left for curves");
}

export const cellStrokes = game.players
  .map(({ odds }) => odds)
  .map((odd, index, array) => {
    if (array.length === 1) {
      return { sda: { curve: 100, space: 0 }, sdo: sdoBase };
    }

    const curveSize = odd * correctionCoeff;
    const spaceSize = 100 - curveSize;
    const sumOfOdds = array.slice(0, index).reduce((a, b) => a + b, 0);
    const totalSize = (sumOfOdds + index * cellGutter) * correctionCoeff;

    return {
      sda: {
        curve: round(curveSize, 15),
        space: round(spaceSize, 15),
      },
      sdo: sdoBase + round(100 - totalSize, 15),
    };
  });

/**
 * HTML stroke-dasharray values.
 * @typedef {Object} SvgStrokeDasharrayModel
 * @property {number} curve curve size.
 * @property {number} space space size.
 */

/**
 * Svg stroke attributes.
 * @typedef {Object} SvgStrokeModel
 * @property {SvgStrokeDasharrayModel} sda stroke-dasharray attribute.
 * @property {number} sdo stroke-dashoffter attribute.
 */

/**
 * Returns donut chart call as svg <circle/> tag.
 * @param {number} id ID.
 * @param {SvgStrokeModel} stroke stroke-dasharray and stroke-dashoffset properties.
 */
export function drawSvgCircle(id, { sda, sdo }) {
  const xmlns = "http://www.w3.org/2000/svg";
  const circle = document.createElementNS(xmlns, "circle");

  const attrs = { cx: "50%", cy: "50%", r: "15.9155" };
  for (const [key, value] of Object.entries(attrs)) {
    circle.setAttribute(key, value);
  }

  circle.classList.add("donut__cell");
  circle.style.stroke = getCellColor(id);
  circle.style.strokeDasharray = `${sda.curve} ${sda.space}`;
  circle.style.strokeDashoffset = `${sdo}`;

  return circle;
}
