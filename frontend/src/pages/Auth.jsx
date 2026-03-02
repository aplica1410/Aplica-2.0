import "../styles/auth.css";
import logo from "../assets/logo.svg";

const Auth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <img
          src={logo}
          alt="Aplica Logo"
          className="auth-logo"
        />

        <h2>Sign In To Your Account</h2>

        <p className="auth-subtitle">
          Sign in via your Google account.
        </p>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>G</span>
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default Auth;