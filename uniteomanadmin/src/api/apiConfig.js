//export const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_BASE_URL = "https://api.uniteoman.com/api";

export const API_ENDPOINTS = {
  ADMIN_LOGIN: `${API_BASE_URL}/auth/login/admin/`,
  LOCATIONS: `${API_BASE_URL}/locations/`,
  SERVICES: `${API_BASE_URL}/services/`,
  AREAS: (locationId) => `${API_BASE_URL}/professionals/areas/?location_id=${locationId}`,
  ADMIN_BOOKINGS: `${API_BASE_URL}/professionals/admin/bookings/`,
  ADMIN_ASSIGN_DISPATCH: `${API_BASE_URL}/professionals/admin/bookings/assign/`,
  BOOKING_DETAIL: (bookingId) => `${API_BASE_URL}/professionals/bookings/${bookingId}/`,
  AVAILABLE_PROFESSIONALS: (bookingId) => `${API_BASE_URL}/professionals/bookings/${bookingId}/available-professionals/`,
};

export async function apiGet(endpoint) {
  const token = localStorage.getItem("admin_access_token");
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.message || `Request failed (${res.status})`);
  }

  return res.json();
}

export async function apiPost(endpoint, body) {
  const token = localStorage.getItem("admin_access_token");
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    window.location.href = "/login";
    return;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.detail || data.message || `Request failed (${res.status})`);
  }

  return data;
}

export default API_BASE_URL;