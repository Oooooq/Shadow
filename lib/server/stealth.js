export function stealthHeaders(req, res, next) {
  req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
  req.headers['x-forwarded-for'] = '127.0.0.1';
  next();
}
