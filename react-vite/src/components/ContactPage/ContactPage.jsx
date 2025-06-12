import "./ContactPage.css";
import { useState } from "react";
import {  FaLinkedin, FaGithub, FaYoutube, FaDownload } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import MouseTrail from '../MouseTrail/MouseTrail'
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoLink = `mailto:dbovee824@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

const handleResumeDownload = () => {
  // Direct link approach - more reliable
  const link = document.createElement('a');
  link.href = '/Dustin_Bovee_Resume.pdf'; // Make sure this matches your exact filename
  link.download = 'Dustin_Bovee_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="contact-page">
      <MouseTrail />
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Let&apos;s work together to create something amazing</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="contact-methods">

            <div className="contact-method">
              <TfiEmail className="contact-icon" />
              <div>
                <h3>Email</h3>
                <a href="mailto:dbovee824@gmail.com">dbovee824@gmail.com</a>
              </div>
            </div>
          </div>

         <div className="resume-download">
  <h3
  className="resumes"
  >Resume & Scheduling</h3>
  <div className="action-buttons">
    <button onClick={handleResumeDownload} className="resume-btn">
      <FaDownload />
      <span>Download Resume</span>
    </button>
    <a
      href="https://calendly.com/dbovee824/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="schedule-btn"
    >

      <span
        className="resumes"
      >
        Schedule A Meeting
      </span>
    </a>
  </div>
</div>

          <div className="social-links">
            <h3>Connect With Me</h3>
            <div className="social-grid">
              <a href="https://github.com/XSpiritWizardX" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/dustin-bovee/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://www.youtube.com/@dustinboveemusic" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaYoutube />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <div className="availability">
            <h3>Availability</h3>
            <p>🟢 Available for full-time opportunities</p>
            <p>📍 Open to remote work</p>
            <p>🚀 Ready to start immediately</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-butt">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Work Together?</h2>
        <p>I&apos;m actively seeking full-time opportunities as a software engineer. Let&apos;s discuss how I can contribute to your team!</p>
        <div className="cta-buttons">
          <a  href="https://calendly.com/dbovee824/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn primary">
            Discuss Opportunities
          </a>
          <a href="tel:269-506-5112" className="cta-btn secondary">
            Call Me
          </a>
          <button onClick={handleResumeDownload} className="cta-btn resume">
            <FaDownload />
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
