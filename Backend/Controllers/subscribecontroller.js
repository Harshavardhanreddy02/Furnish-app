const Subscribe = require('../models/Subscribe');

const likesubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  try {
    let existing = await Subscribe.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email is already subscribed",
      });
    }

    const subscribe = new Subscribe({ email });
    await subscribe.save();

    res.status(201).json({
      message: "Successfully subscribed to newsletter",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { likesubscribe };
