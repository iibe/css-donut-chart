import { cellStrokes, drawSvgCircle } from "./donut.js";
import { getCellColor } from "./utils.js";
import game from "./game.js";

/* Render donut circles */
const donut = document.querySelector("#donut");

game.players.forEach((_, index) => {
  donut.appendChild(drawSvgCircle(index, cellStrokes[index]));
});

/* Render table data */
const tmpl = document.querySelector("#table-row");
const title = document.querySelector("aside > h2");
const table = document.querySelector("#table tbody");

title.textContent = `Bank: ${game.bank}`;

if ("content" in document.createElement("template")) {
  game.players.forEach(({ id, bet, seat: { l, r }, odds }) => {
    const clone = tmpl.content.cloneNode(true);
    const tdata = clone.querySelectorAll("td");
    tdata[0].textContent = id;
    tdata[1].textContent = bet;
    tdata[2].textContent = `${l} — ${r}`;
    tdata[3].textContent = `${odds}%`;
    tdata[4].style.background = getCellColor(id);
    table.appendChild(clone);
  });
} else {
  // TODO: Write an alternative implementation for rendering
  // NOTE: Read donut.js file, drawSvgCircle() method for more information.
}
