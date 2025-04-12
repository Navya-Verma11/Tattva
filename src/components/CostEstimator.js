// src/components/CostEstimator.js
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Select from 'react-select';
import styles from '../styles/CostEstimator.module.css';

// Mock data for Indian healthcare costs (in INR)
const treatmentData = {
  'Angioplasty': {
    Govt: 150000,
    Private: 350000,
    Clinic: 120000
  },
  'Cataract Surgery': {
    Govt: 15000,
    Private: 50000,
    Clinic: 10000
  },
  'Normal Delivery': {
    Govt: 10000,
    Private: 75000,
    Clinic: 5000
  }
};

const cityRates = {
  Mumbai: 1.4,
  Delhi: 1.3,
  Bangalore: 1.25,
  Chennai: 1.2,
  Kolkata: 1.15
};

const governmentSchemes = [
  { 
    name: 'Ayushman Bharat Yojana', 
    coverage: '₹5 lakh/year per family',
    eligibility: 'Income < ₹5 lakh/year'
  },
  {
    name: 'PMJAY',
    coverage: 'Secondary & tertiary care',
    eligibility: 'Based on SECC data'
  }
];

export default function CostEstimator() {
  const [formData, setFormData] = useState({
    treatment: '',
    location: '',
    hospitalType: ''
  });
  const [estimate, setEstimate] = useState(null);

  const treatmentOptions = Object.keys(treatmentData).map(t => ({
    value: t,
    label: t
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.treatment || !formData.location || !formData.hospitalType) return;

    const baseCost = treatmentData[formData.treatment][formData.hospitalType];
    const cityMultiplier = cityRates[formData.location] || 1;
    const calculatedCost = baseCost * cityMultiplier;

    setEstimate({
      cost: calculatedCost,
      schemes: governmentSchemes,
      hospitalType: formData.hospitalType,
      location: formData.location
    });
  };

  const chartData = estimate && Object.entries(treatmentData[formData.treatment]).map(([type, cost]) => ({
    type,
    cost: cost * cityRates[formData.location] || 1
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Icon icon="mdi:calculator" /> Treatment Cost Estimator
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>
            <Icon icon="mdi:hospital-box" /> Treatment Type
            <Select
              options={treatmentOptions}
              onChange={(option) => setFormData({...formData, treatment: option.value})}
              placeholder="Select treatment..."
              className={styles.select}
            />
          </label>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>
              <Icon icon="mdi:map-marker" /> City
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                <option value="">Select city</option>
                {Object.keys(cityRates).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label>
              <Icon icon="mdi:hospital-building" /> Hospital Type
              <select
                value={formData.hospitalType}
                onChange={(e) => setFormData({...formData, hospitalType: e.target.value})}
              >
                <option value="">Select type</option>
                <option value="Govt">Government Hospital</option>
                <option value="Private">Private Hospital</option>
                <option value="Clinic">Clinic</option>
              </select>
            </label>
          </div>
        </div>

        <button type="submit" className={styles.calculateButton}>
          <Icon icon="mdi:calculator-variant" /> Calculate Estimate
        </button>
      </form>

      {estimate && (
        <div className={styles.results}>
          <div className={styles.costCard}>
            <div className={styles.costBadge}>
              <Icon icon="mdi:currency-inr" />
              <h3>Estimated Cost</h3>
              <div className={styles.amount}>
                ₹{estimate.cost.toLocaleString('en-IN')}
              </div>
              <small>{estimate.hospitalType} Hospital in {estimate.location}</small>
            </div>

            <div className={styles.chartContainer}>
              <h4>Cost Comparison</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar 
                    dataKey="cost" 
                    fill="#38b2ac" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.schemesSection}>
            <h3><Icon icon="mdi:hand-heart" /> Available Government Schemes</h3>
            <div className={styles.schemesGrid}>
              {estimate.schemes.map((scheme, index) => (
                <div key={index} className={styles.schemeCard}>
                  <div className={styles.schemeHeader}>
                    <Icon icon="mdi:shield-check" />
                    <h4>{scheme.name}</h4>
                  </div>
                  <div className={styles.schemeDetails}>
                    <p><strong>Coverage:</strong> {scheme.coverage}</p>
                    <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}