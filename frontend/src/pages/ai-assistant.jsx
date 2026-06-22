import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbaseWidget from '../chatbase-integration/ChatbaseWidget';
import styles from '../styles/Page.module.css';

export default function AIAssistantPage() {
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
        <ChatbaseWidget />
      </main>
      <Footer />
    </div>
  );
}
