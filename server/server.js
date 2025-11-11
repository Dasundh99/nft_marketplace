require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Native fetch (no node-fetch needed)

const app = express();
const PORT = 3000;
const DIDIT_API_KEY = process.env.DIDIT_API_KEY;  // Add to .env
const DIDIT_WORKFLOW_ID = process.env.DIDIT_WORKFLOW_ID;  // Add to .env

// Debug: Log env vars (masked)
console.log('DIDIT_API_KEY loaded:', DIDIT_API_KEY ? 'YES (hidden)' : 'NO - Check .env!');
console.log('DIDIT_WORKFLOW_ID loaded:', DIDIT_WORKFLOW_ID ? 'YES' : 'NO - Check .env!');

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's URL
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the root route!");
});

app.get("/api", (req, res) => {
  res.json({
    assets: ["Gold", "Oil", "Jewelry", "Real Estate", "Stocks"],
  });
});

// Start KYC session
app.post('/api/start-kyc', async (req, res) => {
  console.log('POST /api/start-kyc called');  // Debug: Confirm endpoint hit
  if (!DIDIT_API_KEY || !DIDIT_WORKFLOW_ID) {
    console.error('Missing env vars - cannot call Didit API');
    return res.status(500).json({ error: 'Server config missing (check .env)' });
  }

  try {
    console.log('Fetching Didit session...');  // Debug start
    const controller = new AbortController();  // For timeout
    const timeoutId = setTimeout(() => controller.abort(), 30000);  // 30s timeout

    const response = await fetch('https://verification.didit.me/v2/session', {  
      method: 'POST',
      signal: controller.signal,  // Abort on timeout
      headers: {
        'x-api-key': DIDIT_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workflow_id: DIDIT_WORKFLOW_ID })
    });
    clearTimeout(timeoutId);

    console.log(`Didit response status: ${response.status}`);  // e.g., 200 or 504

    // Fixed: Read body ONCE as text, then try JSON parse
    const bodyText = await response.text();
    let data = null;
    try {
      data = JSON.parse(bodyText);
      console.log('Didit response data (JSON):', data);
    } catch (parseError) {
      console.error('JSON parse failed - raw body:', bodyText.substring(0, 200) + '...');  // Truncate long HTML
    }

    if (response.ok && data && data.url) {
      // Extract sessionId from URL (e.g., /session/ABC123 → ABC123)
      const urlParts = data.url.split('/session/');
      const sessionId = urlParts.length > 1 ? urlParts[1] : null;
      if (!sessionId) {
        console.error('Could not extract sessionId from URL:', data.url);
        return res.status(400).json({ error: 'Invalid session URL format' });
      }
      console.log('Session started successfully:', { sessionId, verifyUrl: data.url });
      res.json({ verifyUrl: data.url, sessionId });
    } else {
      console.error('Didit error (status', response.status, '):', data || bodyText.substring(0, 200));
      res.status(response.status || 400).json({ 
        error: data?.detail || data?.error || 'Failed to start session (check workflow ID)',
        diditStatus: response.status,
        rawBody: bodyText.substring(0, 200)  // For debug
      });
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Fetch timeout (30s)');
      return res.status(408).json({ error: 'Didit API timeout - try again' });
    }
    console.error('Fetch error:', error.message);  // Network issues
    res.status(500).json({ error: `Fetch failed: ${error.message}` });
  }
});

// Poll session status
app.get('/api/check-status/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  console.log(`GET /api/check-status/${sessionId}`);  // Debug: Now shows real ID
  if (!DIDIT_API_KEY || !sessionId) {
    console.error('Missing API key or session ID:', { sessionId });
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`https://verification.didit.me/v2/session/${sessionId}`, {  
      signal: controller.signal,
      headers: { 
        'x-api-key': DIDIT_API_KEY
      }
    });
    clearTimeout(timeoutId);

    console.log(`Didit poll status: ${response.status}`);

    // Fixed: Read body ONCE as text, then try JSON
    const bodyText = await response.text();
    let data = null;
    try {
      data = JSON.parse(bodyText);
      console.log('Poll data (JSON):', data);
    } catch (parseError) {
      console.error('Poll JSON parse failed - raw body:', bodyText.substring(0, 200) + '...');
    }

    if (response.ok && data) {
      res.json(data);
    } else {
      console.error('Poll error (status', response.status, '):', data || bodyText.substring(0, 200));
      res.status(response.status || 400).json({ 
        error: data?.detail || data?.error || 'Failed to poll session',
        diditStatus: response.status,
        rawBody: bodyText.substring(0, 200)
      });
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Poll timeout (30s)');
      return res.status(408).json({ error: 'Didit poll timeout' });
    }
    console.error('Poll fetch error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Mock endpoint to simulate updating user KYC in DB (replace with real DB logic)
app.post('/api/update-user-kyc', (req, res) => {
  const { userId, verified } = req.body;
  // TODO: Update your DB, e.g., await User.findByIdAndUpdate(userId, { kycVerified: verified });
  console.log(`User ${userId} KYC: ${verified ? 'Approved' : 'Rejected'}`);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});