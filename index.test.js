const { EARTH_RADIUS } = require("./constants");
const partners = require("./partners.json");

const {
  degreesToRadians,
  calculateDistance,
  haversineFormula,
  guestsToInvite,
} = require("./index");

test("degreesToRadians: 100 degrees to be 1.7453292519943295", () => {
  expect(degreesToRadians(100)).toBe(1.7453292519943295);
});

test("degreesToRadians: invalid input", () => {
  expect(degreesToRadians).toThrowError("degrees value expected");
});

test("calculateDistance: input 1 & EARTH_RADIUS ", () => {
  expect(calculateDistance(1, EARTH_RADIUS)).toBe(20037);
});

test("calculateDistance: invalid input ", () => {
  expect(calculateDistance).toThrowError("input must be valid number");
});

test("haversineFormula: input latitude:42.6661427 longitude:23.293435", () => {
  expect(haversineFormula(42.6661417, 23.293435)).not.toBeNaN();
  expect(haversineFormula(42.6661417, 23.293435)).toBe(5);
});

test("haversineFormula: input latitude:42.6661427  without longitude value", () => {
  expect(haversineFormula).toThrowError(
    "expecting latitude and longitude properties"
  );
});

test("guestsToInvite: input partners.json", () => {
  expect(guestsToInvite(partners)).toHaveLength(23);
});

test("guestsToInvite: throw Error", () => {
  expect(guestsToInvite).toThrowError("partners must be array of objects");
});
