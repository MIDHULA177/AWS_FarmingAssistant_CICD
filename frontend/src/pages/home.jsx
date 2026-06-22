import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import styles from '../styles/Home.module.css';

const features = [
  { href: '/weather', icon: '🌤️', title: 'Weather Forecast', desc: 'Rain alerts, temperature & humidity' },
  { href: '/crops', icon: '🌾', title: 'Crop Advisory', desc: 'Seasonal crop recommendations' },
  { href: '/disease-detection', icon: '🔬', title: 'Disease Detection', desc: 'AI-powered leaf analysis' },
  { href: '/pesticides', icon: '🧪', title: 'Fertilizer Guide', desc: 'Pesticides & fertilizer recommendations' },
  { href: '/market-prices', icon: '💰', title: 'Market Prices', desc: 'Real-time crop prices' },
  { href: '/schemes', icon: '🏛️', title: 'Govt Schemes', desc: 'Subsidies, insurance & loans' },
  { href: '/ai-assistant', icon: '🤖', title: 'AI Chat Assistant', desc: '24/7 farming guidance in Malayalam' },
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('farmerLoggedIn')) router.push('/login');
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <HeroBanner />
      <main className={styles.main}>
        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2>KrishiAI Services</h2>
            <p>Everything a Kerala farmer needs, in one place</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map(({ href, icon, title, desc }) => (
              <div key={href} className={styles.featureCard} onClick={() => router.push(href)}>
                <div className={styles.iconWrap}>
                  <span className={styles.icon}>{icon}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
