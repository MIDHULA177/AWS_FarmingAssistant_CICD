import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Weather.module.css';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const KERALA_CITIES = ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Palakkad', 'Kottayam'];

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingGPS, setUsingGPS] = useState(false);

  const fetchByGPS = () => {
    if (!navigator.geolocation) return fetchByCity('Thiruvananthapuram');
    setLoading(true); setError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setUsingGPS(true);
        await fetchByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => { setUsingGPS(false); fetchByCity('Thiruvananthapuram'); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => { fetchByGPS(); }, []);

  const fetchByCoords = async (lat, lon) => {
    setLoading(true); setError('');
    try {
      const { data } = await axios.get(`${BACKEND}/api/weather/coords`, { params: { lat, lon } });
      setWeather(data);
      setLocation('');
    } catch {
      setError('Could not fetch weather. Check your API key.');
    } finally { setLoading(false); }
  };

  const fetchByCity = async (city) => {
    setLoading(true); setError('');
    try {
      const { data } = await axios.get(`${BACKEND}/api/weather`, { params: { location: city } });
      setWeather(data);
      setLocation(city);
    } catch {
      setError('Could not fetch weather. Check your API key.');
    } finally { setLoading(false); }
  };

  const handleCityChange = (e) => {
    const val = e.target.value;
    if (!val) { setUsingGPS(false); fetchByGPS(); return; }
    setUsingGPS(false);
    setLocation(val);
    fetchByCity(val);
  };

  const getWeatherBg = (condition) => {
    if (!condition) return 'linear-gradient(135deg, #667eea, #764ba2)';
    const c = condition.toLowerCase();
    if (c.includes('rain')) return 'linear-gradient(135deg, #373b44, #4286f4)';
    if (c.includes('cloud')) return 'linear-gradient(135deg, #606c88, #3f4c6b)';
    if (c.includes('clear')) return 'linear-gradient(135deg, #f7971e, #ffd200)';
    if (c.includes('thunder')) return 'linear-gradient(135deg, #0f0c29, #302b63)';
    if (c.includes('mist') || c.includes('fog')) return 'linear-gradient(135deg, #b8c6db, #f5f7fa)';
    return 'linear-gradient(135deg, #56ab2f, #a8e063)';
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return '🌤️';
    const c = condition.toLowerCase();
    if (c.includes('rain')) return '🌧️';
    if (c.includes('thunder')) return '⛈️';
    if (c.includes('cloud')) return '☁️';
    if (c.includes('clear')) return '☀️';
    if (c.includes('mist') || c.includes('fog')) return '🌫️';
    if (c.includes('snow')) return '❄️';
    return '🌤️';
  };

  return (
    <section id="weather" className={styles.weather}>
      <h2>🌤️ Real-Time Weather Forecast</h2>
      <select value={location} onChange={handleCityChange} className={styles.select}>
        <option value="">📍 Your Location</option>
        {KERALA_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
      </select>

      {loading && <div className={styles.loading}><div className={styles.spinner}></div><p>Fetching weather...</p></div>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && weather && (
        <div className={styles.weatherCard} style={{ background: getWeatherBg(weather.condition) }}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.locationLabel}>{usingGPS ? '🛰️ Precise Location' : '📍 Selected City'}</p>
              <h3 className={styles.locationName}>{weather.location}</h3>
            </div>
            <span className={styles.weatherIcon}>{getWeatherIcon(weather.condition)}</span>
          </div>

          <div className={styles.tempRow}>
            <p className={styles.temp}>{weather.temperature}°C</p>
            <p className={styles.condition}>{weather.condition}</p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span>💧</span>
              <p>{weather.humidity}%</p>
              <small>Humidity</small>
            </div>
            <div className={styles.statBox}>
              <span>💨</span>
              <p>{weather.windSpeed} km/h</p>
              <small>Wind Speed</small>
            </div>
            <div className={styles.statBox}>
              <span>🌧️</span>
              <p>{weather.rainfall}</p>
              <small>Rainfall</small>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
