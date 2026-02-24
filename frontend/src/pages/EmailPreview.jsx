import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

import "../styles/emailPreview.css";
import PreviewHeader from "../components/applications/PreviewHeader";
import EmailFields from "../components/applications/EmailFields";
import EmailBody from "../components/applications/EmailBody";

const EmailPreview = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`/api/applications/${id}`);
        setApplication(res.data.application);
      } catch (err) {
        console.error("Failed to load application", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!application) return <p>Application not found</p>;

  return (
    <div className="preview-page">
      <PreviewHeader />

      <div className="preview-card">
        <EmailFields
          to={application.extractedEmail}
          subject={application.subject}
          readOnly={true}
        />

        <EmailBody
          body={application.emailBody}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default EmailPreview;