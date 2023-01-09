/**
 * get environment variable value by key
 * if default value is provided, return default value if environment variable is not set.
 * @param key environment variable key
 * @param defaultValue default value if environment variable is not set
 * @returns environment variable value or default value
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Missing environment variable: ${key}`);
}
