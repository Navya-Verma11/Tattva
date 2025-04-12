// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`${styles.navbar} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.logoContainer}>
        <Icon icon="healthicons:hospital" className={styles.logo} />
        <Link to="/" className={styles.logoText}>Tattva</Link>
      </div>

      <div className={styles.navLinks}>
        <Link to="/symptom-checker" className={styles.link}>
          <Icon icon="mdi:stethoscope" /> Symptom Checker
        </Link>

<Link to="/awareness" className={styles.link}>
  <Icon icon="mdi:alert-circle" /> Diagnosis Guide
</Link>
<Link to="/literacy-hub" className={styles.link}>
  <Icon icon="mdi:book-education" /> Health Literacy
</Link>
        <Link to="/cost-estimator" className={styles.link}>
          <Icon icon="mdi:calculator" /> Cost Estimator
        </Link>
        <Link to="/funding" className={styles.link}>
  <Icon icon="mdi:hand-heart" /> Funding
</Link>
      </div>

     

      <div className={styles.themeToggle}>
        <button onClick={toggleTheme} className={styles.toggleButton}>
          <Icon icon={isDarkMode ? 'mdi:weather-sunny' : 'mdi:weather-night'} />
        </button>
      </div>
    </nav>
  );
}