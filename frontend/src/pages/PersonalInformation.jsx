import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/personal-information.css";

const PersonalInformation = () => {
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  /* ===============================
     VALIDATION HELPERS
  ================================ */

  const isValidName = (value) => /^[A-Za-z\s]+$/.test(value);
  const isValidText = (value) => /^[A-Za-z0-9\s.,-]*$/.test(value);
  const isNumeric = (value) => /^\d+$/.test(value);

  const isValidLinkedIn = (url) =>
    /^https?:\/\/(www\.)?linkedin\.com\/.*$/i.test(url);

  const isValidGitHub = (url) =>
    /^https?:\/\/(www\.)?github\.com\/.*$/i.test(url);

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
     VALIDATE FORM
  ================================ */

  const validateForm = () => {
    let newErrors = {};

    const firstName = profile.publicProfile?.firstName || "";
    const lastName = profile.publicProfile?.lastName || "";
    const location = profile.publicProfile?.location || "";
    const role = profile.professionalInfo?.role || "";
    const headline = profile.professionalInfo?.headline || "";
    const years = profile.professionalInfo?.experience?.years || "";
    const months = profile.professionalInfo?.experience?.months || "";
    const linkedin = profile.portfolio?.linkedin || "";
    const github = profile.portfolio?.github || "";

    if (firstName && !isValidName(firstName))
      newErrors.firstName = "Only alphabets allowed";

    if (lastName && !isValidName(lastName))
      newErrors.lastName = "Only alphabets allowed";

    if (location && !isValidText(location))
      newErrors.location = "Invalid characters in location";

    if (role && !isValidText(role))
      newErrors.role = "Invalid characters in role";

    if (headline && !isValidText(headline))
      newErrors.headline = "Invalid characters in headline";

    if (years && !isNumeric(years))
      newErrors.years = "Only numbers allowed";

    if (months && !isNumeric(months))
      newErrors.months = "Only numbers allowed";

    if (linkedin && !isValidLinkedIn(linkedin))
      newErrors.linkedin = "Enter valid LinkedIn URL";

    if (github && !isValidGitHub(github))
      newErrors.github = "Enter valid GitHub URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ===============================
     SAVE CHANGES
  ================================ */

  const handleSave = async () => {
    if (!validateForm()) return;

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

  /* ===============================
     DISCARD CHANGES
  ================================ */

  const handleDiscard = () => {
    setProfile(originalProfile);
    setErrors({});
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
              className={errors.firstName ? "error-input" : ""}
              value={profile.publicProfile?.firstName || ""}
              onChange={(e) =>
                handleChange("publicProfile", "firstName", e.target.value)
              }
            />
            {errors.firstName && (
              <p className="error-text">{errors.firstName}</p>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              className={errors.lastName ? "error-input" : ""}
              value={profile.publicProfile?.lastName || ""}
              onChange={(e) =>
                handleChange("publicProfile", "lastName", e.target.value)
              }
            />
            {errors.lastName && (
              <p className="error-text">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location</label>
          <input
            className={errors.location ? "error-input" : ""}
            value={profile.publicProfile?.location || ""}
            onChange={(e) =>
              handleChange("publicProfile", "location", e.target.value)
            }
          />
          {errors.location && (
            <p className="error-text">{errors.location}</p>
          )}
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Your Role</label>
          <input
            className={errors.role ? "error-input" : ""}
            value={profile.professionalInfo?.role || ""}
            onChange={(e) =>
              handleChange("professionalInfo", "role", e.target.value)
            }
          />
          {errors.role && <p className="error-text">{errors.role}</p>}
        </div>

        {/* Experience */}
        <div className="form-row">
          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              className={errors.years ? "error-input" : ""}
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
            {errors.years && <p className="error-text">{errors.years}</p>}
          </div>

          <div className="form-group">
            <label>Experience (Months)</label>
            <input
              type="number"
              className={errors.months ? "error-input" : ""}
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
            {errors.months && <p className="error-text">{errors.months}</p>}
          </div>
        </div>

        {/* LinkedIn & GitHub */}
        <div className="form-row">
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              className={errors.linkedin ? "error-input" : ""}
              value={profile.portfolio?.linkedin || ""}
              onChange={(e) =>
                handleChange("portfolio", "linkedin", e.target.value)
              }
            />
            {errors.linkedin && (
              <p className="error-text">{errors.linkedin}</p>
            )}
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              className={errors.github ? "error-input" : ""}
              value={profile.portfolio?.github || ""}
              onChange={(e) =>
                handleChange("portfolio", "github", e.target.value)
              }
            />
            {errors.github && (
              <p className="error-text">{errors.github}</p>
            )}
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