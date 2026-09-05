// export const API_BASE_URL = "http://127.0.0.1:8000/api";
// //export const API_BASE_URL = "https://api.uniteoman.com/api";

// export const API_ENDPOINTS = {
//   ADMIN_LOGIN: `${API_BASE_URL}/auth/login/admin/`,
//   LOCATIONS: `${API_BASE_URL}/locations/`,
//   SERVICES: `${API_BASE_URL}/services/`,
//   AREAS: (locationId) => `${API_BASE_URL}/professionals/areas/?location_id=${locationId}`,
//   ADMIN_BOOKINGS: `${API_BASE_URL}/professionals/admin/bookings/`,
//   ADMIN_ASSIGN_DISPATCH: `${API_BASE_URL}/professionals/admin/bookings/assign/`,
//   BOOKING_DETAIL: (bookingId) => `${API_BASE_URL}/professionals/bookings/${bookingId}/`,
//   AVAILABLE_PROFESSIONALS: (bookingId) => `${API_BASE_URL}/professionals/bookings/${bookingId}/available-professionals/`,

//   // Analytics Endpoints
//   ADMIN_ANALYTICS: (month = "2026-07", ai = "on") =>
//     `${API_BASE_URL}/professionals/admin/?month=${month}&ai=${ai}`,
//   ADMIN_KPIS: (month = "2026-07") =>
//     `${API_BASE_URL}/professionals/admin/kpis/?month=${month}`,
//   ADMIN_SEND_RETENTION: (professionalId) =>
//     `${API_BASE_URL}/professionals/admin/churn/${professionalId}/retention/`,
//   ADMIN_PAYMENTS_SUMMARY: (month = "2026-07") =>
//     `${API_BASE_URL}/professionals/admin/payments/summary/?month=${month}`,
//   ADMIN_PAYMENTS_CUSTOMER: (month = "2026-07", page = 1) =>
//     `${API_BASE_URL}/professionals/admin/payments/customer/?month=${month}&page=${page}&page_size=10`,
//   ADMIN_PAYMENTS_VENDOR_PAYOUTS: (month = "2026-07", page = 1) =>
//     `${API_BASE_URL}/professionals/admin/payments/vendor-payouts/?month=${month}&page=${page}`,
//   ADMIN_PAYMENTS_PLATFORM_REVENUE: (month = "2026-07") =>
//     `${API_BASE_URL}/professionals/admin/payments/platform-revenue/?month=${month}`,
//   ADMIN_PAYMENTS_REFUNDS: (month = "2026-07", page = 1) =>
//     `${API_BASE_URL}/professionals/admin/payments/refunds/?month=${month}&page=${page}`,
//   ADMIN_VERIFY_BANK_ACCOUNT: (accountId) =>
//     `${API_BASE_URL}/professionals/admin/bank-account/${accountId}/verify/`,
//   ADMIN_PAYMENTS_EXPORT: (month = "2026-07", type = "customer", status = "") =>
//     `${API_BASE_URL}/professionals/admin/payments/export/?month=${month}&type=${type}${status ? `&status=${status}` : ""}`,
// };

// export async function apiGet(endpoint) {
//   const token = localStorage.getItem("admin_access_token");
//   const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (res.status === 401) {
//     localStorage.removeItem("admin_access_token");
//     localStorage.removeItem("admin_refresh_token");
//     window.location.href = "/login";
//     return;
//   }

//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     throw new Error(data.detail || data.message || `Request failed (${res.status})`);
//   }

//   return res.json();
// }

// export async function apiPost(endpoint, body = {}) {
//   const token = localStorage.getItem("admin_access_token");
//   const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

//   if (res.status === 401) {
//     localStorage.removeItem("admin_access_token");
//     localStorage.removeItem("admin_refresh_token");
//     window.location.href = "/login";
//     return;
//   }

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.detail || data.message || `Request failed (${res.status})`);
//   }

//   return data;
// }

// export async function apiDownload(endpoint, filename = "export.csv") {
//   const token = localStorage.getItem("admin_access_token");
//   const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (res.status === 401) {
//     localStorage.removeItem("admin_access_token");
//     localStorage.removeItem("admin_refresh_token");
//     window.location.href = "/login";
//     return;
//   }

//   if (!res.ok) {
//     throw new Error(`Export failed (${res.status})`);
//   }

//   const blob = await res.blob();
//   const downloadUrl = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = downloadUrl;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
//   window.URL.revokeObjectURL(downloadUrl);
// }

// export default API_BASE_URL;



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

// JWT decode — token expire time எடுக்க
function getTokenExpiry(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // milliseconds
  } catch {
    return null;
  }
}

// Token expire ஆகிவிட்டதா check பண்ணு
function isTokenExpired(token) {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return Date.now() >= expiry - 60000; // 1 minute before expiry
}

function logout() {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("admin_email");
  localStorage.removeItem("admin_password");
  window.location.href = "/login";
}

// Auto re-login using saved credentials
async function reLogin() {
  const email = localStorage.getItem("admin_email");
  const password = localStorage.getItem("admin_password");
  if (!email || !password) { logout(); return null; }

  try {
    const res = await fetch(API_ENDPOINTS.ADMIN_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) { logout(); return null; }
    const data = await res.json();
    if (data.access) {
      localStorage.setItem("admin_access_token", data.access);
      if (data.refresh) localStorage.setItem("admin_refresh_token", data.refresh);
      return data.access;
    }
    logout(); return null;
  } catch {
    logout(); return null;
  }
}

async function getValidToken() {
  let token = localStorage.getItem("admin_access_token");
  if (!token || isTokenExpired(token)) {
    token = await reLogin();
  }
  return token;
}

export async function apiGet(endpoint) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const token = await getValidToken();
  if (!token) return;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

  if (res.status === 401) { logout(); return; }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.message || `Request failed (${res.status})`);
  }

  return res.json();
}

export async function apiPost(endpoint, body) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const token = await getValidToken();
  if (!token) return;

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 401) { logout(); return; }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || data.message || `Request failed (${res.status})`);
  }
  return data;
}

export default API_BASE_URL;