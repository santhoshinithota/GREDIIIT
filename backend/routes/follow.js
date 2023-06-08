import express from 'express';

import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/removefollower/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    
    const follower = await User.findById(req.params.id);
    if (!follower) {
      console.log('Follower not found')
      return res.status(404).json({ msg: 'Follower not found' });
    }
    const index = user.followers.findIndex(follower => follower.userid == req.params.id);
    if (index > -1) {
      user.followers.splice(index, 1);
    }
    await user.save();
    
    res.status(200).json(user);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/removefollowing/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }

    const following = await User.findById(req.params.id);
    if (!following) {
      console.log('following not found')
      return res.status(404).json({ msg: 'following not found' });
    }
    const index = user.following.findIndex(following => following.userid == req.params.id);
    if (index > -1) {
      user.following.splice(index, 1);
    }
    await user.save();

    res.status(200).json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



export default router;