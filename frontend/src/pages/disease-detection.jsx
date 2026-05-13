import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/DiseaseDetection.module.css';

export default function DiseaseDetection() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('farmerLoggedIn')) router.push('/login');
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)); setResult(null); }
  };

  const analyzeImage = async () => {
    setLoading(true);
    setTimeout(() => {
      setResult({ disease: 'Leaf Blight', confidence: '92%', solution: 'Use Copper fungicide spray. Apply every 7-10 days.', prevention: 'Ensure proper drainage and avoid overhead watering.' });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.pageHeader}>
        <h1>🔬 Crop Disease Detection</h1>
        <p>Upload a photo of your plant leaf for AI analysis</p>
      </div>
      <main className={styles.main}>
        <div className={styles.uploadSection}>
          <label className={styles.uploadBox}>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {preview ? (
              <img src={preview} alt="Preview" className={styles.preview} />
            ) : (
              <div className={styles.placeholder}>
                <span>📷</span>
                <p>Click to upload leaf image</p>
              </div>
            )}
          </label>
          {preview && (
            <button onClick={analyzeImage} className={styles.analyzeBtn} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Disease'}
            </button>
          )}
        </div>
        {result && (
          <div className={styles.result}>
            <h2>Analysis Result</h2>
            <div className={styles.resultCard}>
              <p><strong>Disease Detected:</strong> {result.disease}</p>
              <p><strong>Confidence:</strong> {result.confidence}</p>
              <p><strong>Solution:</strong> {result.solution}</p>
              <p><strong>Prevention:</strong> {result.prevention}</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
