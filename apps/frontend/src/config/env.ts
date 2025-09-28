// Environment configuration
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Helper function for API calls
export const getApiUrl = (endpoint: string): string => {
  // Always use full URLs (no proxy)
  const baseUrl = config.apiUrl;
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return `${baseUrl}${normalizedEndpoint}`;
};
