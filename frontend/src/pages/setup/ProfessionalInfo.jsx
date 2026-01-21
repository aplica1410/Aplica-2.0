import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authFetch from "../../utils/authFetch";

// Example icons (adjust paths as per your assets folder)
import "./ProfessionalInfo.css";

import designerIcon from "../../assets/designer.svg";
import developerIcon from "../../assets/developer.svg";
import writerIcon from "../../assets/writer.svg";
import editorIcon from "../../assets/editor.svg";
import marketerIcon from "../../assets/marketer.svg";
import otherIcon from "../../assets/other.svg";

const categories = [
  { id: "designer", label: "Designer", icon: designerIcon },
  { id: "developer", label: "Developer", icon: developerIcon },
  { id: "writer", label: "Writer", icon: writerIcon },
  { id: "editor", label: "Editor", icon: editorIcon },
  { id: "marketer", label: "Marketer", icon: marketerIcon },
  { id: "other", label: "Other", icon: otherIcon }
];

const ProfessionalInfo = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Guard (handled by layout, but safe)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("aplica_user"));
    if (user?.profileComplete) {
      navigate("/dashboard/home", { replace: true });
    }
  }, [navigate]);

  const handleNext = async () => {
    // 🔴 Validation
    if (!category) {
      alert("Please select a category");
      return;
    }

    if (!role.trim()) {
      alert("Role is required");
      return;
    }

    if (years === "" || months === "") {
      alert("Please enter your experience");
      return;
    }

    if (Number(months) > 11) {
      alert("Months should be between 0 and 11");
      return;
    }

    try {
      setLoading(true);

      await authFetch("/api/profile-setup/professional", {
        method: "POST",
        body: JSON.stringify({
          category,
          role: role.trim(),
          experience: {
            years: Number(years),
            months: Number(months)
          },
          headline: headline.trim() || null
        })
      });

      navigate("/dashboard/profile/portfolio");
    } catch (err) {
      console.error("Professional info save failed:", err);
      alert("Failed to save professional info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup professional-info">
      <h2>Professional Information</h2>
      <p>What best describes your field?</p>

      {/* Category Tiles */}
      <div className="category-grid">
        {categories.map((item) => (
          <button
            key={item.id}
            className={`category-card ${
              category === item.id ? "active" : ""
            }`}
            onClick={() => setCategory(item.id)}
          >
            <img src={item.icon} alt={item.label} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Role */}
      <label>Your Role *</label>
      <input
        type="text"
        placeholder="UI Designer"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      {/* Experience */}
      <label>Experience *</label>
      <div className="experience-row">
        <input
          type="number"
          min="0"
          placeholder="Years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="11"
          placeholder="Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
        />
      </div>

      {/* Headline */}
      <label>One-line About You (optional)</label>
      <input
        type="text"
        placeholder="UI/UX designer focused on SaaS and landing pages"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
      />

      <button onClick={handleNext} disabled={loading}>
        {loading ? "Saving..." : "Next"}
      </button>
    </div>
  );
};

export default ProfessionalInfo;
