const BASE_URL = "http://localhost:5000";

/* ---------- Authenticated Fetch ---------- */
export const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("aplica_token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  return res.json();
};
