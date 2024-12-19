export interface EnvironmentConfig {
  apiUrl: string;
  debugMode: boolean;
  apiTimeout: number;
  enableMockData: boolean;
}

export function getEnvironmentConfig(): EnvironmentConfig {
  return {
    apiUrl: process.env.VITE_API_URL as string,
    debugMode: process.env.VITE_DEBUG_MODE === 'true',
    apiTimeout: parseInt(process.env.VITE_API_TIMEOUT as string, 10),
    enableMockData: process.env.VITE_ENABLE_MOCK_DATA === 'true'
  };
}

export function logEnvironmentInfo(): void {
  if (getEnvironmentConfig().debugMode) {
    console.log('Current Environment:', {
      mode: process.env.NODE_ENV,
      config: getEnvironmentConfig()
    });
  }
}