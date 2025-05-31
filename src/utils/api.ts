/**
 * API configuration and endpoints
 */

// Base API URL - uses environment variable if available, otherwise defaults
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-omsehat.sportsnow.app';

// API Endpoints
export const API_ENDPOINTS = {
  // Session endpoints
  SESSION: {
    GET: (sessionId: string) => `${API_BASE_URL}/session/${sessionId}`,
    CREATE: `${API_BASE_URL}/session`,
    UPDATE: (sessionId: string) => `${API_BASE_URL}/session/${sessionId}`,
  },
  
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/profile`,
    VERIFY_OTP: `${API_BASE_URL}/verify-otp`,
    REGISTER: `${API_BASE_URL}/register`,
  },
  
  // Health data endpoints
  HEALTH: {
    RECORDS: `${API_BASE_URL}/health/records`,
    VITALS: `${API_BASE_URL}/health/vitals`,
  },
  
  // Education endpoints
  EDUCATION: {
    COURSES: `${API_BASE_URL}/education/courses`,
    COURSE_DETAILS: (courseId: string) => `${API_BASE_URL}/education/courses/${courseId}`,
    LEADERBOARD: `${API_BASE_URL}/education/leaderboard`,
  },
};

/**
 * Get authentication headers for API requests
 * @param token Optional authentication token
 * @returns Headers object with auth token if provided
 */
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};
