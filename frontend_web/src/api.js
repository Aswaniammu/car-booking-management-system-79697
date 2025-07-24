//
// Simple REST API wrapper for car booking management
//
const API_BASE = process.env.REACT_APP_BACKEND_API || "http://localhost:8000";

async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    credentials: "include",
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data?.detail || "API Error");
    error.status = res.status;
    throw error;
  }
  return data;
}

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** User login */
  return apiRequest("/auth/login", "POST", { email, password });
}

// PUBLIC_INTERFACE
export async function signup(email, password, name) {
  /** User signup */
  return apiRequest("/auth/signup", "POST", { email, password, name });
}

// PUBLIC_INTERFACE
export async function fetchCars(query = {}, token = null) {
  /** Fetch cars matching search/filter criteria */
  const params = new URLSearchParams(query).toString();
  return apiRequest(`/cars?${params}`, "GET", null, token);
}

// PUBLIC_INTERFACE
export async function fetchCar(carId, token = null) {
  /** Fetch single car by id */
  return apiRequest(`/cars/${carId}`, "GET", null, token);
}

// PUBLIC_INTERFACE
export async function createBooking(carId, from, to, token) {
  /** Book a car */
  return apiRequest(
    "/bookings",
    "POST",
    { car_id: carId, from_date: from, to_date: to },
    token
  );
}

// PUBLIC_INTERFACE
export async function fetchBookings(token) {
  /** Get user's bookings */
  return apiRequest("/bookings", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function cancelBooking(bookingId, token) {
  /** Cancel a booking */
  return apiRequest(`/bookings/${bookingId}/cancel`, "POST", {}, token);
}

