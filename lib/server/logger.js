import fs from 'fs';
import path from 'path';

const logStream = fs.createWriteStream(path.join('logs', 'access.log'), { flags: 'a' });

export function logRequest(req, res, next) {
  const line = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  logStream.write(line);
  next();
}
