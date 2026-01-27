const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/* ---------- Authenticated Fetch (COOKIE-BASED) ---------- */
export const authFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include", // 🔥 send httpOnly cookie
    ...options,
    headers: {
      ...(options.headers || {}),
      // ❌ NO Authorization header
      // ❌ NO localStorage token
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
};
