import { useState, useEffect } from 'react';
import styles from '../styles/Crops.module.css';

const cropIcons = { 'Rice (Paddy)': '🌾', 'Coconut': '🥥', 'Tapioca': '🍠', 'Ginger': '🫚', 'Vegetables (Beans, Cabbage)': '🥦', 'Banana': '🍌', 'Turmeric': '🟡', 'Pineapple': '🍍', 'Pepper (Black Gold)': '🌶️', 'Cashew': '🥜', 'Mango': '🥭', 'Watermelon': '🍉' };

const cropsData = {
  monsoon: [
    { id: 1, name: 'Rice (Paddy)', duration: '120-150 days', yield: '4-5 tons/ha', description: "Kerala's staple food crop. Best varieties: Jyothi, Aiswarya, Uma. Requires waterlogged conditions." },
    { id: 2, name: 'Coconut', duration: 'Year-round', yield: '80-100 nuts/tree', description: "Kerala's pride. Varieties: West Coast Tall, Chowghat Orange Dwarf. Thrives in coastal areas." },
    { id: 3, name: 'Tapioca', duration: '8-10 months', yield: '25-30 tons/ha', description: 'Important food crop. Varieties: Sree Visakham, H-226. Drought resistant and easy to grow.' },
    { id: 4, name: 'Ginger', duration: '8-9 months', yield: '15-20 tons/ha', description: 'High value spice crop. Varieties: Maran, Mahima. Requires well-drained soil and shade.' },
  ],
  winter: [
    { id: 5, name: 'Vegetables (Beans, Cabbage)', duration: '60-90 days', yield: '10-15 tons/ha', description: 'Winter vegetables grow well. Beans, cabbage, carrot, beetroot are popular choices.' },
    { id: 6, name: 'Banana', duration: '12-15 months', yield: '25-30 kg/plant', description: 'Popular varieties: Nendran, Robusta, Red Banana. Requires regular irrigation and organic manure.' },
    { id: 7, name: 'Turmeric', duration: '7-9 months', yield: '20-25 tons/ha', description: 'High value spice. Varieties: Alleppey Supreme, Erode Local. Needs well-drained loamy soil.' },
    { id: 8, name: 'Pineapple', duration: '18-24 months', yield: '50-60 tons/ha', description: 'Varieties: Kew, Mauritius. Grows well in laterite soil with good drainage.' },
  ],
  summer: [
    { id: 9, name: 'Pepper (Black Gold)', duration: '3-4 years', yield: '2-3 kg/vine', description: "Kerala's most valuable spice. Varieties: Panniyur-1, Karimunda. Requires support trees and shade." },
    { id: 10, name: 'Cashew', duration: '3 years to bear', yield: '8-10 kg/tree', description: 'Thrives in laterite soil. Varieties: Vengurla-4, Bhaskara. Drought tolerant once established.' },
    { id: 11, name: 'Mango', duration: 'Seasonal fruiting', yield: '100-200 kg/tree', description: 'Popular varieties: Alphonso, Malgova, Neelum. Requires well-drained soil and full sunlight.' },
    { id: 12, name: 'Watermelon', duration: '90-100 days', yield: '25-30 tons/ha', description: 'Summer cash crop. Varieties: Sugar Baby, Arka Manik. Needs sandy loam soil and irrigation.' },
  ],
};

const seasons = [
  { key: 'monsoon', label: 'Monsoon', sub: 'June – Sep', icon: '🌧️' },
  { key: 'winter', label: 'Winter', sub: 'Oct – Jan', icon: '❄️' },
  { key: 'summer', label: 'Summer', sub: 'Feb – May', icon: '☀️' },
];

export default function Crops() {
  const [season, setSeason] = useState('monsoon');

  return (
    <section className={styles.crops}>
      <div className={styles.pageHeader}>
        <h2>🌾 Seasonal Crop Advisory</h2>
        <p>Recommended crops for Kerala farmers by season</p>
      </div>

      <div className={styles.seasonTabs}>
        {seasons.map(({ key, label, sub, icon }) => (
          <button key={key} onClick={() => setSeason(key)} className={season === key ? styles.active : ''}>
            <span className={styles.tabIcon}>{icon}</span>
            <span className={styles.tabLabel}>{label}</span>
            <span className={styles.tabSub}>{sub}</span>
          </button>
        ))}
      </div>

      <div className={styles.cropGrid}>
        {cropsData[season].map((crop) => (
          <div key={crop.id} className={styles.cropCard}>
            <div className={styles.cardTop}>
              <span className={styles.cropIcon}>{cropIcons[crop.name] || '🌱'}</span>
              <h3>{crop.name}</h3>
            </div>
            <div className={styles.badges}>
              <span className={styles.badge}>⏱ {crop.duration}</span>
              <span className={`${styles.badge} ${styles.yieldBadge}`}>📦 {crop.yield}</span>
            </div>
            <p className={styles.desc}>{crop.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
