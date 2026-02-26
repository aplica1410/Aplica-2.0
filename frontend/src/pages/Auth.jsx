import "./auth.css";
import logo from "../assets/logo.svg"; // adjust path if needed
import googleIcon from "../assets/google.svg"; // if you have google icon file

const Auth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        
        {/* Logo */}
        <img
          src={logo}
          alt="Aplica Logo"
          style={{ width: "50px", marginBottom: "20px" }}
        />

        <h2>Sign In To Your Account</h2>
        <p style={{ color: "#8a96a6", fontSize: "14px", marginBottom: "24px" }}>
          Sign in via your google Account.
        </p>

        <button className="google-btn" onClick={handleGoogleLogin}>
          {googleIcon ? (
            <img src={googleIcon} alt="Google" />
          ) : (
            <span style={{ fontWeight: "bold" }}>G</span>
          )}
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;