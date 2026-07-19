import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Services({ setActivePage, onSelectService }) {
  const servicesList = [
    {
      id: 'manual-testing',
      title: 'Manual Testing',
      image: './assets/manual_qa.png',
      description: 'Comprehensive human exploratory, end-to-end user journey, functional, and usability testing across all browsers and mobile devices.',
      technologies: ['Functional Testing', 'Regression Testing', 'Smoke Testing', 'UAT', 'Cross-Browser', 'Mobile QA'],
      features: [
        'Exploratory & Edge-Case Bug Hunting',
        'User Acceptance Testing (UAT) Verification',
        'Cross-Platform & Mobile Responsive Audits',
        'Structured Defect Logging with Screenshots & Video'
      ]
    },
    {
      id: 'api-testing',
      title: 'API Testing',
      image: './assets/api_qa.png',
      description: 'Robust validation of REST, GraphQL, and SOAP microservices for schema accuracy, status code assertions, and security headers.',
      technologies: ['Postman', 'REST APIs', 'Status Codes', 'Response Validation', 'Swagger', 'GraphQL'],
      features: [
        'HTTP Request & Response Assertion',
        'Postman Collection Test Runner & Automation',
        'Schema Validation & Payload Contract Verification',
        'API Rate Limiting & Auth Header Audits'
      ]
    },
    {
      id: 'automation-testing',
      title: 'Automation Testing',
      image: './assets/automation_qa.png',
      description: 'Build fast, maintainable, and resilient automated test suites integrated directly into your CI/CD deployment pipelines.',
      technologies: ['Selenium', 'Playwright', 'Cypress', 'TypeScript / JS', 'PyTest', 'GitHub Actions'],
      features: [
        'Parallel Test Execution in Headless Browsers',
        'Self-Healing Locators & Flaky Test Reduction',
        'CI/CD Pipeline Integration (GitHub, GitLab, Jenkins)',
        'HTML Execution Dashboard & Artifact Storage'
      ]
    },
    {
      id: 'performance-testing',
      title: 'Performance Testing',
      image: './assets/performance_qa.png',
      description: 'Stress test your infrastructure under simulated heavy loads to identify memory leaks, DB bottlenecks, and latency spikes.',
      technologies: ['JMeter', 'Load Testing', 'K6', 'Locust', 'Stress Testing', 'Latency Metrics'],
      features: [
        'High Concurrent User Traffic Simulation',
        'Response Time & Throughput Benchmark Analysis',
        'Database Query & Server Bottleneck Isolation',
        'Scalability & Break-Point Endurance Testing'
      ]
    },
    {
      id: 'security-testing',
      title: 'Security Testing',
      image: './assets/security_qa.png',
      description: 'Proactive vulnerability assessments to safeguard customer data, prevent unauthorized access, and ensure compliance.',
      technologies: ['OWASP Top 10', 'Penetration Audits', 'OWASP ZAP', 'Vulnerability Scans', 'XSS & SQLi'],
      features: [
        'OWASP Top 10 Web Application Vulnerability Scans',
        'Authentication & Authorization Bypass Audits',
        'SQL Injection & XSS Vulnerability Verification',
        'Data Encryption & SSL/TLS Configuration Check'
      ]
    }
  ];

  const handleRequest = (serviceTitle) => {
    onSelectService(serviceTitle);
    setActivePage('contact');
  };

  return (
    <div style={{ padding: '60px 0 100px' }}>
      <div className="container">
        <div className="section-header">
          <div className="badge-pill">Services & Expertise</div>
          <h1 className="section-title">End-to-End <span className="gradient-text">QA Solutions</span></h1>
          <p className="section-desc">
            Explore our specialized testing modules designed to ensure bulletproof software quality at every stage of your software development lifecycle.
          </p>
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
          {servicesList.map((svc) => (
            <div key={svc.id} className="glass-panel service-detail-card">
              <img 
                src={svc.image} 
                alt={svc.title} 
                className="service-card-img"
                onError={(e) => {
                  // Fallback visual background if image asset is loading
                  e.target.style.display = 'none';
                }}
              />
              <div className="service-card-body">
                <h2 className="service-title">{svc.title}</h2>
                <p className="service-desc">{svc.description}</p>

                <div className="tech-tags">
                  {svc.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-pill">{tech}</span>
                  ))}
                </div>

                <ul className="feature-list">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="feature-item">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => handleRequest(svc.title)}
                >
                  <span>Request {svc.title}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
