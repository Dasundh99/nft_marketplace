// orderController.js
const { createShipment, trackShipment } = require('./dhlService.js');

// Mock database
const orders = {}; // Removed ": any"

// Confirm payment
const confirmPayment = async (req, res) => {
  const { orderId, buyer, seller, item } = req.body;
  orders[orderId] = { orderId, buyer, seller, item, status: "PAID" };
  res.json({ message: "Payment confirmed", order: orders[orderId] });
};

// Create DHL shipment
const createDHLShipment = async (req, res) => {
  const { orderId, receiverAddress, packageWeight } = req.body;
  const order = orders[orderId];
  if (!order) return res.status(404).json({ message: "Order not found" });

  try {
    const shipmentRequest = {
      plannedShippingDateAndTime: new Date().toISOString(),
      pickup: { isRequested: false },
      productCode: "P",
      customerDetails: {
        shipperDetails: {
          name: "Fcode Labs",
          postalCode: "10100",
          cityName: "Colombo",
          countryCode: "LK"
        },
        receiverDetails: receiverAddress
      },
      accounts: [{ number: process.env.DHL_ACCOUNT, typeCode: "shipper" }],
      content: "Tokenized asset delivery",
      packages: [{ weight: packageWeight, dimensions: { length: 10, width: 10, height: 10 } }]
    };

    const shipment = await createShipment(shipmentRequest);
    order.status = "SHIPPED";
    order.trackingNumber = shipment.shipmentTrackingNumber;
    order.labelUrl = shipment.documents?.[0]?.content;

    res.json({ message: "Shipment created", shipment });
  } catch (err) {
    res.status(500).json({ message: "Failed to create shipment", error: err.message });
  }
};

// Check delivery status
const checkDeliveryStatus = async (req, res) => {
  const { orderId } = req.params;
  const order = orders[orderId];
  if (!order?.trackingNumber) return res.status(400).json({ message: "Tracking number missing" });

  try {
    const tracking = await trackShipment(order.trackingNumber);
    const status = tracking.shipments?.[0]?.status?.statusCode;

    if (status === "delivered") order.status = "DELIVERED";

    res.json({ tracking, orderStatus: order.status });
  } catch (err) {
    res.status(500).json({ message: "Failed to track delivery", error: err.message });
  }
};

// Export functions (CommonJS)
module.exports = {
  confirmPayment,
  createDHLShipment,
  checkDeliveryStatus
};
