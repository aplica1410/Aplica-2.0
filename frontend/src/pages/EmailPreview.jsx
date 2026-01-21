import "../styles/emailPreview.css";
import PreviewHeader from "../components/applications/PreviewHeader";
import EmailFields from "../components/applications/EmailFields";
import EmailBody from "../components/applications/EmailBody";

const EmailPreview = () => {
  return (
    <div className="preview-page">
      <PreviewHeader />

      <div className="preview-card">
        <EmailFields />
        <EmailBody />

        <button className="send-btn">Send</button>
      </div>
    </div>
  );
};

export default EmailPreview;
