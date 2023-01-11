import { timeLeftUnopened } from './timeLeftUnOpened';

describe('timeLeftUnOpened checks time until a deadline is reached', ()=>{
  test('works with 1 month', () => {
  expect(timeLeftUnopened('2023-01-15')).toBe(1);
});
test('works with 2 months', () => {
  expect(timeLeftUnopened('2023-05-15')).toBe(5);
});
})
