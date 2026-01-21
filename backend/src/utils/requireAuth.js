export const isAuthenticated = () => {
  return !!localStorage.getItem("aplica_token")
}
