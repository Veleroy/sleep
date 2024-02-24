import { fc } from '@fast-check/jest';
import { SleepyTime, SleepyTimeUnit } from './../src/index';
describe('SleepyTime function', () => {
  it('should resolve after the specified time', () => {
    fc.assert(
      fc.asyncProperty(
        fc.integer({min: 1, max: 10000}),
        fc.constantFrom<'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days'>(
          'milliseconds',
          'seconds',
          'minutes',
          'hours',
          'days'
        ),
        async (time: number, unit: SleepyTimeUnit) => {
          const start = Date.now();
          await SleepyTime(time, unit);
          const end = Date.now();
          const elapsed = end - start;
          let expectedMilliseconds = time;
          switch (unit) {
            case 'seconds':
              expectedMilliseconds *= 1000;
              break;
            case 'minutes':
              expectedMilliseconds *= 1000 * 60;
              break;
            case 'hours':
              expectedMilliseconds *= 1000 * 60 * 60;
              break;
            case 'days':
              expectedMilliseconds *= 1000 * 60 * 60 * 24;
              break;
            default:
              break;
          }
          expect(Math.abs(elapsed - expectedMilliseconds)).toBeLessThanOrEqual(100);
        }
      )
    );
  });
});