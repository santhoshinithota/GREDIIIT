import express from 'express';
import { body, validationResult } from 'express-validator';

import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/edit', auth, [
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('lastName').not().isEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('age').isInt({ min: 1 }).withMessage('Invalid Age'),
  body('contactNo').not().isEmpty().withMessage('Contact number is required').isMobilePhone().withMessage('Invalid number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, age, contactNo} = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) { return res.status(404).json({ msg: 'User not found' }); }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.contactNo = contactNo;

    await user.save();

    const token = user.genToken();
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;