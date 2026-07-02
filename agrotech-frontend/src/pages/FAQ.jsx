import React from 'react';
import { Link } from 'react-router-dom';
import { faqItems } from '../data/faqContent';
import './Contact.css';

function FAQ() {
  return (
    <div className="page-transition">
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Frequently Asked Questions</h1>
            <p className="hero-subtext">
              Answers about accounts, roles, purchase requests, and how AgroTech fits into your workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2>FAQs</h2>
            <p>
              Still need help? Visit our <Link to="/contact">Contact</Link> page or{' '}
              <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Service</Link>.
            </p>
          </div>

          <div className="faq-list">
            {faqItems.map((item, i) => (
              <details className="faq-item" key={i}>
                <summary>{item.q}</summary>
                <div>
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
