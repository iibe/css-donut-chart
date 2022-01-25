import { round, range } from "./utils.js";

/**
 * Ticket imitation model.
 * @typedef {Object} TicketModel
 * @property {number} l left ticket border.
 * @property {number} r right ticket border.
 */

/**
 * Player imitation model.
 * @typedef {Object} PlayerModel
 * @property {number} id identifier.
 * @property {number} bet bet size.
 * @property {TicketModel} seat ticket range.
 * @property {number} odds chance to win a game.
 */

/**
 * Game imitation model.
 * @typedef {Object} GameModel
 * @property {number} bank total bank.
 * @property {PlayerModel[]} players players info.
 */

/**
 * Returns game imitation object.
 * @return {GameModel} game imitation model.
 */
function generator() {
  // generate random number of players
  const [min, max] = [10, 16];
  const players = range(min, max);

  // generate game metadata
  const bets = Array.from({ length: players }, () => range(1e3, 5e3));
  const bank = bets.reduce((a, b) => a + b, 0);
  const odds = bets.map((bet) => {
    const percentage = (bet / bank) * 100;
    return round(percentage, 2);
  });

  const tickets = bets.map((bet, index, array) => {
    const l = index && array.slice(0, index).reduce((a, b) => a + b, 0);
    const r = l + bet - 1;
    return { l, r };
  });

  const checksum = round(odds.reduce((a, b) => a + b, 0));
  if (checksum !== 100) {
    throw new Error("Unfair game. Sum of all odds must be 100%.");
  }

  return {
    bank,
    players: bets.map((bet, index) => ({
      id: index,
      bet: bet,
      seat: tickets[index],
      odds: odds[index],
    })),
  };
}

const game = generator();

export default game;
