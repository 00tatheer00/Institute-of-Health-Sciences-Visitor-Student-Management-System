const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const visitorRoutes = require('./routes/visitors');
const studentRoutes = require('./routes/students');
const reportRoutes = require('./routes/reports');
const exportRoutes = require('./routes/export');
const themeRoutes = require('./routes/theme');
const finesRoutes = require('./routes/fines');

const app = express();

const PORT = process.env.PORT || 5000; // backend port; Vite proxy forwards /api to this
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ihs-visitor-management';
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  app.set('trust proxy', 1);
}

const LOCAL_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'http://127.0.0.1:3003',
  'http://127.0.0.1:3004',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const extraOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function corsAllowed(origin) {
  if (!origin) return true;
  if (LOCAL_DEV_ORIGINS.includes(origin)) return true;
  if (extraOrigins.includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.vercel.app')) return true;
  } catch {
    return false;
  }
  return false;
}

// --- MongoDB connection ---
mongoose
  .connect(MONGO_URI, { dbName: 'ihs-visitor-management' })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// --- Middleware ---
app.use(
  cors({
    origin(origin, callback) {
      callback(null, corsAllowed(origin));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ihs-visitor-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/theme', themeRoutes);
app.use('/api/fines', finesRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongo: mongoose.connection.readyState });
});

// 404 - return JSON so frontend doesn't get HTML
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log('========================================');
  console.log('  IHS Visitor Management API Server');
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log('  React client will run at: http://localhost:3000');
  console.log('========================================');
});

