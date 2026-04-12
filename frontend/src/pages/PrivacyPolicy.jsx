import "./Legal.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">

        <h1>Privacy Policy</h1>
        <p className="effective-date">Effective Date: 10 Apr, 2026</p>

        <p>
          Welcome to <strong>Aplica</strong> (“we,” “our,” or “us”). Your privacy is important to us. 
          This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
        </p>

        <section>
          <h2>1. Information We Collect</h2>

          <h3>a. Personal Information</h3>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Account credentials</li>
            <li>Portfolio links (Google Drive, Dropbox, etc.)</li>
          </ul>

          <h3>b. Usage Data</h3>
          <ul>
            <li>Job descriptions entered</li>
            <li>Generated emails</li>
            <li>App usage behavior (analytics)</li>
          </ul>

          <h3>c. Third-Party Data</h3>
          <ul>
            <li>Google account data (if you use Gmail integration)</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Generate personalized job application emails</li>
            <li>Send emails via your connected account</li>
            <li>Improve our services and user experience</li>
            <li>Provide support and communicate with you</li>
          </ul>
        </section>

        <section>
          <h2>3. Email & Account Integration</h2>
          <p>
            Aplica uses Gmail API (or similar services) to send emails on your behalf.
          </p>
          <ul>
            <li>We <strong>do NOT read, store, or share your email content unnecessarily</strong></li>
            <li>We only access what is required to send emails you initiate</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Storage</h2>
          <ul>
            <li>Portfolio files are <strong>NOT stored</strong> (only links are used)</li>
            <li>Basic account data is stored securely in our database</li>
            <li>We take reasonable steps to protect your data</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Sharing</h2>
          <p>We do NOT sell your data.</p>
          <p>We may share data with:</p>
          <ul>
            <li>Service providers (hosting, analytics)</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <ul>
            <li>Access your data</li>
            <li>Request deletion of your account</li>
            <li>Disconnect integrations anytime</li>
          </ul>
        </section>

        <section>
          <h2>7. Security</h2>
          <p>
            We implement industry-standard security practices, but no system is 100% secure.
          </p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this policy. Continued use of Aplica means you accept updates.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>For questions:</p>
          <p className="email">📧 aplica1410@gmail.com</p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;