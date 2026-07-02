import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

function TermsOfService() {
  return (
    <div className="legal-page">
      <header className="legal-hero">
        <h1>Terms of Service</h1>
        <p className="legal-meta">Last updated: March 28, 2026 · AgroTech (“AgroTech,” “we,” “us,” or “our”)</p>
      </header>

      <p className="legal-note">
        These Terms govern your use of the AgroTech website and related services. By accessing or using AgroTech, you
        agree to these Terms. If you do not agree, do not use the service.
      </p>

      <section>
        <h2>1. The service</h2>
        <p>
          AgroTech provides a digital platform for farmers and middlemen to create accounts, manage profiles, submit
          and review crop purchase requests, and record fulfillment status. Features may change as we improve the
          product.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>
          You must be legally able to enter a binding agreement in your jurisdiction. You must provide accurate
          registration information and keep your account credentials confidential.
        </p>
      </section>

      <section>
        <h2>3. Accounts and roles</h2>
        <p>
          You register as either a <strong>Farmer</strong> or a <strong>Middleman</strong>. You are responsible for
          selecting the correct role. You may not impersonate another person or misrepresent your business. We may
          suspend accounts that violate these Terms.
        </p>
      </section>

      <section>
        <h2>4. User content and conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the platform for unlawful, fraudulent, or misleading activity.</li>
          <li>Harass, abuse, or harm other users.</li>
          <li>Attempt to probe, scan, or breach our systems or other users’ accounts.</li>
          <li>Upload malware or content that infringes others’ intellectual property or privacy.</li>
        </ul>
        <p>
          You retain ownership of content you submit (such as profile text and profile photos). You grant us a
          non-exclusive license to host, display, and process that content as needed to operate AgroTech.
        </p>
      </section>

      <section>
        <h2>5. Purchase requests and offline deals</h2>
        <p>
          AgroTech helps you coordinate and communicate about crop requests. Unless we explicitly state otherwise,
          <strong> we do not guarantee prices, quality, delivery, or payment</strong>. Negotiations, contracts,
          transportation, inspection, and payment are between you and the other party. You are solely responsible for
          evaluating counterparties and completing any off-platform arrangements.
        </p>
      </section>

      <section>
        <h2>6. Disclaimers</h2>
        <p>
          THE SERVICE IS PROVIDED <strong>“AS IS”</strong> AND <strong>“AS AVAILABLE.”</strong> TO THE MAXIMUM EXTENT
          PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR
          ERROR-FREE.
        </p>
      </section>

      <section>
        <h2>7. Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, AGROTECH AND ITS AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING
          FROM YOUR USE OF THE SERVICE OR DEALINGS WITH OTHER USERS. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE
          SERVICE IS LIMITED TO THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SERVICE IN THE TWELVE MONTHS BEFORE THE
          CLAIM OR (B) ONE HUNDRED INDIAN RUPEES (₹100), IF NO FEES APPLIED.
        </p>
        <p>
          Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest
          extent permitted by law.
        </p>
      </section>

      <section>
        <h2>8. Indemnity</h2>
        <p>
          You agree to defend and indemnify AgroTech against claims, damages, losses, and expenses (including reasonable
          attorneys’ fees) arising from your use of the service, your content, or your violation of these Terms or
          applicable law.
        </p>
      </section>

      <section>
        <h2>9. Termination</h2>
        <p>
          You may stop using AgroTech at any time. We may suspend or terminate access if you breach these Terms or if
          we need to protect the service or other users. Provisions that by nature should survive will survive
          termination.
        </p>
      </section>

      <section>
        <h2>10. Governing law</h2>
        <p>
          These Terms are governed by the laws of India, without regard to conflict-of-law rules. Courts located in
          Lucknow, Uttar Pradesh, India, shall have exclusive jurisdiction over disputes, subject to mandatory
          consumer protections in your jurisdiction where applicable.
        </p>
      </section>

      <section>
        <h2>11. Changes</h2>
        <p>
          We may update these Terms. We will post the updated date and, where appropriate, provide notice. Continued use
          after changes constitutes acceptance.
        </p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>
          Questions about these Terms:{' '}
          <a href="mailto:shreyanshjain938@gmail.com">shreyanshjain938@gmail.com</a> or{' '}
          <a href="mailto:imanveshachauhan@gmail.com">imanveshachauhan@gmail.com</a>.{' '}
          <Link to="/contact">Contact us</Link>. See also our <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </section>
    </div>
  );
}

export default TermsOfService;
