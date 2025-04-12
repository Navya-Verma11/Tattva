// src/components/Telemedicine.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from '../styles/Telemedicine.module.css';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Anika Sharma',
    specialization: 'General Physician',
    experience: '12 years',
    fee: '₹500',
    availability: ['09:00 AM', '11:00 AM', '03:00 PM'],
    languages: ['English', 'Hindi', 'Marathi']
  },
  {
    id: 2,
    name: 'Dr. Rajesh Khanna',
    specialization: 'Cardiologist',
    experience: '15 years',
    fee: '₹1500',
    availability: ['10:00 AM', '02:00 PM', '04:00 PM'],
    languages: ['English', 'Hindi']
  },
  {
    id: 3,
    name: 'Dr. Priya Singh',
    specialization: 'Dermatologist',
    experience: '8 years',
    fee: '₹800',
    availability: ['09:30 AM', '01:00 PM', '05:00 PM'],
    languages: ['English', 'Tamil']
  }
];

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('telemedicineUsers')) || [];
    
    if (isLogin) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('telemedicineAuth', JSON.stringify(user));
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } else {
      if (users.some(u => u.email === formData.email)) {
        setError('User already exists');
        return;
      }
      const newUser = { ...formData, id: Date.now() };
      localStorage.setItem('telemedicineUsers', JSON.stringify([...users, newUser]));
      localStorage.setItem('telemedicineAuth', JSON.stringify(newUser));
      onLogin();
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <Icon icon="mdi:doctor" className={styles.authLogo} />
        <h2>{isLogin ? 'Patient Login' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <Icon icon="mdi:email" />
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <Icon icon="mdi:lock" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.authButton}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button 
          className={styles.toggleAuth}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'New user? Create account' : 'Existing user? Login'}
        </button>
      </div>
    </div>
  );
};

const ConsultFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    // In real app, integrate payment gateway here
    setIsPaid(true);
    setStep(5);
  };

  return (
    <div className={styles.container}>
      {!isPaid ? (
        <>
          <div className={styles.flowSteps}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
              <Icon icon="mdi:doctor" /> Choose Doctor
            </div>
            <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
              <Icon icon="mdi:clock" /> Select Time
            </div>
            <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
              <Icon icon="mdi:text-box" /> Describe Issue
            </div>
          </div>

          {step === 1 && (
            <div className={styles.doctorSelection}>
              <h2>Select Specialist</h2>
              <div className={styles.doctorGrid}>
                {doctorsData.map(doctor => (
                  <div 
                    key={doctor.id}
                    className={`${styles.doctorCard} ${selectedDoctor?.id === doctor.id ? styles.selected : ''}`}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setStep(2);
                    }}
                  >
                    <div className={styles.doctorHeader}>
                      <Icon icon="mdi:doctor" className={styles.doctorIcon} />
                      <h3>{doctor.specialization}</h3>
                      <div className={styles.fee}>{doctor.fee}</div>
                    </div>
                    <div className={styles.doctorDetails}>
                      <p>Average Consultation Fee: {doctor.fee}</p>
                      <p>Experience: {doctor.experience}</p>
                      <div className={styles.languages}>
                        {doctor.languages.map(lang => (
                          <span key={lang}>{lang}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && selectedDoctor && (
            <div className={styles.timeSelection}>
              <h2>Select Time Slot</h2>
              <div className={styles.timeGrid}>
                {selectedDoctor.availability.map(slot => (
                  <button
                    key={slot}
                    className={`${styles.timeSlot} ${selectedSlot === slot ? styles.selected : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div className={styles.navigationButtons}>
                <button onClick={() => setStep(1)}>
                  <Icon icon="mdi:arrow-left" /> Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!selectedSlot}
                >
                  Next <Icon icon="mdi:arrow-right" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.problemDescription}>
              <h2>Describe Your Health Concern</h2>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Please describe your symptoms, medical history, and any specific concerns..."
                rows="8"
              />
              <div className={styles.navigationButtons}>
                <button onClick={() => setStep(2)}>
                  <Icon icon="mdi:arrow-left" /> Back
                </button>
                <button 
                  onClick={handleBookConsultation}
                  disabled={problemDescription.length < 20}
                >
                  Confirm & Pay ₹{selectedDoctor.fee.slice(1)}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.consultationInterface}>
          <div className={styles.doctorProfile}>
            <img src="https://via.placeholder.com/150" alt="Doctor" />
            <h2>{selectedDoctor.name}</h2>
            <p>{selectedDoctor.specialization}</p>
            <div className={styles.consultDetails}>
              <p><Icon icon="mdi:clock" /> {selectedSlot}</p>
              <p><Icon icon="mdi:currency-inr" /> {selectedDoctor.fee} Paid</p>
            </div>
          </div>

          <div className={styles.videoSection}>
            <div className={styles.videoPlaceholder}>
              <Icon icon="mdi:video" className={styles.videoIcon} />
              <p>Your consultation will start shortly</p>
              <div className={styles.consultTips}>
                <p><Icon icon="mdi:lightbulb" /> Have your medical reports ready</p>
                <p><Icon icon="mdi:clock-alert" /> Consultation duration: 15 mins</p>
              </div>
            </div>
            
            <div className={styles.chatSection}>
              <div className={styles.chatMessages}>
                <div className={styles.systemMessage}>
                  <Icon icon="mdi:robot" /> 
                  <p>Dr. {selectedDoctor.name} is reviewing your case description...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Telemedicine() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('telemedicineAuth');
    setIsLoggedIn(!!auth);
  }, []);

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <header className={styles.header}>
            <button 
              className={styles.logoutButton}
              onClick={() => {
                localStorage.removeItem('telemedicineAuth');
                navigate('/');
              }}
            >
              <Icon icon="mdi:logout" /> Logout
            </button>
          </header>
          <ConsultFlow />
        </>
      ) : (
        <LoginSignup onLogin={() => {
          setIsLoggedIn(true);
          navigate('/telemedicine');
        }} />
      )}
    </div>
  );
}