import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Crops from '../components/Crops';
import styles from '../styles/Page.module.css';

export default function CropsPage() {
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
        <Crops />
      </main>
      <Footer />
    </div>
  );
}
