import "../styles/email-sent.css";
import SentHeader from "../components/applications/SentHeader";
import EmailFields from "../components/applications/EmailFields";
import EmailBody from "../components/applications/EmailBody";

const EmailSent = () => {
  return (
    <div className="sent-page">
      <SentHeader />

      <div className="sent-card">
        <EmailFields readOnly />
        <EmailBody readOnly />

        <div className="success-msg">
          ✅ Email successfully sent
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
