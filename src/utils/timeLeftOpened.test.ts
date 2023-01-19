import { timeLeftOpened } from './timeLeftOpened';

describe('timeLeftOpened checks time until x number of months pass', () => {
  test('works with 1', () => {
    expect(timeLeftOpened('2022-12-15', '1')).toBe(1);
  });
  test('works with 3', () => {
    expect(timeLeftOpened('2022-12-15', '3')).toBe(3);
  });
});
