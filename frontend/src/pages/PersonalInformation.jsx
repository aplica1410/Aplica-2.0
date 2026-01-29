import { useEffect, useState } from "react";
import axios from "axios";

const PersonalInformation = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading personal information...</p>;
  if (!user) return <p>No data found.</p>;

  return (
    <div style={{ color: "#fff", maxWidth: "900px" }}>
      <h1>Personal Information</h1>

      {/* PUBLIC */}
      <section>
        <h3>Public Profile</h3>
        <p><b>Name:</b> {user.publicProfile?.firstName} {user.publicProfile?.lastName}</p>
        <p><b>Location:</b> {user.publicProfile?.location}</p>
      </section>

      {/* PROFESSIONAL */}
      <section>
        <h3>Professional Info</h3>
        <p><b>Role:</b> {user.professionalInfo?.role}</p>
        <p>
          <b>Experience:</b>{" "}
          {user.professionalInfo?.experience?.years}y{" "}
          {user.professionalInfo?.experience?.months}m
        </p>
        <p><b>Headline:</b> {user.professionalInfo?.headline}</p>
      </section>

      {/* PORTFOLIO */}
      <section>
        <h3>Portfolio & Socials</h3>
        <p><b>Portfolio:</b> {user.portfolio?.portfolio}</p>
        <p><b>LinkedIn:</b> {user.portfolio?.linkedin}</p>
        <p><b>GitHub:</b> {user.portfolio?.github}</p>
      </section>

      {/* ATTACHMENT */}
      <section>
        <h3>Attachment</h3>
        {user.attachment?.originalName ? (
          <p>{user.attachment.originalName}</p>
        ) : (
          <p>No attachment uploaded</p>
        )}
      </section>
    </div>
  );
};

export default PersonalInformation;
