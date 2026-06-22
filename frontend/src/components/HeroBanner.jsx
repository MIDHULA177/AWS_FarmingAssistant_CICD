import { useState, useEffect } from 'react';
import styles from '../styles/HeroBanner.module.css';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200', title: 'Smart Farming Solutions', text: 'AI-powered assistance for Kerala farmers' },
    { image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200', title: 'Weather Forecasting', text: 'Real-time weather updates for better planning' },
    { image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200', title: 'Crop Management', text: 'Seasonal crop recommendations and tips' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.overlay}>
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
          </div>
        </div>
      ))}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === currentSlide ? styles.activeDot : ''}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
