import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/personal-information.css";

const PersonalInformation = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!user) return <p className="loading-text">No data found</p>;

  const { publicProfile, professionalInfo, portfolio, attachment } = user;

  return (
    <div className="personal-info-wrapper">
      <div className="personal-info-card">
        {/* Avatar */}
        <div className="avatar-section">
          <div className="avatar-circle">
            <span>📷</span>
          </div>
          <div className="avatar-actions">
            <button className="btn-primary">Change Picture</button>
            <button className="btn-secondary">Delete Picture</button>
          </div>
        </div>

        {/* Public Info */}
        <div className="form-section">
          <div className="form-row">
            <input value={publicProfile?.firstName || ""} disabled />
            <input value={publicProfile?.lastName || ""} disabled />
          </div>
          <input value={publicProfile?.location || ""} disabled />
        </div>

        {/* Professional */}
        <div className="form-section">
          <input value={professionalInfo?.role || ""} disabled />
          <div className="form-row">
            <input
              value={professionalInfo?.experience?.years || 0}
              disabled
            />
            <input
              value={professionalInfo?.experience?.months || 0}
              disabled
            />
          </div>
          <input value={professionalInfo?.headline || ""} disabled />
        </div>

        {/* Portfolio */}
        <div className="form-section">
          <input value={portfolio?.portfolio || ""} disabled />
          <div className="social-grid">
            <input value={portfolio?.github || ""} disabled />
            <input value={portfolio?.linkedin || ""} disabled />
            <input value={portfolio?.dribbble || ""} disabled />
            <input value={portfolio?.behance || ""} disabled />
            <input value={portfolio?.instagram || ""} disabled />
            <input value={portfolio?.twitter || ""} disabled />
          </div>
        </div>

        {/* Attachment */}
        <div className="form-section">
          <div className="attachment-box">
            {attachment?.originalName
              ? attachment.originalName
              : "No attachment uploaded"}
          </div>
          <textarea placeholder="Optional note..." disabled />
        </div>

        {/* Actions */}
        <div className="action-row">
          <button className="btn-primary">Save Changes</button>
          <button className="btn-secondary">Discard</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
