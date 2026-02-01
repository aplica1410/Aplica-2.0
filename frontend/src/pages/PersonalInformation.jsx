import { useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";
import "../styles/personal-information.css";

const PersonalInformation = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/profile-setup/me`,
          { withCredentials: true }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!profile) return <p className="loading-text">No profile found</p>;

  return (
    <div className="personal-info-page">
      <h1 className="page-title">Personal Information</h1>

      {/* Profile Picture */}
      <div className="avatar-section">
        <div className="avatar-circle">
          <span className="avatar-icon">📷</span>
        </div>

        <div className="avatar-actions">
          <button className="btn-primary">Change Picture</button>
          <button className="btn-secondary">Delete Picture</button>
        </div>
      </div>

      {/* Public Profile */}
      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input value={profile.publicProfile?.firstName || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input value={profile.publicProfile?.lastName || ""} readOnly />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input value={profile.publicProfile?.location || ""} readOnly />
        </div>

        <div className="form-group">
          <label>Your Role</label>
          <input value={profile.professionalInfo?.role || ""} readOnly />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              value={profile.professionalInfo?.experience?.years || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Experience (Months)</label>
            <input
              value={profile.professionalInfo?.experience?.months || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-group">
          <label>One-line About You</label>
          <input
            value={profile.professionalInfo?.headline || ""}
            readOnly
          />
        </div>

        {/* Portfolio */}
        <div className="form-group">
          <label>Portfolio / Website</label>
          <input value={profile.portfolio?.portfolio || ""} readOnly />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn</label>
            <input value={profile.portfolio?.linkedin || ""} readOnly />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input value={profile.portfolio?.github || ""} readOnly />
          </div>
        </div>

        {/* Attachment */}
        <div className="form-group">
          <label>Attachment</label>
          {profile.attachment?.originalName ? (
            <div className="attachment-box">
              {profile.attachment.originalName}
            </div>
          ) : (
            <div className="attachment-box empty">
              No attachment uploaded
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="action-buttons">
          <button className="btn-primary">Save Changes</button>
          <button className="btn-secondary">Discard</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
