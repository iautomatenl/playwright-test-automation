import { test, expect, chromium } from '@playwright/test';
import Logger from '../utils/logger';

test('Ensure log message produced at the right times', async ({ }, testInfo) => {
  const logger = new Logger({ level: 'debug', prefix: 'TestSuite' });

  logger.debug('This is a debug message');
  logger.info('Test started');
  logger.warn('This might be a problem');
  logger.error('Test failed', new Error('Failure reason'));
});
