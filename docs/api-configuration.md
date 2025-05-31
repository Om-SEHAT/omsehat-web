# API Configuration Guide

This document outlines how to use the API configuration in the Om SEHAT web application.

## Overview

All API endpoints are centralized in the `/src/utils/api.ts` file. This approach provides:

1. Consistency in API calls
2. Easy maintenance when endpoints change
3. Type safety for TypeScript
4. Reusable authentication headers

## Base URL

The base URL for all API calls is configured as a constant:

```typescript
export const API_BASE_URL = 'https://api-omsehat.sportsnow.app';
```

## Endpoints Structure

Endpoints are organized by feature area:

```typescript
export const API_ENDPOINTS = {
  // Session endpoints
  SESSION: {
    GET: (sessionId: string) => `${API_BASE_URL}/session/${sessionId}`,
    CREATE: `${API_BASE_URL}/session`,
    UPDATE: (sessionId: string) => `${API_BASE_URL}/session/${sessionId}`,
  },
  
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    LOGIN: `${API_BASE_URL}/user/login`,
    REGISTER: `${API_BASE_URL}/user/register`,
  },
  
  // Other endpoint groups...
};
```

## Usage Examples

### Making GET Requests

```typescript
import { API_ENDPOINTS, getAuthHeaders } from '../utils/api';

// Getting user profile
const fetchUserProfile = async () => {
  const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
    method: 'GET',
    headers: getAuthHeaders(userToken),
  });
  
  return await response.json();
};
```

### Making POST Requests

```typescript
import { API_ENDPOINTS, getAuthHeaders } from '../utils/api';

// Registering a new user
const registerUser = async (userData) => {
  const response = await fetch(API_ENDPOINTS.USER.REGISTER, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  
  return await response.json();
};
```

### Using Dynamic Endpoints

```typescript
import { API_ENDPOINTS, getAuthHeaders } from '../utils/api';

// Sending a message in a chat session
const sendChatMessage = async (sessionId, message) => {
  const response = await fetch(API_ENDPOINTS.SESSION.UPDATE(sessionId), {
    method: 'POST',
    headers: getAuthHeaders(userToken),
    body: JSON.stringify({ new_message: message }),
  });
  
  return await response.json();
};
```

## Authentication Headers

The utility includes a helper function to generate consistent headers:

```typescript
const headers = getAuthHeaders(userToken);
```

This will return headers with:
- Content-Type: application/json
- Authorization: Bearer {token} (if token is provided)

## Modifying API Configuration

If you need to change the API base URL:

1. Update the `API_BASE_URL` constant in `/src/utils/api.ts`
2. All endpoint functions will automatically use the new base URL

## Environment-specific Configuration

For different environments (development, staging, production), you can use environment variables:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-omsehat.sportsnow.app';
```

Then in your `.env` files:
```
# .env.development
VITE_API_URL=https://dev-api-omsehat.sportsnow.app

# .env.production
VITE_API_URL=https://api-omsehat.sportsnow.app
```
