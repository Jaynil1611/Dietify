const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");

const postOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
      key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: uuidv4(),
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

module.exports = { postOrder };
