// src/components/SymptomChecker.js
import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from '../styles/SymptomChecker.module.css';

// Dummy data for Indian locations
const dummySpecializations = {
  'chest pain': 'Cardiologist',
  'headache': 'General Physician',
  'skin rash': 'Dermatologist',
  'fever': 'General Physician',
  'stomach ache': 'Gastroenterologist'
};

const dummyResources = {
  'Cardiologist': [
    { name: 'Apollo Hospital', type: 'hospital', distance: '2 km' },
    { name: 'Fortis Hospital', type: 'hospital', distance: '5 km' },
    { name: 'MedPlus Pharmacy', type: 'pharmacy', distance: '1 km' }
  ],
  'General Physician': [
    { name: 'City Clinic', type: 'clinic', distance: '0.5 km' },
    { name: '24x7 Pharmacy', type: 'pharmacy', distance: '0.2 km' }
  ]
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState(null);

  const handleCheck = () => {
    const specialization = dummySpecializations[symptoms.toLowerCase()] || 'General Physician';
    const resources = dummyResources[specialization] || [];
    
    setResults({
      specialization,
      resources
    });
  };

  return (
    <div className={styles.container}>
      <h2>Symptom-Based Resource Navigator</h2>
      <div className={styles.inputSection}>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms (e.g., chest pain, headache)"
          rows="4"
        />
        <button onClick={handleCheck} className={styles.checkButton}>
          <Icon icon="mdi:stethoscope" /> Find Help
        </button>
      </div>

      {results && (
        <div className={styles.results}>
          <h3>Recommended Specialist: {results.specialization}</h3>
          
          <div className={styles.resourceList}>
            <h4>Nearby Resources:</h4>
            {results.resources.map((resource, index) => (
              <div key={index} className={styles.resourceCard}>
                <Icon icon={resource.type === 'hospital' ? 'mdi:hospital' : 'mdi:pharmacy'} />
                <div>
                  <h5>{resource.name}</h5>
                  <p>{resource.distance} away</p>
                </div>
              </div>
            ))}
          </div>

          {results.resources.length === 0 && (
            <div className={styles.noResources}>
              <p>No nearby resources found</p>
              <a href="/telemedicine" className={styles.emergencyButton}>
                <Icon icon="mdi:video" /> Connect to Telemedicine
              </a>
            </div>
          )}
        </div>
      )}

      <div className={styles.disclaimer}>
        <Icon icon="mdi:alert" /> This is not a diagnostic tool. Always consult a medical professional.
      </div>
    </div>
  );
}

<a href="/telemedicine" className={styles.emergencyButton}>
  <Icon icon="mdi:video" /> Connect to Telemedicine
</a>