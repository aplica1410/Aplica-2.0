import "./Legal.css";

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">

        <h1>Terms of Service</h1>
        <p className="effective-date">Effective Date: 10 Apr, 2026</p>

        <p>
          By using <strong>Aplica</strong>, you agree to the following terms:
        </p>

        <section>
          <h2>1. Use of Service</h2>
          <p>
            Aplica helps users generate and send job application emails.
          </p>
          <p>You agree to:</p>
          <ul>
            <li>Use the platform legally</li>
            <li>Provide accurate information</li>
            <li>Not misuse or abuse the service</li>
          </ul>
        </section>

        <section>
          <h2>2. User Responsibility</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>The content of emails sent</li>
            <li>Ensuring accuracy of job applications</li>
            <li>Any actions taken using your account</li>
          </ul>
          <p>
            Aplica is <strong>not responsible</strong> for hiring outcomes.
          </p>
        </section>

        <section>
          <h2>3. Email Sending Limits</h2>
          <ul>
            <li>Email limits may apply based on your plan</li>
            <li>Limits may also depend on your email provider (e.g., Gmail quotas)</li>
          </ul>
        </section>

        <section>
          <h2>4. Payments & Plans</h2>
          <ul>
            <li>Paid plans are billed as described on the platform</li>
            <li>No refunds unless stated otherwise</li>
            <li>We may change pricing with notice</li>
          </ul>
        </section>

        <section>
          <h2>5. Account Termination</h2>
          <p>We may suspend or terminate accounts if:</p>
          <ul>
            <li>Terms are violated</li>
            <li>Abuse or misuse is detected</li>
          </ul>
          <p>You may delete your account anytime.</p>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <ul>
            <li>Aplica owns the platform, design, and technology</li>
            <li>You retain ownership of your content</li>
          </ul>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>Aplica is provided “as is.”</p>
          <p>We are not liable for:</p>
          <ul>
            <li>Job rejections</li>
            <li>Email delivery issues</li>
            <li>Third-party service failures</li>
          </ul>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We may update these terms. Continued use means acceptance.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p className="email">📧 aplica1410@gmail.com</p>
        </section>

      </div>
    </div>
  );
};

export default TermsOfService;