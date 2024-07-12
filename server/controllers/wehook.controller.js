const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe properly
const Slot = require("../models/slot.model");
const Booking = require("../models/booking.model");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handelStripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret); // Use req.body instead of req.rawBody
  } catch (error) {
    console.log(`⚠️  Webhook signature verification failed: ${error.message}`);
    return res.sendStatus(400);
  }

  // handle event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const { client_reference_id, metadata } = session;

      // Fetch slot and student information
      const slot = await Slot.findById(client_reference_id);
      const studentId = metadata.studentId;
      const tutorId = metadata.tutorId;

      if (slot && studentId && tutorId) {
        // create Booking
        const booking = new Booking({
          studentId,
          teacherId: tutorId,
          slotId: client_reference_id,
          startTime: slot.startTime,
          endTime: slot.endTime,
          duration: slot.duration,
          date: slot.date,
          status: true,
        });
        await booking.save();
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.json({ received: true });
};
