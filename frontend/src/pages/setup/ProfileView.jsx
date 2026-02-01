import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile data found.</p>;

  const { publicProfile, professionalInfo, portfolio, attachment } = profile;

  return (
    <div className="profile-view">
      <h1>Your Profile</h1>

      {/* Public Profile */}
      <section>
        <h2>Public Profile</h2>
        <p>
          <b>Name:</b> {publicProfile?.firstName} {publicProfile?.lastName}
        </p>
        <p>
          <b>Location:</b> {publicProfile?.location}
        </p>
        <button onClick={() => navigate("public")}>Edit</button>
      </section>

      {/* Professional Info */}
      <section>
        <h2>Professional Info</h2>
        <p>
          <b>Role:</b> {professionalInfo?.role}
        </p>
        <p>
          <b>Headline:</b> {professionalInfo?.headline}
        </p>
        <p>
          <b>Experience:</b>{" "}
          {professionalInfo?.experience?.years}y{" "}
          {professionalInfo?.experience?.months}m
        </p>
        <button onClick={() => navigate("professional")}>Edit</button>
      </section>

      {/* Portfolio */}
      <section>
        <h2>Portfolio & Socials</h2>
        <p><b>Portfolio:</b> {portfolio?.portfolio}</p>
        <p><b>LinkedIn:</b> {portfolio?.linkedin}</p>
        <p><b>GitHub:</b> {portfolio?.github}</p>
        <button onClick={() => navigate("portfolio")}>Edit</button>
      </section>

      {/* Attachments */}
      <section>
        <h2>Attachments</h2>
        {attachment?.filename ? (
          <p>{attachment.originalName}</p>
        ) : (
          <p>No attachment uploaded</p>
        )}
        <button onClick={() => navigate("attachments")}>Edit</button>
      </section>
    </div>
  );
};

export default ProfileView;
