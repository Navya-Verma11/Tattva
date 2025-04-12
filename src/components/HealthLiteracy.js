// src/components/HealthLiteracy.js
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/HealthLiteracy.module.css';

const categories = [
  { id: 'pre-visit', name: 'Before You Visit', icon: 'mdi:calendar-check' },
  { id: 'first-aid', name: 'First Aid Tips', icon: 'mdi:first-aid-kit' },
  { id: 'vaccine', name: 'Vaccine Info', icon: 'mdi:needle' },
  { id: 'womens-health', name: 'Women’s Health', icon: 'mdi:gender-female' }
];

const articles = {
  'pre-visit': [
    {
      title: '10 Questions to Ask Your Doctor',
      content: 'Prepare for your appointment with this essential checklist...',
      downloadLink: '#'
    },
    {
      title: 'Understanding Medical Tests',
      content: 'Complete guide to common diagnostic procedures...',
      downloadLink: '#'
    }
  ],
  'first-aid': [
    {
      title: 'Heart Attack First Response',
      content: 'Critical steps while waiting for ambulance...',
      downloadLink: '#'
    }
  ],
  'vaccine': [
    {
      title: 'Adult Vaccination Schedule',
      content: 'Recommended immunizations for Indian adults...',
      downloadLink: '#'
    }
  ],
  'womens-health': [
    {
      title: 'Breast Cancer Screening Guide',
      content: 'Early detection methods and prevention...',
      downloadLink: '#'
    }
  ]
};

export default function HealthLiteracy() {
  const [selectedCategory, setSelectedCategory] = useState('pre-visit');
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Icon icon="mdi:book-education" /> Health Literacy Hub
      </h2>

      {/* Category Filter */}
      <div className={styles.categoryFilter}>
        {categories.map(category => (
          <motion.button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon={category.icon} className={styles.categoryIcon} />
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Articles Grid */}
      <motion.div layout className={styles.articlesGrid}>
        <AnimatePresence mode='wait'>
          {articles[selectedCategory].map((article, index) => (
            <motion.div
              key={index}
              className={styles.articleCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedArticle(article)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardPattern} />
                <Icon icon="mdi:book-open" className={styles.cardIcon} />
              </div>
              <div className={styles.cardContent}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <button className={styles.readMoreButton}>
                  Read More <Icon icon="mdi:arrow-right" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedArticle(null)}
              >
                <Icon icon="mdi:close" />
              </button>
              
              <h2>{selectedArticle.title}</h2>
              <div className={styles.modalBody}>
                <p>{selectedArticle.content}</p>
                <div className={styles.downloadSection}>
                  <Icon icon="mdi:file-download" className={styles.downloadIcon} />
                  <button className={styles.downloadButton}>
                    Download Infographic (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}