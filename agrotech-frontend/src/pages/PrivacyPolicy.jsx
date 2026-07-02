import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <header className="legal-hero">
        <h1>Privacy Policy</h1>
        <p className="legal-meta">Last updated: March 28, 2026 · AgroTech (“we,” “us,” or “our”)</p>
      </header>

      <p className="legal-note">
        This policy describes how AgroTech collects, uses, and protects information when you use our website and
        services. By using AgroTech, you agree to this Privacy Policy.
      </p>

      <section>
        <h2>1. Who we are</h2>
        <p>
          AgroTech operates an online marketplace that connects farmers and middlemen (buyers or agents) to
          coordinate crop purchase requests and related activity. Contact details appear on our{' '}
          <Link to="/contact">Contact</Link> page.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <ul>
          <li>
            <strong>Account data:</strong> username, email address, password (stored using one-way hashing on our
            servers), and your role (Farmer or Middleman).
          </li>
          <li>
            <strong>Profile and business data:</strong> phone number, address, bio, company name, business type,
            preferred crops, market regions, business license number, and similar fields you choose to provide.
          </li>
          <li>
            <strong>Profile photo:</strong> if you upload an image, we store it so it can be shown in your profile.
          </li>
          <li>
            <strong>Transaction-related records:</strong> purchase requests you create or interact with (for example
            crop type, quantity, price, dates, status, and which user fulfilled a request).
          </li>
          <li>
            <strong>Technical data:</strong> basic server logs may include IP address, browser type, and timestamps
            for security and debugging.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use information</h2>
        <p>We use the information above to:</p>
        <ul>
          <li>Create and authenticate your account and enforce role-based access.</li>
          <li>Display your profile and purchase requests to you and, where applicable, to other users (for example,
            pending requests visible to middlemen).</li>
          <li>Operate, secure, and improve the platform and respond to support requests.</li>
          <li>Comply with law and protect our rights and users.</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of information</h2>
        <p>
          We do not sell your personal information. We may share information with service providers who host our
          infrastructure or help us operate the service (for example, database hosting), subject to confidentiality
          obligations. We may also disclose information if required by law or to protect the safety and integrity of
          AgroTech and our users.
        </p>
      </section>

      <section>
        <h2>5. Cookies and local storage</h2>
        <p>
          AgroTech may use browser storage or similar technologies needed for the app to work (for example, keeping
          you signed in during a session). We do not use third-party advertising cookies on core account flows.
        </p>
      </section>

      <section>
        <h2>6. Data retention</h2>
        <p>
          We keep your information as long as your account is active or as needed to provide the service and meet
          legal obligations. You may request deletion of your account where applicable; some records may be retained in
          anonymized or aggregated form.
        </p>
      </section>

      <section>
        <h2>7. Security</h2>
        <p>
          We use reasonable technical and organizational measures to protect your data. No method of transmission over
          the internet is 100% secure; you should use a strong password and protect your login credentials.
        </p>
      </section>

      <section>
        <h2>8. Your choices</h2>
        <p>
          You can update many profile fields through the Account or Profile page. You may contact us to access, correct,
          or delete certain information, subject to legal and operational limits.
        </p>
      </section>

      <section>
        <h2>9. Children</h2>
        <p>
          AgroTech is not intended for children under 13 (or the minimum age in your jurisdiction). We do not knowingly
          collect personal information from children.
        </p>
      </section>

      <section>
        <h2>10. International users</h2>
        <p>
          If you access AgroTech from outside the country where our servers are located, your information may be
          transferred and processed in those locations.
        </p>
      </section>

      <section>
        <h2>11. Changes</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the revised date at the top. Continued use
          after changes means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>
          Questions about privacy:{' '}
          <a href="mailto:shreyanshjain938@gmail.com">shreyanshjain938@gmail.com</a> or{' '}
          <a href="mailto:imanveshachauhan@gmail.com">imanveshachauhan@gmail.com</a>.{' '}
          <Link to="/contact">Contact us</Link>.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
