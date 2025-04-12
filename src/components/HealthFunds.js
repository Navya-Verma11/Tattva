// src/components/HealthFunds.js
import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from '../styles/HealthFunds.module.css';

const verifiedNGOs = [
  {
    name: 'Hemkunt Foundation',
    focus: 'Medical Emergency Support',
    link: 'https://hemkuntfoundation.com',
    logo: 'mdi:charity'
  },
  {
    name: 'Milaap',
    focus: 'Medical Crowdfunding',
    link: 'https://milaap.org',
    logo: 'mdi:hand-heart'
  },
  {
    name: 'GiveIndia',
    focus: 'Healthcare Initiatives',
    link: 'https://www.giveindia.org',
    logo: 'mdi:heart-plus'
  }
];

const grantSteps = [
  { step: 1, title: 'Document Preparation', content: 'Collect medical reports, income proof, and ID documents' },
  { step: 2, title: 'Scheme Selection', content: 'Choose appropriate government/private funding scheme' },
  { step: 3, title: 'Application Submission', content: 'Submit through official portals or verified NGOs' }
];

export default function HealthFunds() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    medicalNeed: '',
    amountNeeded: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In real implementation, this would connect to backend
    setFormData({ name: '', email: '', medicalNeed: '', amountNeeded: '' });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Icon icon="mdi:hand-heart-outline" /> Health Funding Assistance
      </h2>

      {/* Case Submission Form */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Submit Your Case for Assistance</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Medical Need</label>
              <textarea
                value={formData.medicalNeed}
                onChange={(e) => setFormData({...formData, medicalNeed: e.target.value})}
                rows="3"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Amount Needed (₹)</label>
              <input
                type="number"
                value={formData.amountNeeded}
                onChange={(e) => setFormData({...formData, amountNeeded: e.target.value})}
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            <Icon icon="mdi:send-check" /> Submit for Assistance
          </button>
        </form>

        {submitted && (
          <div className={styles.successMessage}>
            <Icon icon="mdi:check-circle" />
            Your case has been submitted successfully. Our partners will contact you shortly.
          </div>
        )}
      </div>

      {/* Verified NGOs Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Verified Funding Partners</h3>
        <div className={styles.ngoGrid}>
          {verifiedNGOs.map((ngo, index) => (
            <a 
              key={index} 
              href={ngo.link} 
              className={styles.ngoCard}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Icon icon={ngo.logo} className={styles.ngoLogo} />
              <div className={styles.ngoInfo}>
                <h4>{ngo.name}</h4>
                <p>{ngo.focus}</p>
              </div>
              <Icon icon="mdi:open-in-new" className={styles.externalIcon} />
            </a>
          ))}
        </div>
      </div>

      {/* Grant Application Steps */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Grant Application Process</h3>
        <div className={styles.stepsContainer}>
          {grantSteps.map((step) => (
            <div key={step.step} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.step}</div>
              <h4>{step.title}</h4>
              <p>{step.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scam Awareness */}
      <div className={styles.scamAlert}>
        <Icon icon="mdi:alert-octagon" className={styles.alertIcon} />
        <div>
          <h4>Avoid Funding Scams</h4>
          <ul>
            <li>Never share bank details over unknown calls</li>
            <li>Verify NGO registration at <a href="https://ngodarpan.gov.in" target="_blank" rel="noopener">NGO Darpan</a></li>
            <li>Check for official website HTTPS security</li>
          </ul>
        </div>
      </div>
    </div>
  );
}