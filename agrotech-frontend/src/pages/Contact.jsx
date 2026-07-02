import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';
import { faqItems } from '../data/faqContent';

function Contact() {
  return (
    <div className="page-transition">
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Contact Us</h1>
            <p className="hero-subtext">
              Have questions or need assistance? Our team is here to help you get the most out of AgroTech.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-box">
              <div className="icon-wrapper">
                <MapPin size={24} className="icon-primary" />
              </div>
              <h3>Our Location</h3>
              <p>
                IIIT Lucknow
                <br />
                Ahmamau, Lucknow
              </p>
            </div>

            <div className="info-box">
              <div className="icon-wrapper">
                <Phone size={24} className="icon-primary" />
              </div>
              <h3>Phone Number</h3>
              <p>
                General: 8266069764
                <br />
                Support: 8808055888
                <br />
                Sales: 8266069764
              </p>
            </div>

            <div className="info-box">
              <div className="icon-wrapper">
                <Mail size={24} className="icon-primary" />
              </div>
              <h3>Email Address</h3>
              <p>
                General: shreyanshjain938@gmail.com
                <br />
                Support: imanveshachauhan@gmail.com
                <br />
                Sales: shreyanshjain938@gmail.com
              </p>
            </div>

            <div className="info-box">
              <div className="icon-wrapper">
                <Clock size={24} className="icon-primary" />
              </div>
              <h3>Working Hours</h3>
              <p>
                Mon - Fri: 8AM - 8PM
                <br />
                Saturday: 9AM - 5PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about AgroTech</p>
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

export default Contact;
