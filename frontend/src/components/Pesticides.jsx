import { useState, useEffect } from 'react';
import styles from '../styles/Pesticides.module.css';

const typeColors = {
  'Organic Pesticide': { bg: '#e8f5e9', color: '#2d5016' },
  'Fungicide': { bg: '#e3f2fd', color: '#1565c0' },
  'Bio-fungicide': { bg: '#f3e5f5', color: '#6a1b9a' },
  'Bio-pesticide': { bg: '#e0f7fa', color: '#00695c' },
  'Organic Growth Promoter': { bg: '#fff8e1', color: '#f57f17' },
  'Nitrogen Fertilizer': { bg: '#e8f5e9', color: '#2d5016' },
  'Phosphorus Fertilizer': { bg: '#fff3e0', color: '#e65100' },
  'Potassium Fertilizer': { bg: '#fce4ec', color: '#880e4f' },
  'Organic Fertilizer': { bg: '#f1f8e9', color: '#33691e' },
  'Complex Fertilizer': { bg: '#e8eaf6', color: '#283593' },
  'Organic Phosphorus': { bg: '#fff8e1', color: '#f57f17' },
  'Organic Fertilizer + Pesticide': { bg: '#e0f2f1', color: '#004d40' },
};

const data = {
  pesticides: [
    { id: 1, name: 'Neem Oil', icon: '🌿', type: 'Organic Pesticide', usage: 'Aphids, Whiteflies, Mites', dosage: '5ml/liter water', description: 'Natural pesticide from neem seeds. Safe for beneficial insects. Spray early morning or evening.' },
    { id: 2, name: 'Bordeaux Mixture', icon: '🔵', type: 'Fungicide', usage: 'Fungal diseases in coconut, pepper', dosage: '1% solution (10g/liter)', description: 'Copper-based fungicide. Controls leaf spot, blight. Apply before monsoon.' },
    { id: 3, name: 'Trichoderma', icon: '🦠', type: 'Bio-fungicide', usage: 'Root rot, wilt diseases', dosage: '5g/liter for soil drench', description: 'Biological control agent. Protects roots from fungal attack. Mix with organic manure.' },
    { id: 4, name: 'Bacillus thuringiensis', icon: '🧫', type: 'Bio-pesticide', usage: 'Caterpillars, leaf eaters', dosage: '1-2g/liter water', description: 'Bacterial pesticide. Controls diamond back moth, fruit borers. Safe for humans and animals.' },
    { id: 5, name: 'Pseudomonas', icon: '🔬', type: 'Bio-fungicide', usage: 'Bacterial wilt, root diseases', dosage: '10ml/liter for seedling treatment', description: 'Beneficial bacteria. Protects against soil-borne diseases. Use during transplanting.' },
    { id: 6, name: 'Panchagavya', icon: '🐄', type: 'Organic Growth Promoter', usage: 'Overall plant health', dosage: '30ml/liter as foliar spray', description: 'Traditional Kerala formula. Mix of cow products. Boosts immunity and growth.' },
  ],
  fertilizers: [
    { id: 1, name: 'Urea (46% N)', icon: '🌱', type: 'Nitrogen Fertilizer', usage: 'Leaf growth, green color', dosage: '50-100 kg/hectare', description: 'Quick nitrogen source. Apply in split doses. Best for rice, vegetables during vegetative stage.' },
    { id: 2, name: 'DAP (18-46-0)', icon: '🌿', type: 'Phosphorus Fertilizer', usage: 'Root development, flowering', dosage: '100-150 kg/hectare', description: 'Di-ammonium phosphate. Apply as basal dose before planting. Good for all crops.' },
    { id: 3, name: 'Muriate of Potash', icon: '🍎', type: 'Potassium Fertilizer', usage: 'Fruit quality, disease resistance', dosage: '50-75 kg/hectare', description: 'Essential for coconut, banana, pepper. Improves fruit size and quality. Apply in 2-3 splits.' },
    { id: 4, name: 'Compost', icon: '♻️', type: 'Organic Fertilizer', usage: 'Soil health, all nutrients', dosage: '5-10 tons/hectare', description: 'Decomposed organic matter. Improves soil structure. Apply before planting or as top dressing.' },
    { id: 5, name: 'Vermicompost', icon: '🪱', type: 'Organic Fertilizer', usage: 'Rich in nutrients and microbes', dosage: '2-3 tons/hectare', description: 'Earthworm compost. High quality organic fertilizer. Excellent for vegetables and fruits.' },
    { id: 6, name: 'NPK 19-19-19', icon: '⚗️', type: 'Complex Fertilizer', usage: 'Balanced nutrition', dosage: '200-300 kg/hectare', description: 'All-purpose fertilizer. Contains N, P, K in equal ratio. Good for all crops at all stages.' },
    { id: 7, name: 'Bone Meal', icon: '🦴', type: 'Organic Phosphorus', usage: 'Flowering and fruiting', dosage: '100-200 kg/hectare', description: 'Slow-release phosphorus. Good for fruit trees. Mix with soil during planting.' },
    { id: 8, name: 'Neem Cake', icon: '🌰', type: 'Organic Fertilizer + Pesticide', usage: 'Nutrition + pest control', dosage: '250-500 kg/hectare', description: 'Byproduct of neem oil. Acts as fertilizer and pest repellent. Apply to soil.' },
  ],
};

export default function Pesticides() {
  const [type, setType] = useState('pesticides');

  return (
    <section className={styles.section}>
      <div className={styles.pageHeader}>
        <h2>🧪 Pesticides & Fertilizers Guide</h2>
        <p>Safe and effective solutions for Kerala crops</p>
      </div>

      <div className={styles.tabs}>
        <button onClick={() => setType('pesticides')} className={type === 'pesticides' ? styles.active : ''}>
          <span>🐛</span> Pesticides
        </button>
        <button onClick={() => setType('fertilizers')} className={type === 'fertilizers' ? styles.active : ''}>
          <span>🌱</span> Fertilizers
        </button>
      </div>

      <div className={styles.grid}>
        {data[type].map((item) => {
          const colors = typeColors[item.type] || { bg: '#f5f5f5', color: '#333' };
          return (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.itemIcon}>{item.icon}</span>
                <div>
                  <h3>{item.name}</h3>
                  <span className={styles.typeBadge} style={{ background: colors.bg, color: colors.color }}>{item.type}</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoBox}>
                  <small>Usage</small>
                  <p>{item.usage}</p>
                </div>
                <div className={styles.infoBox}>
                  <small>Dosage</small>
                  <p>{item.dosage}</p>
                </div>
              </div>
              <p className={styles.desc}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
