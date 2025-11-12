// server.js
import 'dotenv/config'; // loads .env automatically
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm i node-fetch@2
import { getTrackingStatus } from "./trackingService.js"; // your TrackingMore service
// import { confirmPayment, createDHLShipment, checkDeliveryStatus } from './orderController.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Load Didit env vars
const DIDIT_API_KEY = process.env.DIDIT_API_KEY;  
const DIDIT_WORKFLOW_ID = process.env.DIDIT_WORKFLOW_ID;  

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // frontend URL
app.use(express.json());

// Debug env vars
console.log('DIDIT_API_KEY loaded:', DIDIT_API_KEY ? 'YES (hidden)' : 'NO - Check .env!');
console.log('DIDIT_WORKFLOW_ID loaded:', DIDIT_WORKFLOW_ID ? 'YES' : 'NO - Check .env!');

// Root and sample assets
app.get("/", (req, res) => res.send("Welcome to the root route!"));
app.get("/api", (req, res) => {
  res.json({ assets: ["Gold", "Oil", "Jewelry", "Real Estate", "Stocks"] });
});

// Start KYC session
app.post('/api/start-kyc', async (req, res) => {
  if (!DIDIT_API_KEY || !DIDIT_WORKFLOW_ID) {
    return res.status(500).json({ error: 'Server config missing (check .env)' });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('https://verification.didit.me/v2/session', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'x-api-key': DIDIT_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workflow_id: DIDIT_WORKFLOW_ID })
    });
    clearTimeout(timeoutId);

    const bodyText = await response.text();
    let data = null;
    try { data = JSON.parse(bodyText); } catch(e) {
      console.error('JSON parse failed - raw body:', bodyText.substring(0,200));
    }

    if (response.ok && data && data.url) {
      const urlParts = data.url.split('/session/');
      const sessionId = urlParts.length > 1 ? urlParts[1] : null;
      if (!sessionId) return res.status(400).json({ error: 'Invalid session URL format' });

      res.json({ verifyUrl: data.url, sessionId });
    } else {
      res.status(response.status || 400).json({ 
        error: data?.detail || data?.error || 'Failed to start session',
        diditStatus: response.status,
        rawBody: bodyText.substring(0,200)
      });
    }

  } catch (error) {
    if (error.name === 'AbortError') return res.status(408).json({ error: 'Didit API timeout' });
    res.status(500).json({ error: `Fetch failed: ${error.message}` });
  }
});

// Poll KYC session status
app.get('/api/check-status/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  if (!DIDIT_API_KEY || !sessionId) return res.status(400).json({ error: 'Invalid session ID' });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`https://verification.didit.me/v2/session/${sessionId}`, {
      signal: controller.signal,
      headers: { 'x-api-key': DIDIT_API_KEY }
    });
    clearTimeout(timeoutId);

    const bodyText = await response.text();
    let data = null;
    try { data = JSON.parse(bodyText); } catch(e) {
      console.error('Poll JSON parse failed - raw body:', bodyText.substring(0,200));
    }

    if (response.ok && data) res.json(data);
    else res.status(response.status || 400).json({ 
      error: data?.detail || data?.error || 'Failed to poll session',
      diditStatus: response.status,
      rawBody: bodyText.substring(0,200)
    });

  } catch (error) {
    if (error.name === 'AbortError') return res.status(408).json({ error: 'Didit poll timeout' });
    res.status(500).json({ error: error.message });
  }
});

// Mock KYC update endpoint
app.post('/api/update-user-kyc', (req, res) => {
  const { userId, verified } = req.body;
  console.log(`User ${userId} KYC: ${verified ? 'Approved' : 'Rejected'}`);
  res.json({ success: true });
});

// Mock tracking endpoint for testing/demo
app.get("/api/track/:carrier/:trackingNumber", (req, res) => {
  const { carrier, trackingNumber } = req.params;

  // Sample mock data
  const mockData = {
    code: 200,
    data: {
      items: [
        {
          tracking_number: trackingNumber,
          carrier_code: carrier,
          status: "in_transit",
          origin_info: {
            trackinfo: [
              {
                StatusDescription: "Shipment created",
                Date: "2025-11-12 09:00",
                Details: "Your shipment has been created",
                Location: "Colombo, Sri Lanka",
              },
              {
                StatusDescription: "Shipment picked up",
                Date: "2025-11-12 14:00",
                Details: "Package picked up by DHL courier",
                Location: "Colombo, Sri Lanka",
              },
              {
                StatusDescription: "In Transit",
                Date: "2025-11-13 08:00",
                Details: "Package is on the way to destination",
                Location: "Kandy, Sri Lanka",
              },
              {
                StatusDescription: "Out for Delivery",
                Date: "2025-11-13 10:00",
                Details: "Package out for delivery",
                Location: "Galle, Sri Lanka",
              },
              {
                StatusDescription: "Delivered",
                Date: "2025-11-13 12:30",
                Details: "Package delivered to recipient",
                Location: "Galle, Sri Lanka",
              },
            ],
          },
        },
      ],
    },
  };

  res.json(mockData);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
