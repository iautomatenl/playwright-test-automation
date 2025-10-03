type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  level?: LogLevel;       // Minimum level to log (default: 'info')
  prefix?: string;        // Optional prefix to prepend to every message
}

/**
 * Simple Logger class with log levels and timestamps.
 */
class Logger {
  private level: LogLevel;
  private prefix: string;

  private levelsPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(options?: LoggerOptions) {
    this.level = options?.level ?? 'info';
    this.prefix = options?.prefix ?? '';
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levelsPriority[level] >= this.levelsPriority[this.level];
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    const prefixPart = this.prefix ? `[${this.prefix}] ` : '';
    return `${timestamp} ${prefixPart}[${level.toUpperCase()}] ${message}`;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message), ...args);
    }
  }
}

export default Logger;