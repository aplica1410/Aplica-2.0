import { useState, useEffect } from "react";
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

const domainRules = {
  github: "github.com",
  dribbble: "dribbble.com",
  behance: "behance.net",
  linkedin: "linkedin.com",
  facebook: "facebook.com",
  instagram: "instagram.com",
  twitter: ["twitter.com", "x.com"],
  drive: "drive.google.com",
};

const PortfolioSocials = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const BACKEND_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const [isValid, setIsValid] = useState(true);

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

  const validateLink = (key, value) => {
    if (!value) return "";

    try {
      const url = new URL(value.startsWith("http") ? value : `https://${value}`);
      const rule = domainRules[key];

      if (Array.isArray(rule)) {
        return rule.some((domain) =>
          url.hostname.includes(domain)
        )
          ? ""
          : `Must be a valid ${key} link`;
      }

      return url.hostname.includes(rule)
        ? ""
        : `Must be a valid ${key} link`;
    } catch {
      return "Invalid URL format";
    }
  };

  useEffect(() => {
    let newErrors = {};
    let newValid = {};

    Object.keys(domainRules).forEach((key) => {
      const error = validateLink(key, links[key]);

      if (error) {
        newErrors[key] = error;
      } else if (links[key]) {
        newValid[key] = true;
      }
    });

    setErrors(newErrors);
    setValidFields(newValid);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [links]);

  const handleChange = (key, value) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    if (!isValid) return;

    try {
      setSaving(true);

      const res = await fetch(
        `${BACKEND_URL}/api/profile-setup/portfolio`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(links)
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

  const SocialInput = ({ icon, label, keyName }) => (
    <div className="field">
      <label className="social-label">
        <img src={icon} alt={label} />
        {label}
      </label>

      <div className="input-wrapper">
        <input
          type="url"
          className={errors[keyName] ? "input-error" : ""}
          value={links[keyName]}
          onChange={(e) => handleChange(keyName, e.target.value)}
        />

        {validFields[keyName] && (
          <span className="valid-check">✓</span>
        )}
      </div>

      {errors[keyName] && (
        <span className="error-text">{errors[keyName]}</span>
      )}
    </div>
  );

  return (
    <div className="portfolio-page">
      <div className="portfolio-card">
        <img src={logo} alt="Applica" className="card-logo" />

        <h2>Portfolio & Socials</h2>
        <p className="subtext">
          Add links to your work or social profiles (optional)
        </p>

        <div className="grid">
          <SocialInput icon={githubIcon} label="Github" keyName="github" />
          <SocialInput icon={dribbbleIcon} label="Dribbble" keyName="dribbble" />
          <SocialInput icon={behanceIcon} label="Behance" keyName="behance" />
          <SocialInput icon={linkedinIcon} label="LinkedIn" keyName="linkedin" />
          <SocialInput icon={facebookIcon} label="Facebook" keyName="facebook" />
          <SocialInput icon={instagramIcon} label="Instagram" keyName="instagram" />
          <SocialInput icon={twitterIcon} label="X / Twitter" keyName="twitter" />
          <SocialInput icon={driveIcon} label="Google Drive" keyName="drive" />
        </div>

        <button
          className="next-btn"
          disabled={saving || !isValid}
          onClick={handleNext}
        >
          {saving ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default PortfolioSocials;