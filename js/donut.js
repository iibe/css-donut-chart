import { round } from "./utils.js";
import game from "./game.js";

const players = [...game.players].sort((a, b) => b.bet - a.bet);
const odds = players.map((p) => p.odds);

export const circleProperties = odds.map((odd, index, array) => {
  const svgViewboxSize = 31.830988618379067153776752674503;
  const cellStrokeWidth = svgViewboxSize * 0.02;
  const circleGutter = cellStrokeWidth * 2;
  const sdo = 25;

  return {
    sda: {
      line: round(odd - circleGutter, 15),
      gap: round(100 - odd + circleGutter, 15),
    },
    sdo: index
      ? round(100 - array.slice(0, index).reduce((a, b) => a + b) + sdo, 15)
      : sdo,
  };
});

/**
 *
 * @param {number} id ID.
 * @param {{sda: number, sdo: number}} sd stroke-dasharray and stroke-dashoffset properties.
 * @return {SVGCircleElement} svg <circle>...</circle> tag.
 */
export function drawSvgCircleTag(id, { sda, sdo }) {
  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "circle");

  const attrs = {
    class: [`donut__cell`, `donut__cell_color_${id}`].join(" "),
    cx: "50%",
    cy: "50%",
    r: "15.915494309189533576888376337251",
  };
  attrs["stroke-dasharray"] = `${sda.line} ${sda.gap}`;
  attrs["stroke-dashoffset"] = `${sdo}`;

  for (const [key, value] of Object.entries(attrs)) {
    svg.setAttribute(key, value);
  }

  return svg;
}
