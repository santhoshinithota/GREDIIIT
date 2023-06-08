import jwt from 'jsonwebtoken';

export default function auth (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(400).send('Token not found');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  }
  catch (err) {
    res.status(400).send('Invalid token.');
  }
} 