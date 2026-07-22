const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
  ADMIN_LOGIN: `${API_BASE_URL}/auth/login/admin/`, // Fixed: Changed from VENDOR_LOGIN to ADMIN_LOGIN
  // Add other endpoints here
};

export default API_BASE_URL;