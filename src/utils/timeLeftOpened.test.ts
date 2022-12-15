import {timeLeftOpened} from "./timeLeftOpened";

test("timeLeft checks time until x number of months pass", () => {
  expect(timeLeftOpened("2022-12-15", "1")).toBe(1);
});
test("timeLeft checks time until x number of months pass", () => {
    expect(timeLeftOpened("2022-12-15", "3")).toBe(3);
  });