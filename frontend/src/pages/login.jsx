import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Login.module.css';

function Popup({ message, type, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '32px 40px',
        textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', minWidth: '280px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>
          {type === 'success' ? '✅' : '❌'}
        </div>
        <p style={{ fontSize: '18px', fontWeight: '600', color: type === 'success' ? '#2e7d32' : '#c62828', marginBottom: '20px' }}>
          {message}
        </p>
        <button onClick={onClose} style={{
          padding: '10px 28px', background: type === 'success' ? '#4caf50' : '#e53935',
          color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px'
        }}>OK</button>
      </div>
    </div>
  );
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [popup, setPopup] = useState(null); // { message, type }
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${endpoint}`, payload);
      if (!isLogin) {
        setPopup({ message: 'Signed up successfully!', type: 'success', next: 'switchLogin' });
        return;
      }
      localStorage.setItem('farmerLoggedIn', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/home');
    } catch (err) {
      setPopup({ message: err.response?.data?.error || 'Something went wrong', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    if (popup?.next === 'switchLogin') {
      setIsLogin(true);
      setFormData({ email: '', password: '', name: '' });
    }
    setPopup(null);
  };

  return (
    <>
      {popup && <Popup message={popup.message} type={popup.type} onClose={handlePopupClose} />}
      <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.slideContent}>
          <h1>കേരള കർഷക സഹായി</h1>
          <p className={styles.malayalamMeaning}>Kerala Farmer Assistant</p>
          <h2>Empowering Farmers with AI</h2>
          <div className={styles.feature}><span>🌾</span><span>Smart Farming Solutions</span></div>
          <div className={styles.feature}><span>🌤️</span><span>Real-time Weather Updates</span></div>
          <div className={styles.feature}><span>🔬</span><span>AI Disease Detection</span></div>
          <div className={styles.feature}><span>🤖</span><span>24/7 AI Assistant</span></div>
        </div>
      </div>
      
      <div className={styles.rightPanel}>
        <div className={`${styles.formContainer} ${!isLogin ? styles.slideRight : ''}`}>
          <h2>{isLogin ? 'Welcome Back 👋' : 'Create Account'}</h2>
          <p className={styles.subtitle}>{isLogin ? 'Sign in to your farmer account' : 'Join Kerala Farmer Assistant'}</p>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <button type="submit" disabled={loading}>{loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}</button>
          </form>
          <p className={styles.toggle}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
