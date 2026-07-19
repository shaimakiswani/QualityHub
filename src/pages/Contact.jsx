import React, { useState, useEffect } from 'react';
import { saveQARequest } from '../firebase';
import { CheckCircle2, Send, Clock, ShieldCheck, Mail, Building, Globe, DollarSign, AlertCircle, Phone } from 'lucide-react';

export default function Contact({ selectedService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: selectedService || 'Manual Testing',
    projectUrl: '',
    priority: 'Medium',
    budget: '$1,000 - $5,000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, serviceType: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await saveQARequest(formData);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        serviceType: 'Manual Testing',
        projectUrl: '',
        priority: 'Medium',
        budget: '$1,000 - $5,000',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '60px 0 100px' }}>
      <div className="container">
        <div className="section-header">
          <div className="badge-pill">Request Service</div>
          <h1 className="section-title">Start Your <span className="gradient-text">QA Project</span></h1>
          <p className="section-desc">
            Fill out the form below to receive a custom testing proposal and turn-key QA audit strategy from our engineering leads.
          </p>
        </div>

        <div className="contact-layout">
          {/* Info Sidebar */}
          <div className="glass-panel contact-info-panel">
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '24px' }}>
              Why Work With QualityHub?
            </h3>

            <div className="info-item">
              <div className="info-icon">
                <Clock size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600' }}>Fast 24-Hour SLA</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Our lead QA architects review all incoming project requests within 24 hours.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600' }}>Strict NDA & Data Privacy</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Your codebases, API credentials, and staging environments are completely encrypted and secure.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Phone size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600' }}>Phone & WhatsApp</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--primary-cyan)', fontWeight: '600' }}>
                  +962 7 7264 410 (077264410)
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Direct line for Jordanian clients & instant support.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Mail size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600' }}>Direct Support Line</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  support@qualityhub.qa
                </p>
              </div>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(0, 240, 255, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--primary-cyan)', fontWeight: '600' }}>
                Need urgent hotfix testing?
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Select "Critical" priority for immediate same-day deployment support.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel contact-form">
            {isSubmitted && (
              <div className="success-banner">
                <div className="success-icon">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Thank you!</h4>
                  <p style={{ fontSize: '0.92rem' }}>Our QA team will contact you shortly.</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', borderRadius: 'var(--radius-md)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. john@company.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number * (Required)</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. +962 7 7000 0000 / 077XXXXXXX"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. TechCorp Inc."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Service Type *</label>
                  <select 
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Manual Testing">Manual Testing</option>
                    <option value="API Testing">API Testing</option>
                    <option value="Automation Testing">Automation Testing</option>
                    <option value="Performance Testing">Performance Testing</option>
                    <option value="Security Testing">Security Testing</option>
                    <option value="Full QA Audit Package">Full QA Audit Package</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Project URL / App Link</label>
                  <input 
                    type="url" 
                    name="projectUrl"
                    value={formData.projectUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Priority Level</label>
                  <select 
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Low">Low (Standard Review)</option>
                    <option value="Medium">Medium (Fast Turnaround)</option>
                    <option value="High">High (Urgent Release)</option>
                    <option value="Critical">Critical (Immediate Deployment Support)</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Estimated Budget Range</label>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="<$1,000">Less than $1,000</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000+">$15,000+</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Project Message / Requirements</label>
                  <textarea 
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us about your application, tech stack, testing scope, or specific deadline..."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
                style={{ marginTop: '24px', width: '100%' }}
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Submitting Request...' : 'Submit Request'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
