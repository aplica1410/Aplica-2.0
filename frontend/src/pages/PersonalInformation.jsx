import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/personal-information.css";

const PersonalInformation = () => {
  const [profile, setProfile] = useState(null);          // editable state
  const [originalProfile, setOriginalProfile] = useState(null); // snapshot for discard
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/profile-setup/me`,
          { withCredentials: true }
        );

        setProfile(res.data);
        setOriginalProfile(res.data); // store original copy
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ===============================
     HANDLE INPUT CHANGE
  ================================ */
  const handleChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedChange = (section, nested, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nested]: {
          ...prev[section][nested],
          [field]: value,
        },
      },
    }));
  };

  /* ===============================
     SAVE CHANGES
  ================================ */
  const handleSave = async () => {
    try {
      setSaving(true);

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile-setup/update`,
        profile,
        { withCredentials: true }
      );

      setOriginalProfile(profile); // update snapshot
      alert("Profile updated successfully");

    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* ===============================
     DISCARD CHANGES
  ================================ */
  const handleDiscard = () => {
    setProfile(originalProfile);
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!profile) return <p className="loading-text">No profile found</p>;

  return (
    <div className="personal-info-page">
      <h1 className="page-title">Personal Information</h1>

      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              value={profile.publicProfile?.firstName || ""}
              onChange={(e) =>
                handleChange("publicProfile", "firstName", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              value={profile.publicProfile?.lastName || ""}
              onChange={(e) =>
                handleChange("publicProfile", "lastName", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            value={profile.publicProfile?.location || ""}
            onChange={(e) =>
              handleChange("publicProfile", "location", e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Your Role</label>
          <input
            value={profile.professionalInfo?.role || ""}
            onChange={(e) =>
              handleChange("professionalInfo", "role", e.target.value)
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              value={profile.professionalInfo?.experience?.years || ""}
              onChange={(e) =>
                handleNestedChange(
                  "professionalInfo",
                  "experience",
                  "years",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Experience (Months)</label>
            <input
              type="number"
              value={profile.professionalInfo?.experience?.months || ""}
              onChange={(e) =>
                handleNestedChange(
                  "professionalInfo",
                  "experience",
                  "months",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>One-line About You</label>
          <input
            value={profile.professionalInfo?.headline || ""}
            onChange={(e) =>
              handleChange("professionalInfo", "headline", e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Portfolio / Website</label>
          <input
            value={profile.portfolio?.portfolio || ""}
            onChange={(e) =>
              handleChange("portfolio", "portfolio", e.target.value)
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              value={profile.portfolio?.linkedin || ""}
              onChange={(e) =>
                handleChange("portfolio", "linkedin", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              value={profile.portfolio?.github || ""}
              onChange={(e) =>
                handleChange("portfolio", "github", e.target.value)
              }
            />
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            className="btn-secondary"
            onClick={handleDiscard}
            disabled={saving}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;