import clientPromise from "@/src/libs/mongoConnect";
import { ObjectId } from "mongodb";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('Stripe signature verification error:', e);
    return new Response(JSON.stringify({ error: 'Stripe signature verification error' }), { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    console.log('Stripe event:', event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';

    console.log('Order ID:', orderId);
    console.log('Payment status:', isPaid);

    if (isPaid) {
      try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_URL); // Ensure this is set to your actual database name
        const ordersCollection = db.collection("Order"); // Collection name is 'Order'

        const result = await ordersCollection.updateOne(
          { _id: new ObjectId(orderId) }, // Convert orderId to ObjectId
          { $set: { paid: true } }
        );

        console.log('Order update result:', result);
      } catch (error) {
        console.error('Error updating order:', error);
      }
    } else {
      console.log('Payment status is not "paid":', event?.data?.object?.payment_status);
    }
  } else {
    console.log('Unhandled event type:', event.type);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
