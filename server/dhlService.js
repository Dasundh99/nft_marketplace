// dhlService.js
const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.DHL_BASE_URL;
const AUTH_HEADER = `Basic ${Buffer.from(`${process.env.DHL_USER}:${process.env.DHL_PASS}`).toString('base64')}`;

// Create shipment
const createShipment = async (shipmentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/shipments`, shipmentData, {
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (err) {
    console.error('Error creating DHL shipment:', err.response?.data || err.message);
    throw err;
  }
};

// Track shipment
const trackShipment = async (trackingNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/tracking?trackingNumber=${trackingNumber}`, {
      headers: {
        'Authorization': AUTH_HEADER
      }
    });
    return response.data;
  } catch (err) {
    console.error('Error tracking DHL shipment:', err.response?.data || err.message);
    throw err;
  }
};

// Export functions (CommonJS)
module.exports = {
  createShipment,
  trackShipment
};
