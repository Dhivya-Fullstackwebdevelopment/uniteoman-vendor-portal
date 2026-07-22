const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
  VENDOR_LOGIN: `${API_BASE_URL}/auth/login/vendor/`,
};

// Vendor login function with proper error handling
export const vendorLogin = async (email, password) => {
  try {
    const response = await fetch(API_ENDPOINTS.VENDOR_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle different error status codes
      if (response.status === 401) {
        throw new Error('Invalid email or password. Please try again.');
      } else if (response.status === 400) {
        throw new Error(data.message || 'Invalid request. Please check your input.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Please contact support.');
      } else if (response.status === 404) {
        throw new Error('Login endpoint not found. Please check your API URL.');
      } else {
        throw new Error(data.message || `Login failed with status ${response.status}`);
      }
    }

    // Store token if provided
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }

    return {
      status: "success",
      message: data.message || "Login successful",
      data: data
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export default API_BASE_URL;