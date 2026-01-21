const API_BASE = import.meta.env.VITE_API_BASE_URL;

const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("aplica_token");

  // Base headers (ALWAYS include Authorization)
  const headers = {
    Authorization: `Bearer ${token}`
  };

  // ✅ Only set JSON content-type when body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
};

export default authFetch;
