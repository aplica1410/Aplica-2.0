const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const googleLogin = async (credential) => {
  const res = await fetch(`${BACKEND_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Google login error:", data);
    throw new Error(data.message || "Google login failed");
  }

  return data;
};
