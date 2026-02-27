import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfessionalInfo.css";

import logo from "../../assets/logo.svg";

import Designer from "../../assets/Designer.svg";
import Developer from "../../assets/Developer.svg";
import Writer from "../../assets/Writer.svg";
import Editor from "../../assets/Editor.svg";
import Marketer from "../../assets/Marketer.svg";
import Other from "../../assets/Other.svg";

const rolesData = [
  { name: "Designer", icon: Designer },
  { name: "Developer", icon: Developer },
  { name: "Writer", icon: Writer },
  { name: "Editor", icon: Editor },
  { name: "Marketer", icon: Marketer },
  { name: "Other", icon: Other },
];

const ProfessionalInfo = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [headline, setHeadline] = useState("");

  const isValid =
    selectedRole &&
    customRole.trim() &&
    years !== "" &&
    months !== "";

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setCustomRole(role);
  };

  const handleNext = async () => {
    if (!isValid) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile-setup/professional`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            role: customRole.trim(),
            experience: {
              years: Number(years),
              months: Number(months),
            },
            headline: headline.trim(),
          }),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      navigate("/dashboard");
    } catch (err) {
      console.error("Professional save failed:", err);
      alert("Failed to save professional info");
    }
  };

  return (
    <div className="professional-page">
      <img src={logo} alt="Applica" className="setup-logo" />

      <div className="professional-card">
        <h2>Professional Information</h2>
        <p className="subtext">What Best Describes Your Field</p>

        {/* Role Selection Grid */}
        <div className="role-grid">
          {rolesData.map((role) => (
            <div
              key={role.name}
              className={`role-card ${
                selectedRole === role.name ? "selected" : ""
              }`}
              onClick={() => handleSelectRole(role.name)}
            >
              <img src={role.icon} alt={role.name} />
              <span>{role.name}</span>

              {selectedRole === role.name && (
                <div className="tick">✔</div>
              )}
            </div>
          ))}
        </div>

        {/* Role Input */}
        <div className="field">
          <label>Your Role</label>
          <input
            type="text"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            placeholder="UI Designer"
          />
        </div>

        {/* Experience */}
        <div className="experience-row">
          <div className="field">
            <label>Years</label>
            <input
              type="number"
              min="0"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Months</label>
            <input
              type="number"
              min="0"
              max="11"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </div>
        </div>

        {/* Headline */}
        <div className="field">
          <label>One-line About You</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="UI/UX designer focused on SaaS and landing pages"
          />
        </div>

        <button
          className="next-btn"
          disabled={!isValid}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfessionalInfo;