import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from './auth.js';
import { logRequest } from './logger.js';
import { stealthHeaders } from './stealth.js';
import proxy from './proxy.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
