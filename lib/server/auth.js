export function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (token === `Bearer ${process.env.ADMIN_TOKEN}`) return next();
  res.status(403).send('Forbidden');
}
