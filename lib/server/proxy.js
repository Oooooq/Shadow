import express from 'express';
import https from 'https';
import http from 'http';
import { URL } from 'url';

const router = express.Router();

router.use('*', (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing ?url param');

  try {
    const url = new URL(target);
    const lib = url.protocol === 'https:' ? https : http;

    const options = {
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = lib.request(url, options, proxyRes => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
    proxyReq.on('error', err => res.status(500).send('Proxy error'));
  } catch {
    res.status(400).send('Invalid URL');
  }
});

export default router;
