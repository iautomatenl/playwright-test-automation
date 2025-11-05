/**
 * Waits for a condition function to return true within a timeout period by retrying at intervals.
 * @param conditionFn - Async or sync function that returns a boolean indicating if the condition is met.
 * @param timeout - Maximum time to wait in milliseconds (default 5000ms).
 * @param interval - Time between retries in milliseconds (default 100ms).
 * @throws Error if timeout is exceeded before condition is met.
 */
async function waitForCondition(
  conditionFn: () => Promise<boolean> | boolean,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (true) {
    try {
      const result = await conditionFn();
      if (result) {
        return; // Condition met, exit function
      }
    } catch (err) {
      // Optionally handle or ignore errors from conditionFn to retry
    }

    if (Date.now() - startTime > timeout) {
      throw new Error('waitForCondition: Timeout exceeded');
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

export default waitForCondition;