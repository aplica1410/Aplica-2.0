const API_BASE = import.meta.env.VITE_API_BASE_URL;

const authFetch = async (url, options = {}) => {
  const res = await fetch(`${API_BASE}${url}`, {
    credentials: "include", // 🔥 USE COOKIE AUTH
    ...options,
    headers: {
      ...(options.headers || {}),
      // ❌ NO Authorization header
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
};

export default authFetch;
