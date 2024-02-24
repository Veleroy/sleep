type SleepyTimeUnit = "milliseconds" | "seconds" | "minutes" | "hours" | "days";

function SleepyTime(
  time: number,
  unit: SleepyTimeUnit = "milliseconds"
): Promise<void> {
  let milliseconds: number = time;

  switch (unit) {
    case "seconds":
      milliseconds *= 1000;
      break;
    case "minutes":
      milliseconds *= 1000 * 60;
      break;
    case "hours":
      milliseconds *= 1000 * 60 * 60;
      break;
    case "days":
      milliseconds *= 1000 * 60 * 60 * 24;
      break;
    default:
      break;
  }

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

export { SleepyTime, SleepyTimeUnit };
