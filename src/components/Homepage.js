// src/components/Homepage.js
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import styles from '../styles/Homepage.module.css';

export default function Homepage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1 className={styles.heroTitle}>
            <span className={styles.logo}>Tattva</span>
            <span className={styles.subtitle}>Your Health Navigation Partner</span>
          </h1>

          {/* Stats Section with Intersection Observer + CountUp */}
          <div ref={ref} className={styles.statsContainer}>
            <div className={styles.statCard}>
              <Icon icon="mdi:hospital" className={styles.statIcon} />
              <div>
                <span className={styles.statNumber}>
                  {inView && <CountUp end={5000} duration={2} />}+
                </span>
                <span className={styles.statLabel}>Healthcare Partners</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <Icon icon="mdi:account-group" className={styles.statIcon} />
              <div>
                <span className={styles.statNumber}>
                  {inView && <CountUp end={1000000} duration={2} />}+
                </span>
                <span className={styles.statLabel}>Users Served</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className={styles.scrollIndicator}>
          <Icon icon="mdi:mouse" className={styles.scrollIcon} />
          <span>Scroll to Explore</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection} id="features">
        <h2 className={styles.sectionTitle}>How We Help You</h2>

        <div className={styles.featuresGrid}>
          <motion.div whileHover={{ scale: 1.05 }} className={styles.featureCard}>
            <Icon icon="mdi:stethoscope" className={styles.featureIcon} />
            <h3>Symptom Navigator</h3>
            <p>Find the right specialist and nearby facilities based on your symptoms</p>
            <Link to="/symptom-checker" className={styles.featureCta}>
              Check Now <Icon icon="mdi:arrow-right" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className={styles.featureCard}>
            <Icon icon="mdi:currency-inr" className={styles.featureIcon} />
            <h3>Cost Estimator</h3>
            <p>Calculate treatment costs and find financial assistance options</p>
            <Link to="/cost-estimator" className={styles.featureCta}>
              Estimate Now <Icon icon="mdi:arrow-right" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className={styles.featureCard}>
            <Icon icon="mdi:book-education" className={styles.featureIcon} />
            <h3>Health Literacy</h3>
            <p>Essential health education resources at your fingertips</p>
            <Link to="/literacy-hub" className={styles.featureCta}>
              Learn More <Icon icon="mdi:arrow-right" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
