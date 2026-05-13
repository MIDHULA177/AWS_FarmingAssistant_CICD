const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Weather API by city name
app.get('/api/weather', async (req, res) => {
  const { location } = req.query;
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: location, appid: process.env.WEATHER_API_KEY, units: 'metric' }
    });
    const d = response.data;
    res.json({
      location: d.name,
      temperature: Math.round(d.main.temp),
      condition: d.weather[0].description,
      humidity: d.main.humidity,
      windSpeed: Math.round(d.wind.speed * 3.6),
      rainfall: d.rain ? `${d.rain['1h'] || d.rain['3h'] || 0}mm expected` : 'No rain'
    });
  } catch (error) {
    const msg = error.response?.data?.message || 'Weather fetch failed';
    res.status(500).json({ error: msg });
  }
});

// Weather API by coordinates (geolocation)
app.get('/api/weather/coords', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { lat, lon, appid: process.env.WEATHER_API_KEY, units: 'metric' }
    });
    const d = response.data;
    res.json({
      location: d.name,
      temperature: Math.round(d.main.temp),
      condition: d.weather[0].description,
      humidity: d.main.humidity,
      windSpeed: Math.round(d.wind.speed * 3.6),
      rainfall: d.rain ? `${d.rain['1h'] || d.rain['3h'] || 0}mm expected` : 'No rain'
    });
  } catch (error) {
    const msg = error.response?.data?.message || 'Weather fetch failed';
    res.status(500).json({ error: msg });
  }
});

// Crops API
app.get('/api/crops', (req, res) => {
  const { season } = req.query;
  const cropsData = {
    monsoon: [
      { id: 1, name: 'Rice (Paddy)', season: 'Monsoon', duration: '120-150 days', yield: '4-5 tons/hectare', description: 'Kerala\'s staple food crop. Best varieties: Jyothi, Aiswarya, Uma. Requires waterlogged conditions.' },
      { id: 2, name: 'Coconut', season: 'Monsoon', duration: 'Year-round', yield: '80-100 nuts/tree', description: 'Kerala\'s pride. Varieties: West Coast Tall, Chowghat Orange Dwarf. Thrives in coastal areas.' },
      { id: 3, name: 'Tapioca', season: 'Monsoon', duration: '8-10 months', yield: '25-30 tons/hectare', description: 'Important food crop. Varieties: Sree Visakham, H-226. Drought resistant and easy to grow.' },
      { id: 4, name: 'Ginger', season: 'Monsoon', duration: '8-9 months', yield: '15-20 tons/hectare', description: 'High value spice crop. Varieties: Maran, Mahima. Requires well-drained soil and shade.' }
    ],
    winter: [
      { id: 5, name: 'Vegetables (Beans, Cabbage)', season: 'Winter', duration: '60-90 days', yield: '10-15 tons/hectare', description: 'Winter vegetables grow well. Beans, cabbage, carrot, beetroot are popular choices.' },
      { id: 6, name: 'Banana', season: 'Winter', duration: '12-15 months', yield: '25-30 kg/plant', description: 'Popular varieties: Nendran, Robusta, Red Banana. Requires regular irrigation and organic manure.' },
      { id: 7, name: 'Turmeric', season: 'Winter', duration: '7-9 months', yield: '20-25 tons/hectare', description: 'High value spice. Varieties: Alleppey Supreme, Erode Local. Needs well-drained loamy soil.' },
      { id: 8, name: 'Pineapple', season: 'Winter', duration: '18-24 months', yield: '50-60 tons/hectare', description: 'Varieties: Kew, Mauritius. Grows well in laterite soil with good drainage.' }
    ],
    summer: [
      { id: 9, name: 'Pepper (Black Gold)', season: 'Summer', duration: '3-4 years to mature', yield: '2-3 kg/vine', description: 'Kerala\'s most valuable spice. Varieties: Panniyur-1, Karimunda. Requires support trees and shade.' },
      { id: 10, name: 'Cashew', season: 'Summer', duration: '3 years to bear', yield: '8-10 kg/tree', description: 'Thrives in laterite soil. Varieties: Vengurla-4, Bhaskara. Drought tolerant once established.' },
      { id: 11, name: 'Mango', season: 'Summer', duration: 'Seasonal fruiting', yield: '100-200 kg/tree', description: 'Popular varieties: Alphonso, Malgova, Neelum. Requires well-drained soil and full sunlight.' },
      { id: 12, name: 'Watermelon', season: 'Summer', duration: '90-100 days', yield: '25-30 tons/hectare', description: 'Summer cash crop. Varieties: Sugar Baby, Arka Manik. Needs sandy loam soil and irrigation.' }
    ]
  };
  res.json(cropsData[season] || []);
});

// Pesticides API
app.get('/api/pesticides', (req, res) => {
  const pesticides = [
    { id: 1, name: 'Neem Oil', type: 'Organic Pesticide', usage: 'Aphids, Whiteflies, Mites', dosage: '5ml/liter water', description: 'Natural pesticide from neem seeds. Safe for beneficial insects. Spray early morning or evening.' },
    { id: 2, name: 'Bordeaux Mixture', type: 'Fungicide', usage: 'Fungal diseases in coconut, pepper', dosage: '1% solution (10g/liter)', description: 'Copper-based fungicide. Controls leaf spot, blight. Apply before monsoon.' },
    { id: 3, name: 'Trichoderma', type: 'Bio-fungicide', usage: 'Root rot, wilt diseases', dosage: '5g/liter for soil drench', description: 'Biological control agent. Protects roots from fungal attack. Mix with organic manure.' },
    { id: 4, name: 'Bacillus thuringiensis (Bt)', type: 'Bio-pesticide', usage: 'Caterpillars, leaf eaters', dosage: '1-2g/liter water', description: 'Bacterial pesticide. Controls diamond back moth, fruit borers. Safe for humans and animals.' },
    { id: 5, name: 'Pseudomonas', type: 'Bio-fungicide', usage: 'Bacterial wilt, root diseases', dosage: '10ml/liter for seedling treatment', description: 'Beneficial bacteria. Protects against soil-borne diseases. Use during transplanting.' },
    { id: 6, name: 'Panchagavya', type: 'Organic Growth Promoter', usage: 'Overall plant health', dosage: '30ml/liter as foliar spray', description: 'Traditional Kerala formula. Mix of cow products. Boosts immunity and growth.' }
  ];
  res.json(pesticides);
});

// Fertilizers API
app.get('/api/fertilizers', (req, res) => {
  const fertilizers = [
    { id: 1, name: 'Urea (46% N)', type: 'Nitrogen Fertilizer', usage: 'Leaf growth, green color', dosage: '50-100 kg/hectare', description: 'Quick nitrogen source. Apply in split doses. Best for rice, vegetables during vegetative stage.' },
    { id: 2, name: 'DAP (18-46-0)', type: 'Phosphorus Fertilizer', usage: 'Root development, flowering', dosage: '100-150 kg/hectare', description: 'Di-ammonium phosphate. Apply as basal dose before planting. Good for all crops.' },
    { id: 3, name: 'Muriate of Potash (MOP)', type: 'Potassium Fertilizer', usage: 'Fruit quality, disease resistance', dosage: '50-75 kg/hectare', description: 'Essential for coconut, banana, pepper. Improves fruit size and quality. Apply in 2-3 splits.' },
    { id: 4, name: 'Compost', type: 'Organic Fertilizer', usage: 'Soil health, all nutrients', dosage: '5-10 tons/hectare', description: 'Decomposed organic matter. Improves soil structure. Apply before planting or as top dressing.' },
    { id: 5, name: 'Vermicompost', type: 'Organic Fertilizer', usage: 'Rich in nutrients and microbes', dosage: '2-3 tons/hectare', description: 'Earthworm compost. High quality organic fertilizer. Excellent for vegetables and fruits.' },
    { id: 6, name: 'NPK 19-19-19', type: 'Complex Fertilizer', usage: 'Balanced nutrition', dosage: '200-300 kg/hectare', description: 'All-purpose fertilizer. Contains N, P, K in equal ratio. Good for all crops at all stages.' },
    { id: 7, name: 'Bone Meal', type: 'Organic Phosphorus', usage: 'Flowering and fruiting', dosage: '100-200 kg/hectare', description: 'Slow-release phosphorus. Good for fruit trees. Mix with soil during planting.' },
    { id: 8, name: 'Neem Cake', type: 'Organic Fertilizer + Pesticide', usage: 'Nutrition + pest control', dosage: '250-500 kg/hectare', description: 'Byproduct of neem oil. Acts as fertilizer and pest repellent. Apply to soil.' }
  ];
  res.json(fertilizers);
});

// Market Prices API
app.get('/api/market-prices', (req, res) => {
  const prices = [
    { id: 1, crop: 'Coconut', price: '35', unit: 'per piece', icon: '🥥', trend: 'up', change: '+₹2', market: 'Thiruvananthapuram' },
    { id: 2, crop: 'Pepper', price: '650', unit: 'per kg', icon: '🌶️', trend: 'up', change: '+₹50', market: 'Kochi' },
    { id: 3, crop: 'Rubber', price: '185', unit: 'per kg', icon: '🌳', trend: 'down', change: '-₹5', market: 'Kottayam' },
    { id: 4, crop: 'Banana', price: '25', unit: 'per dozen', icon: '🍌', trend: 'up', change: '+₹3', market: 'Thrissur' },
    { id: 5, crop: 'Rice', price: '45', unit: 'per kg', icon: '🌾', trend: 'up', change: '+₹2', market: 'Palakkad' },
    { id: 6, crop: 'Cardamom', price: '1200', unit: 'per kg', icon: '🫚', trend: 'down', change: '-₹50', market: 'Idukki' }
  ];
  res.json(prices);
});

// Government Schemes API
app.get('/api/schemes', (req, res) => {
  const schemes = [
    { 
      id: 1, 
      name: 'PM-KISAN', 
      type: 'Subsidy',
      description: 'Direct income support to farmers',
      benefit: '₹6000 per year in 3 installments',
      eligibility: 'All landholding farmers'
    },
    { 
      id: 2, 
      name: 'Pradhan Mantri Fasal Bima Yojana', 
      type: 'Insurance',
      description: 'Crop insurance scheme',
      benefit: 'Coverage against crop loss',
      eligibility: 'All farmers growing notified crops'
    },
    { 
      id: 3, 
      name: 'Kerala Agriculture Subsidy', 
      type: 'Subsidy',
      description: 'State subsidy for farming equipment',
      benefit: 'Up to 50% subsidy on equipment',
      eligibility: 'Small and marginal farmers'
    },
    { 
      id: 4, 
      name: 'Kisan Credit Card', 
      type: 'Loan',
      description: 'Short-term credit for farming',
      benefit: 'Low interest loans up to ₹3 lakhs',
      eligibility: 'All farmers with land records'
    }
  ];
  res.json(schemes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
