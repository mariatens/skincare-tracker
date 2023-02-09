import { calculateTimeLeftOpenedProducts } from './timeLeftOpened';

describe('calculateTimeLeftOpenedProducts checks time until x number of months pass', () => {
  test('works with 1', () => {
    expect(calculateTimeLeftOpenedProducts('2022-12-15', '1')).toBe(1);
  });
  test('works with 3', () => {
    expect(calculateTimeLeftOpenedProducts('2022-12-15', '3')).toBe(3);
  });
});
