import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

const router = express.Router();

router.post('/signup', [
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('lastName').not().isEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('userName').not().isEmpty().withMessage('Username is required'),
  body('age').isInt({ min: 1 }).withMessage('invalid age'),
  body('contactNo').not().isEmpty().withMessage('Contact number is required').isMobilePhone().withMessage('Invalid number'),
  body('password').isLength({ min: 3 }).withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, userName, age, contactNo, password } = req.body;

  try {
    let user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
    }

    user = new User({ firstName, lastName, email, userName, age, contactNo, password });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = user.genToken();
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.post('/login', [
  body('userName').not().isEmpty().withMessage('User name is required'),
  body('password').isLength({ min: 3 }).withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.genToken();
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;