import { useEffect, useState } from "react";
import axios from "axios";
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

  return (
    <div className="profile-view">
      <h1>Your Profile</h1>

      {/* Public */}
      <section>
        <h2>Public Profile</h2>
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Headline:</b> {profile.headline}</p>
        <button onClick={() => navigate("public")}>Edit</button>
      </section>

      {/* Professional */}
      <section>
        <h2>Professional Info</h2>
        <p><b>Role:</b> {profile.role}</p>
        <p><b>Experience:</b> {profile.experience}</p>
        <button onClick={() => navigate("professional")}>Edit</button>
      </section>

      {/* Portfolio */}
      <section>
        <h2>Portfolio & Socials</h2>
        <p><b>LinkedIn:</b> {profile.linkedin}</p>
        <p><b>Portfolio:</b> {profile.portfolio}</p>
        <button onClick={() => navigate("portfolio")}>Edit</button>
      </section>

      {/* Attachments */}
      <section>
        <h2>Attachments</h2>
        {profile.resume && (
          <a href={profile.resume} target="_blank" rel="noreferrer">
            View Resume
          </a>
        )}
        <button onClick={() => navigate("attachments")}>Edit</button>
      </section>
    </div>
  );
};

export default ProfileView;
