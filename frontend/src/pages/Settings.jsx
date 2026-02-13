import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // adjust if path different
import "../styles/settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      await axios.delete("/api/user/delete-account");

      // Optional: clear token if stored in localStorage
      localStorage.removeItem("token");

      alert("Your account has been deleted.");

      navigate("/"); // redirect to landing page
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <button
          className="delete-btn"
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </button>
      </div>

      {/* 🔥 Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Account</h3>
            <p>
              This action is permanent. All your data will be removed.
            </p>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              I understand that this action cannot be undone.
            </label>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setConfirmed(false);
                }}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                disabled={!confirmed || loading}
                onClick={handleDeleteAccount}
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
