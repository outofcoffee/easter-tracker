/**
 * Logger utility that wraps console methods and conditionally outputs debug logs
 * based on the VITE_DEBUG environment variable.
 */

// There are multiple ways to check for debug mode
const checkDebugMode = (): boolean => {
  // Check environment variable first
  if (import.meta.env.VITE_DEBUG === 'true') {
    return true;
  }
  
  // Also check for DEV mode as a fallback
  if (import.meta.env.DEV === true) {
    return true;
  }
  
  // Check for URL parameter (useful for testing in production)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') === 'true') {
      return true;
    }
  }
  
  return false;
};

// Initialize debug mode
const isDebugMode = checkDebugMode();

/**
 * Type definition for message parameter accepted by logger methods
 * Allows string, number, boolean, object, or Error
 */
type LogMessage = string | number | boolean | object | Error | null | undefined;

interface LoggerInterface {
  debug: (message?: LogMessage, ...optionalParams: unknown[]) => void;
  info: (message?: LogMessage, ...optionalParams: unknown[]) => void;
  warn: (message?: LogMessage, ...optionalParams: unknown[]) => void;
  error: (message?: LogMessage, ...optionalParams: unknown[]) => void;
}

/**
 * Logger with conditional debug output based on VITE_DEBUG environment variable
 */
const logger: LoggerInterface = {
  /**
   * Only logs in debug mode when VITE_DEBUG=true
   */
  debug: (message?: LogMessage, ...optionalParams: unknown[]): void => {
    if (isDebugMode) {
      console.debug(`[DEBUG] ${message}`, ...optionalParams);
    }
  },

  /**
   * Informational messages, always shown
   */
  info: (message?: LogMessage, ...optionalParams: unknown[]): void => {
    console.info(`[INFO] ${message}`, ...optionalParams);
  },

  /**
   * Warning messages, always shown
   */
  warn: (message?: LogMessage, ...optionalParams: unknown[]): void => {
    console.warn(`[WARN] ${message}`, ...optionalParams);
  },

  /**
   * Error messages, always shown
   */
  error: (message?: LogMessage, ...optionalParams: unknown[]): void => {
    console.error(`[ERROR] ${message}`, ...optionalParams);
  }
};

export default logger;