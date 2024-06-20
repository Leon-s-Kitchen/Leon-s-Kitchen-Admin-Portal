// routes/orders.js

import express from 'express';
import AcceptedOrder from '../lib/acceptedOrderModel';

const router = express.Router();

// Route to accept an order
router.post('/accept/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by its ID
    const order = await Order.findById(orderId);

    // Handle if the order doesn't exist
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create a new accepted order based on the existing order data
    const acceptedOrder = new AcceptedOrder({
      orderId: order._id,
      user: order.user,
      name: order.name,
      mobileNo: order.mobileNo,
      items: order.items,
      totalAmount: order.totalAmount,
      deliveryFee: order.deliveryFee,
      destination: order.destination,
      createdAt: order.createdAt,
      // Optionally, you can update the status or other fields
      status: 'Order Accepted',
    });

    // Save the accepted order to the database
    await acceptedOrder.save();

    // Optionally, you can delete the order from the original collection
    // await order.remove();

    res.status(201).json({ message: 'Order accepted successfully', acceptedOrder });
  } catch (error) {
    console.error('Error accepting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
