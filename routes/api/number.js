const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ContactNumber = require('../../models/Number');
const User = require('../../models/User');

// @route GET api/profile/me
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await ContactNumber.find({
      user: req.user.id,
    }).populate('User', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('SERVER ERROR');
  }
});

router.post('/', auth, async (req, res) => {
  const { contactName, contactNumber } = req.body;

  try {
    const profile = new ContactNumber({
      user: req.user.id,
      contactName,
      contactNumber,
    });
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

module.exports = router;
