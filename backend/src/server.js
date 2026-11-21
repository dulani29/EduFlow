const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Load environment variables
dotenv.config();

const app = express();

const lazyRoute = (loadRouter) => {
  let router;

  return (req, res, next) => {
    try {
      router ??= loadRouter();
      return router(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};







// Security Middleware - helmet with custom configuration for file uploads
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false, // Disable for development
}));

// CORS Configuration - Allow all origins and methods for development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Allow all origins in development
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    // In production, check allowed origins
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Sanitize data to prevent NoSQL injection
app.use(mongoSanitize());

// Body parser middleware - increased limits for video uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`\n📨 ${req.method} ${req.path}`);
  console.log('   Origin:', req.get('origin') || 'No origin');
  console.log('   Content-Type:', req.get('content-type') || 'Not set');
  next();
});

// Rate limiting - General API
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting - Login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.LOGIN_RATE_LIMIT_MAX) || 5,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.'
  },
  skipSuccessfulRequests: true,
});

app.use('/api/', generalLimiter);
app.use('/api/auth/login', loginLimiter);

// Skip rate limiting for file uploads
app.use('/api/lessons/upload-video', (req, res, next) => next());
app.use('/api/lessons/upload-document', (req, res, next) => next());
app.use('/api/courses/upload', (req, res, next) => next());
app.use('/api/users/upload-photo', (req, res, next) => next());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Eduflow API is running',
    health: '/health'
  });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  res.set('Retry-After', '2');
  return res.status(503).json({
    success: false,
    message: 'Database is still connecting. Please retry shortly.'
  });
});

// API Routes
app.use('/api/auth', lazyRoute(() => require('./routes/auth.routes')));
app.use('/api/files', lazyRoute(() => require('./routes/file.routes')));
app.use('/api/courses', lazyRoute(() => require('./routes/course.routes')));
app.use('/api/lessons', lazyRoute(() => require('./routes/lesson.routes')));
app.use('/api/users', lazyRoute(() => require('./routes/user.routes')));
app.use('/api/instructors', lazyRoute(() => require('./routes/instructor.routes')));
app.use('/api/quizzes', lazyRoute(() => require('./routes/quiz.routes')));
app.use('/api/questions', lazyRoute(() => require('./routes/question.routes')));
app.use('/api/assignments', lazyRoute(() => require('./routes/assignment.routes')));
app.use('/api/submissions', lazyRoute(() => require('./routes/submission.routes')));
app.use('/api/progress', lazyRoute(() => require('./routes/progress.routes')));
app.use('/api/enrollments', lazyRoute(() => require('./routes/enrollment.routes')));
app.use('/api/certificates', lazyRoute(() => require('./routes/certificate.routes')));
app.use('/api/admin', lazyRoute(() => require('./routes/admin.routes')));
app.use('/api/discussions', lazyRoute(() => require('./routes/discussion.routes')));
app.use('/api/replies', lazyRoute(() => require('./routes/reply.routes')));
app.use('/api/feedback', lazyRoute(() => require('./routes/feedback.routes')));
app.use('/api/reports', lazyRoute(() => require('./routes/report.routes')));
app.use('/api/notifications', lazyRoute(() => require('./routes/notification.routes')));
app.use('/api/announcements', lazyRoute(() => require('./routes/announcement.routes')));
app.use('/api/streaks', lazyRoute(() => require('./routes/streak.routes')));
app.use('/api/badges', lazyRoute(() => require('./routes/badge.routes')));
app.use('/api/messages', lazyRoute(() => require('./routes/message.routes')));
app.use('/api/live-classes', lazyRoute(() => require('./routes/liveClass.routes')));
app.use('/api/peer-reviews', lazyRoute(() => require('./routes/peerReview.routes')));
app.use('/api/study-groups', lazyRoute(() => require('./routes/studyGroup.routes')));
app.use('/api/forums', lazyRoute(() => require('./routes/forum.routes')));
app.use('/api/collaborative-projects', lazyRoute(() => require('./routes/collaborativeProject.routes')));
app.use('/api/leaderboard', lazyRoute(() => require('./routes/leaderboard.routes')));
app.use('/api/flashcards', lazyRoute(() => require('./routes/flashcard.routes')));
app.use('/api/gamification', lazyRoute(() => require('./routes/gamification.routes')));
app.use('/api/calendar', lazyRoute(() => require('./routes/calendar.routes')));
app.use('/api/wellness', lazyRoute(() => require('./routes/wellness.routes')));
app.use('/api/goals', lazyRoute(() => require('./routes/goal.routes')));
app.use('/api/data-export', lazyRoute(() => require('./routes/dataExport.routes')));
app.use('/api/audit-logs', lazyRoute(() => require('./routes/auditLog.routes')));
app.use('/api/analytics', lazyRoute(() => require('./routes/analytics.routes')));

// 404 handler - must be after all routes
app.use(notFound);

// Init DB connection
console.log('🚀 Starting DB init...');

app.use(errorHandler);

const os = require('os');
const PORT = process.env.PORT || 5000;

const lanAddresses = () => {
  const addresses = [];
  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries || []) {
      const isIPv4 = entry.family === 'IPv4' || entry.family === 4;
      if (isIPv4 && !entry.internal) addresses.push(entry.address);
    }
  }
  return addresses;
};

(async () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Local:   http://localhost:${PORT}`);
    lanAddresses().forEach(ip => console.log(`Network: http://${ip}:${PORT}`));
  });

  try {
    await connectDB();
    console.log('✅ Database connection ready');
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1);
  }
})();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
