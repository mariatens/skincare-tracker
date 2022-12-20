import {timeLeftUnopened} from "./timeLeftUnOpened";

test("timeLeft checks time until a deadline is reached", () => {
  expect(timeLeftUnopened("2023-01-15")).toBe(1);
});
test("timeLeft checks time until a deadline is reached", () => {
    expect(timeLeftUnopened("2023-05-15")).toBe(5);
  });