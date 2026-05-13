import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3>🌾 Kerala Farmer Assistant</h3>
            <p>Empowering Kerala farmers with AI-powered tools for smarter, more profitable farming.</p>
          </div>
          <div className={styles.col}>
            <h4>Services</h4>
            <ul>
              <li><Link href="/weather">Weather Forecast</Link></li>
              <li><Link href="/crops">Crop Advisory</Link></li>
              <li><Link href="/disease-detection">Disease Detection</Link></li>
              <li><Link href="/market-prices">Market Prices</Link></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/schemes">Govt Schemes</Link></li>
              <li><Link href="/pesticides">Pesticide Guide</Link></li>
              <li><Link href="/ai-assistant">AI Assistant</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 Kerala Farmer Assistant. All rights reserved. | Empowering Kerala Farmers with AI Technology</p>
        </div>
      </div>
    </footer>
  );
}
