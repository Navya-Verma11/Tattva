import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import SymptomChecker from './components/SymptomChecker';
import SymptomsAwareness from './components/SymptomsAwareness';
import Homepage from './components/Homepage';
import HealthLiteracy from './components/HealthLiteracy';
import CostEstimator from './components/CostEstimator';
import HealthFunds from './components/HealthFunds';
import RaiseYourVoice from './components/RaiseYourVoice';
import Telemedicine from './components/Telemedicine'; // Add the import for Telemedicine

import styles from './styles/App.module.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className={styles.app}>
          <Navbar />
          <main className={styles.mainContent}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <motion.div
                      key="/"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Homepage />
                    </motion.div>
                  }
                />
                <Route
                  path="/symptom-checker"
                  element={
                    <motion.div
                      key="/symptom-checker"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SymptomChecker />
                    </motion.div>
                  }
                />
                <Route
                  path="/awareness"
                  element={
                    <motion.div
                      key="/awareness"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <SymptomsAwareness />
                    </motion.div>
                  }
                />
                <Route
                  path="/literacy-hub"
                  element={
                    <motion.div
                      key="/literacy-hub"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <HealthLiteracy />
                    </motion.div>
                  }
                />
                <Route
                  path="/cost-estimator"
                  element={
                    <motion.div
                      key="/cost-estimator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CostEstimator />
                    </motion.div>
                  }
                />
                <Route
                  path="/funding"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <HealthFunds />
                    </motion.div>
                  }
                />
                <Route
                  path="/grievance"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <RaiseYourVoice />
                    </motion.div>
                  }
                />
                {/* New route for Telemedicine */}
                <Route
                  path="/telemedicine"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Telemedicine />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
