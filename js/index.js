import { circleProperties, drawSvgCircleTag } from "./donut.js";
import game from "./game.js";

/* Render donut circles */
const donut = document.querySelector("#donut");

circleProperties.map((circlePropertie, index) => {
  donut.appendChild(drawSvgCircleTag(index, circlePropertie));
});

/* Render table data */
const tmpl = document.querySelector("#table-row");
const bank = document.querySelector("aside > h2");
const tbody = document.querySelector("#table tbody");

bank.textContent = `Total bank: ${game.bank}`;

if ("content" in document.createElement("template")) {
  game.players.forEach(({ id, bet, seat, odds }) => {
    const clone = tmpl.content.cloneNode(true);
    const tdata = clone.querySelectorAll("td");
    tdata[0].textContent = id;
    tdata[1].textContent = bet;
    tdata[2].textContent = `[${seat.l} - ${seat.r}]`;
    tdata[3].textContent = `${odds}%`;
    tbody.appendChild(clone);
  });
} else {
  // Alternative implementation for rendering
}
