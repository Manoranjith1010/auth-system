const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

module.exports = app;
