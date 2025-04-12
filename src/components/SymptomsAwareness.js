// src/components/SymptomsAwareness.js
import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from '../styles/SymptomsAwareness.module.css';

const awarenessData = [
  {
    symptom: "Persistent Headache",
    icon: "mdi:head",
    cases: [
      {
        title: "Case Study: Migraine vs. Hypertension",
        content: "A 32-year-old assumed it was stress headaches. Actual diagnosis: Stage 2 hypertension needing immediate care.",
        consequence: "Delayed treatment led to kidney damage"
      }
    ]
  },
  {
    symptom: "Chest Pain",
    icon: "mdi:heart",
    cases: [
      {
        title: "Case Study: Heartburn vs. Angina",
        content: "A 45-year-old self-medicated with antacids. Later diagnosed with coronary artery disease requiring stent placement.",
        consequence: "Risk of heart attack increased by delayed care"
      }
    ]
  }
];

export default function SymptomsAwareness() {
  const [activeCase, setActiveCase] = useState(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Icon icon="mdi:alert-octagon" /> Why Professional Diagnosis Matters
      </h2>
      
      <div className={styles.grid}>
        {awarenessData.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <Icon icon={item.icon} className={styles.cardIcon} />
              <h3>{item.symptom}</h3>
              <span className={styles.warningTag}>
                <Icon icon="mdi:alert" /> Avoid Self-Diagnosis
              </span>
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.cardText}>
                Common misdiagnosis pitfalls and why professional consultation is crucial...
              </p>
              
              <button 
                className={styles.caseButton}
                onClick={() => setActiveCase(item.cases[0])}
              >
                <Icon icon="mdi:chart-box" /> Real Case Study
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeCase && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button 
              className={styles.closeButton}
              onClick={() => setActiveCase(null)}
            >
              <Icon icon="mdi:close" />
            </button>
            
            <h3 className={styles.modalTitle}>{activeCase.title}</h3>
            <p className={styles.modalText}>{activeCase.content}</p>
            <div className={styles.consequenceBox}>
              <Icon icon="mdi:alert-circle" />
              <strong>Consequence: </strong>{activeCase.consequence}
            </div>
            
            <div className={styles.consultBox}>
              <Icon icon="mdi:doctor" className={styles.doctorIcon} />
              <div>
                <h4>Always Consult:</h4>
                <p>Book an appointment with a certified {activeCase.title.includes('Heart') ? 'Cardiologist' : 'General Physician'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}