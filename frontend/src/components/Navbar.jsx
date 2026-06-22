import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/weather', label: '🌤️ Weather' },
  { href: '/crops', label: '🌾 Crops' },
  { href: '/disease-detection', label: '🔬 Disease' },
  { href: '/market-prices', label: '💰 Market' },
  { href: '/schemes', label: '🏛️ Schemes' },
  { href: '/ai-assistant', label: '🤖 AI Chat' },
];

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('farmerLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/home" className={styles.logo}>Kerala Farmer Assistant</Link>
        <ul className={styles.navLinks}>
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={router.pathname === href ? styles.active : ''}>
                {label}
              </Link>
            </li>
          ))}
          <li><button onClick={handleLogout} className={styles.logoutBtn}>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}
