export class Logger {
  private static isDebugMode = process.env.VITE_DEBUG_MODE === 'true';

  static log(message: string, ...args: unknown[]): void {
      if (this.isDebugMode) {
          console.log(`[LOG] ${message}`, ...args);
      }
  }

  static error(message: string, error?: unknown): void {
      if (this.isDebugMode) {
          console.error(`[ERROR] ${message}`, error);
      }
  }

  static warn(message: string, ...args: unknown[]): void {
      if (this.isDebugMode) {
          console.warn(`[WARN] ${message}`, ...args);
      }
  }
}