import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Please enter your first name.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Please enter your last name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = 'Please provide a brief message (at least 20 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Mock submit
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1200);
    }
  };

  if (isSuccess) {
    return (
      <div className="form-success show" id="form-success">
        <div className="success-icon">
          <svg viewBox="0 0 28 28"><polyline points="5 14 11 20 23 8"/></svg>
        </div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. A member of our team will be in contact with you within one business day.</p>
      </div>
    );
  }

  return (
    <form id="contact-form" className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="form-grid-2">
        <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
          <label className="form-label" htmlFor="first-name">First Name *</label>
          <input className="form-input" type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
          {errors.firstName && <span className="form-error">{errors.firstName}</span>}
        </div>
        <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
          <label className="form-label" htmlFor="last-name">Last Name *</label>
          <input className="form-input" type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Smith" />
          {errors.lastName && <span className="form-error">{errors.lastName}</span>}
        </div>
      </div>

      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label className="form-label" htmlFor="email">Email Address *</label>
        <input className="form-input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input className="form-input" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 63965 82575" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="company">Company Name</label>
          <input className="form-input" type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="service">Service of Interest</label>
        <select className="form-select" id="service" name="service" value={formData.service} onChange={handleChange}>
          <option value="" disabled>Select a service…</option>
          <option value="resume-making">Resume Making</option>
          <option value="job-recruitment">Job Recruitment</option>
          <option value="career-consultation">Career Consultation</option>
          <option value="mock-interview-training">Mock Interview &amp; Training</option>
          <option value="professional-hurdles-consultation">Professional Hurdles Consultation</option>
          <option value="multiple">Multiple Services</option>
          <option value="not-sure">Not Sure Yet</option>
        </select>
      </div>

      <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
        <label className="form-label" htmlFor="message">Your Message *</label>
        <textarea className="form-textarea" id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your business challenge or what you're looking to achieve…"></textarea>
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
        {isSubmitting ? 'Sending…' : 'Send Message'}
        {!isSubmitting && <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>}
      </button>
    </form>
  );
}
