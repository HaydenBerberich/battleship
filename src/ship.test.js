import Ship from "./ship.js";

test("hit increases number of hits", () => {
  const ship = new Ship(3);

  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("hits sink ship", () => {
  const ship = new Ship(3);

  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
