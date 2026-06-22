import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Schemes.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const schemesData = [
  { id: 1, name: 'PM-KISAN', icon: '💰', type: 'Subsidy', description: 'Direct income support to farmers', benefit: '₹6000 per year in 3 installments', eligibility: 'All landholding farmers' },
  { id: 2, name: 'PM Fasal Bima Yojana', icon: '🛡️', type: 'Insurance', description: 'Crop insurance scheme against natural calamities', benefit: 'Coverage against crop loss', eligibility: 'All farmers growing notified crops' },
  { id: 3, name: 'Kerala Agriculture Subsidy', icon: '🚜', type: 'Subsidy', description: 'State subsidy for farming equipment and tools', benefit: 'Up to 50% subsidy on equipment', eligibility: 'Small and marginal farmers' },
  { id: 4, name: 'Kisan Credit Card', icon: '💳', type: 'Loan', description: 'Short-term credit facility for farming needs', benefit: 'Low interest loans up to ₹3 lakhs', eligibility: 'All farmers with land records' },
];

const badgeColors = {
  Subsidy: { bg: '#e8f5e9', color: '#2d5016' },
  Insurance: { bg: '#e3f2fd', color: '#1565c0' },
  Loan: { bg: '#fff3e0', color: '#e65100' },
};

export default function GovernmentSchemes() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('farmerLoggedIn')) router.push('/login');
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.pageHeader}>
        <h1>🏛️ Government Schemes</h1>
        <p>Subsidies, Insurance & Loans for Kerala Farmers</p>
      </div>
      <main className={styles.main}>
        <div className={styles.schemeGrid}>
          {schemesData.map((scheme) => {
            const colors = badgeColors[scheme.type] || { bg: '#f5f5f5', color: '#333' };
            return (
              <div key={scheme.id} className={styles.schemeCard}>
                <div className={styles.cardTop}>
                  <span className={styles.schemeIcon}>{scheme.icon}</span>
                  <span className={styles.badge} style={{ background: colors.bg, color: colors.color }}>{scheme.type}</span>
                </div>
                <h3>{scheme.name}</h3>
                <p className={styles.description}>{scheme.description}</p>
                <div className={styles.infoRow}>
                  <div className={styles.infoBox}>
                    <small>Benefit</small>
                    <p>{scheme.benefit}</p>
                  </div>
                  <div className={styles.infoBox}>
                    <small>Eligibility</small>
                    <p>{scheme.eligibility}</p>
                  </div>
                </div>
                <button className={styles.applyBtn}>Apply Now →</button>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
