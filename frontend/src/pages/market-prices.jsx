import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MarketPrices.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pricesData = [
  { id: 1, crop: 'Coconut', price: '35', unit: 'per piece', icon: '🥥', trend: 'up', change: '+₹2', market: 'Thiruvananthapuram' },
  { id: 2, crop: 'Pepper', price: '650', unit: 'per kg', icon: '🌶️', trend: 'up', change: '+₹50', market: 'Kochi' },
  { id: 3, crop: 'Rubber', price: '185', unit: 'per kg', icon: '🌳', trend: 'down', change: '-₹5', market: 'Kottayam' },
  { id: 4, crop: 'Banana', price: '25', unit: 'per dozen', icon: '🍌', trend: 'up', change: '+₹3', market: 'Thrissur' },
  { id: 5, crop: 'Rice', price: '45', unit: 'per kg', icon: '🌾', trend: 'up', change: '+₹2', market: 'Palakkad' },
  { id: 6, crop: 'Cardamom', price: '1200', unit: 'per kg', icon: '🫚', trend: 'down', change: '-₹50', market: 'Idukki' },
];

export default function MarketPrices() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('farmerLoggedIn')) router.push('/login');
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.pageHeader}>
        <h1>💰 Market Price Updates</h1>
        <p>Live crop prices across Kerala mandis</p>
        <span className={styles.updateBadge}>🟢 Updated Today</span>
      </div>
      <main className={styles.main}>
        <div className={styles.priceGrid}>
          {pricesData.map((item) => (
            <div key={item.id} className={`${styles.priceCard} ${item.trend === 'up' ? styles.up : styles.down}`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={`${styles.trendBadge} ${item.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                  {item.trend === 'up' ? '▲' : '▼'} {item.change}
                </span>
              </div>
              <h3>{item.crop}</h3>
              <p className={styles.price}>₹{item.price}</p>
              <p className={styles.unit}>{item.unit}</p>
              <div className={styles.marketRow}>
                <span>📍</span>
                <span>{item.market}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
