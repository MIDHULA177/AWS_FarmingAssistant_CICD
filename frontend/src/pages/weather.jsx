import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Weather from '../components/Weather';
import styles from '../styles/Page.module.css';

export default function WeatherPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('farmerLoggedIn')) {
      router.push('/login');
    }
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <Weather />
      </main>
      <Footer />
    </div>
  );
}
