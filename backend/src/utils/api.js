export const authFetch = (url, data) => {
  const token = localStorage.getItem("aplica_token");

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
