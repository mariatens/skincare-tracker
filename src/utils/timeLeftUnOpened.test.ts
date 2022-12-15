import {timeLeftUnOpened} from "./timeLeftUnOpened";

test("timeLeft checks time until a deadline is reached", () => {
  expect(timeLeftUnOpened("2022-12-15", "2023-01-15")).toBe(1);
});
test("timeLeft checks time until a deadline is reached", () => {
    expect(timeLeftUnOpened("2022-12-15", "2023-05-15")).toBe(5);
  });