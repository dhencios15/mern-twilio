const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ContactNumber = require('../../models/Number');
const Inbox = require('../../models/Inbox');
const { sendMessage } = require('../../twilio/send-sms');

// @route GET api/post
router.get('/', auth, async (req, res) => {
  try {
    const getInbox = await Inbox.find({ user: req.user.id });
    res.json(getInbox);
  } catch (error) {
    res.status(500).send('SERVER ERROR');
  }
});

router.post('/', auth, async (req, res) => {
  const { contactNumber, message } = req.body;

  let newMessage = {};
  let result = {};
  try {
    result = await sendMessage(message, contactNumber);
    newMessage = {
      user: req.user.id,
      to: contactNumber,
      message,
    };

    if (result) {
      const sendMessages = new Inbox(newMessage);
      sendMessages.save();
      res.json(sendMessages);
    } else {
      return res.status(400).json({
        msg: 'Message sent failed!',
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: 'Message sent failed!',
    });
  }
});

module.exports = router;
