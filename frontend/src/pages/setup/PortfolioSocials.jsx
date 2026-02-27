import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getMe } from "../../api/auth";
import "./PortfolioSocials.css";
import logo from "../../assets/logo.svg";

// Icons
import githubIcon from "../../assets/GitHub.svg";
import dribbbleIcon from "../../assets/Dribbble.svg";
import behanceIcon from "../../assets/Behance.svg";
import linkedinIcon from "../../assets/LinkedIn.svg";
import facebookIcon from "../../assets/Facebook.svg";
import instagramIcon from "../../assets/Instagram.svg";
import twitterIcon from "../../assets/X.svg";
import driveIcon from "../../assets/Google Drive.svg";

const PortfolioSocials = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const BACKEND_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [saving, setSaving] = useState(false);

  const [links, setLinks] = useState({
    portfolio: "",
    github: "",
    dribbble: "",
    behance: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    drive: ""
  });

  const handleChange = (key, value) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    try {
      setSaving(true);

      const res = await fetch(
        `${BACKEND_URL}/api/profile-setup/portfolio`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            portfolio: links.portfolio || null,
            github: links.github || null,
            dribbble: links.dribbble || null,
            behance: links.behance || null,
            linkedin: links.linkedin || null,
            facebook: links.facebook || null,
            instagram: links.instagram || null,
            twitter: links.twitter || null,
            drive: links.drive || null
          })
        }
      );

      if (!res.ok) throw new Error("Failed to save portfolio links");

      const updatedUser = await getMe();
      setUser(updatedUser);

      navigate("/dashboard/profile/attachments");
    } catch (err) {
      console.error("Portfolio save failed:", err);
      alert("Failed to save portfolio links");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-card">

        <img src={logo} alt="Applica" className="card-logo" />

        <h2>Portfolio & Socials</h2>
        <p className="subtext">
          Add links to your work or social profiles (optional)
        </p>

        {/* Portfolio Main */}
        <div className="field full">
          <label>Portfolio / Website</label>
          <input
            type="url"
            placeholder="https://yourportfolio.com"
            value={links.portfolio}
            onChange={(e) => handleChange("portfolio", e.target.value)}
          />
        </div>

        {/* Social Grid */}
        <div className="grid">
          <SocialInput icon={githubIcon} label="Github" value={links.github} onChange={(v) => handleChange("github", v)} />
          <SocialInput icon={dribbbleIcon} label="Dribbble" value={links.dribbble} onChange={(v) => handleChange("dribbble", v)} />
          <SocialInput icon={behanceIcon} label="Behance" value={links.behance} onChange={(v) => handleChange("behance", v)} />
          <SocialInput icon={linkedinIcon} label="LinkedIn" value={links.linkedin} onChange={(v) => handleChange("linkedin", v)} />
          <SocialInput icon={facebookIcon} label="Facebook" value={links.facebook} onChange={(v) => handleChange("facebook", v)} />
          <SocialInput icon={instagramIcon} label="Instagram" value={links.instagram} onChange={(v) => handleChange("instagram", v)} />
          <SocialInput icon={twitterIcon} label="X / Twitter" value={links.twitter} onChange={(v) => handleChange("twitter", v)} />
          <SocialInput icon={driveIcon} label="Google Drive" value={links.drive} onChange={(v) => handleChange("drive", v)} />
        </div>

        <button
          className="next-btn"
          onClick={handleNext}
          disabled={saving}
        >
          {saving ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
};

const SocialInput = ({ icon, label, value, onChange }) => (
  <div className="field">
    <label className="social-label">
      <img src={icon} alt={label} />
      {label}
    </label>
    <input
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default PortfolioSocials;