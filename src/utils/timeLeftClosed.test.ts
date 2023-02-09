import { calculateTimeLeftClosedProducts } from './timeLeftClosed';

describe('calculateTimeLeftClosedProducts checks time until a deadline is reached', () => {
  test('works with 1 month', () => {
    expect(calculateTimeLeftClosedProducts('2023-01-15')).toBe(1);
  });
  test('works with 2 months', () => {
    expect(calculateTimeLeftClosedProducts('2023-05-15')).toBe(5);
  });
});
