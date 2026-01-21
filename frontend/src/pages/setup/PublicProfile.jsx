import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authFetch from "../../utils/authFetch";
import "./PublicProfile.css";

import logo from "../../assets/logo.svg"; // Applica logo
import imageIcon from "../../assets/Picture.svg"; // image icon inside circle

const PublicProfile = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Only PNG or JPG images are allowed");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    fileRef.current.value = "";
  };

  const handleNext = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("First name and last name are required");
      return;
    }

    try {
      setLoading(true);

      // NOTE: Image upload handling can be extended later (S3 / Cloudinary)
      await authFetch("/api/profile-setup/public", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          location: location.trim()
        })
      });

      navigate("/dashboard/home");
    } catch (err) {
      console.error("Public profile save failed:", err);
      alert("Failed to save public profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="public-profile-page">
      <img src={logo} alt="Applica" className="public-logo" />

      <h2>Public Profile</h2>

      {/* Avatar Section */}
      <div className="avatar-section">
        <div
          className="avatar-circle"
          onClick={() => fileRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Profile" />
          ) : (
            <img src={imageIcon} alt="Upload" className="avatar-icon" />
          )}
        </div>

        <div className="avatar-actions">
          <button
            className="primary-btn"
            onClick={() => fileRef.current.click()}
          >
            Upload Picture
          </button>

          {preview && (
            <button className="secondary-btn" onClick={removeImage}>
              Delete Picture
            </button>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/png, image/jpeg"
          hidden
          onChange={handleImageSelect}
        />
      </div>

      {/* Form */}
      <div className="public-form">
        <div className="row">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Location</label>
          <input
            type="text"
            placeholder="New Delhi, India"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <button
        className="submit-btn"
        onClick={handleNext}
        disabled={loading}
      >
        {loading ? "Saving..." : "Next"}
      </button>
    </div>
  );
};

export default PublicProfile;
