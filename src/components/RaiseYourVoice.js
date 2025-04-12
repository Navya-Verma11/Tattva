// src/components/RaiseYourVoice.js
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/RaiseYourVoice.module.css';

const issueTypes = [
  'Insurance Denial',
  'Medical Negligence',
  'Billing Dispute',
  'Privacy Violation',
  'Other'
];

export default function RaiseYourVoice() {
  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
    contact: '',
    paidSupport: false
  });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Icon icon="mdi:account-alert" /> Health Rights Advocacy
      </h2>

      <div className={styles.chatContainer}>
        {/* Chat Timeline */}
        <div className={styles.chatTimeline}>
          <div className={`${styles.message} ${styles.system}`}>
            <Icon icon="mdi:robot-happy" />
            <p>Welcome to Tattva Grievance Portal. How can we assist you today?</p>
          </div>

          {step > 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${styles.message} ${styles.user}`}
            >
              <p><strong>Issue Type:</strong> {formData.issueType}</p>
            </motion.div>
          )}
        </div>

        {/* Form Section */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <AnimatePresence mode='wait'>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.formStep}
                >
                  <label>
                    <Icon icon="mdi:alert-circle" /> Type of Issue
                    <select
                      value={formData.issueType}
                      onChange={(e) => {
                        setFormData({...formData, issueType: e.target.value});
                        setStep(2);
                      }}
                      required
                    >
                      <option value="">Select issue type</option>
                      {issueTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.formStep}
                >
                  <label>
                    <Icon icon="mdi:text-box" /> Describe your issue
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="5"
                      placeholder="Provide detailed description including dates, involved parties, and supporting documents..."
                      required
                    />
                  </label>

                  <div className={styles.supportToggle}>
                    <button
                      type="button"
                      className={`${styles.toggleOption} ${!formData.paidSupport ? styles.active : ''}`}
                      onClick={() => setFormData({...formData, paidSupport: false})}
                    >
                      <Icon icon="mdi:account-voice" />
                      Free Community Support
                    </button>
                    <button
                      type="button"
                      className={`${styles.toggleOption} ${formData.paidSupport ? styles.active : ''}`}
                      onClick={() => setFormData({...formData, paidSupport: true})}
                    >
                      <Icon icon="mdi:account-cash" />
                      Paid Legal Assistance (₹1999)
                    </button>
                  </div>

                  {formData.paidSupport && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={styles.paidFeatures}
                    >
                      <div className={styles.featureCard}>
                        <Icon icon="mdi:shield-star" />
                        <h4>Premium Support Includes:</h4>
                        <ul>
                          <li>Legal document preparation</li>
                          <li>Dedicated case manager</li>
                          <li>Official follow-ups</li>
                          <li>Priority resolution</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={styles.backButton}
                    >
                      <Icon icon="mdi:arrow-left" /> Back
                    </button>
                    <button type="submit" className={styles.submitButton}>
                      {formData.paidSupport ? 'Proceed to Payment' : 'Submit Grievance'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <Icon icon="mdi:check-circle" className={styles.successIcon} />
            <h3>Grievance Submitted Successfully!</h3>
            <p>Your case ID: TATTVA-{Math.floor(Math.random() * 100000)}</p>
            
            <div className={styles.nextSteps}>
              {formData.paidSupport ? (
                <>
                  <p>Redirecting to payment gateway...</p>
                  <div className={styles.loadingBar} />
                </>
              ) : (
                <>
                  <p>Our community team will respond within 3 working days</p>
                  <button className={styles.printButton}>
                    <Icon icon="mdi:printer" /> Print Summary
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.legalTips}>
        <Icon icon="mdi:scale-balance" />
        <div>
          <h4>Know Your Rights</h4>
          <ul>
            <li>Right to Emergency Care (Clinical Establishment Act 2010)</li>
            <li>Right to Medical Records (MCI Regulations)</li>
            <li>Right to Informed Consent</li>
          </ul>
        </div>
      </div>
    </div>
  );
}