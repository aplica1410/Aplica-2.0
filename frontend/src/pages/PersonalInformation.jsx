import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/personal-information.css";

const PersonalInformation = () => {
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  /* ===============================
     FETCH PROFILE
  ================================ */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/profile-setup/me`,
          { withCredentials: true }
        );

        setProfile(res.data);
        setOriginalProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ===============================
     HANDLE CHANGE
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
     VALIDATION
  ================================ */

  useEffect(() => {
    if (!profile) return;

    let newErrors = {};

    if (
      profile.professionalInfo?.experience?.months > 11
    ) {
      newErrors.months = "Months must be 0–11";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [profile]);

  /* ===============================
     SAVE
  ================================ */

  const handleSave = async () => {
    if (!isFormValid) return;

    try {
      setSaving(true);

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile-setup/update`,
        profile,
        { withCredentials: true }
      );

      setOriginalProfile(profile);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setProfile(originalProfile);
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="personal-info-page">
      <h1 className="page-title">Personal Information</h1>

      <div className="form-section">

        {/* ================= PUBLIC ================= */}
        <h3 className="section-title">Public Profile</h3>

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

        {/* ================= PROFESSIONAL ================= */}
        <h3 className="section-title">Professional Info</h3>

        <div className="form-group">
          <label>Role</label>
          <input
            value={profile.professionalInfo?.role || ""}
            onChange={(e) =>
              handleChange("professionalInfo", "role", e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Headline</label>
          <input
            value={profile.professionalInfo?.headline || ""}
            onChange={(e) =>
              handleChange("professionalInfo", "headline", e.target.value)
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Years</label>
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
            <label>Months</label>
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
            {errors.months && (
              <p className="error-text">{errors.months}</p>
            )}
          </div>
        </div>

        {/* ================= PORTFOLIO ================= */}
        <h3 className="section-title">Portfolio & Socials</h3>

        {[
          "portfolio",
          "github",
          "linkedin",
          "dribbble",
          "behance",
          "facebook",
          "instagram",
          "twitter",
          "drive"
        ].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              value={profile.portfolio?.[field] || ""}
              onChange={(e) =>
                handleChange("portfolio", field, e.target.value)
              }
            />
          </div>
        ))}

        {/* ================= ATTACHMENTS ================= */}
        <h3 className="section-title">Attachments</h3>

        <div className="form-group">
          <label>Resume Link</label>
          <input
            value={profile.attachment?.resumeLink || ""}
            onChange={(e) =>
              handleChange("attachment", "resumeLink", e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Optional Note</label>
          <textarea
            value={profile.attachment?.note || ""}
            onChange={(e) =>
              handleChange("attachment", "note", e.target.value)
            }
          />
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="action-buttons">
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={saving || !isFormValid}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            className="btn-secondary"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>

      </div>
    </div>
  );
};

export default PersonalInformation;