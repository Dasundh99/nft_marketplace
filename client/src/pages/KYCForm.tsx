import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('Not started');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<string[]>([]);
  const BACKEND_URL = 'http://localhost:3000';

  // Fetch assets on mount
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api`);
        const data = await res.json();
        setAssets(data.assets);
      } catch (err) {
        console.error('Failed to fetch assets:', err);
      }
    };
    fetchAssets();
  }, []);

  const startKYC = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Starting KYC fetch...');
      const res = await fetch(`${BACKEND_URL}/api/start-kyc`, { method: 'POST' });
      if (!res.ok) {
        throw new Error(`Backend error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      console.log('API response:', data);
      const { verifyUrl, sessionId: id } = data;
      if (!verifyUrl || !id) {
        throw new Error('Missing verifyUrl or sessionId from backend');
      }
      setSessionId(id);
      // Updated: Open as smaller popup window (less height) instead of full tab
      const kycWindow = window.open(
        verifyUrl, 
        'kycPopup', 
        'width=500,height=700,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no'
      );
      if (!kycWindow) {
        throw new Error('Popup blocked—allow popups for this site and try again');
      }
      setStatus('Verification started—check the popup window!');
      localStorage.setItem('diditSessionId', id);
      setPolling(true);  // Start polling immediately
    } catch (error) {
      console.error('KYC error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      setStatus('Not started');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/check-status/${id}`);
      if (!res.ok) {
        throw new Error(`Poll error: ${res.status}`);
      }
      const data = await res.json();
      setStatus(`Status: ${data.status || 'unknown'}`);
      if (data.status === 'approved') {
        // Mock update user KYC (replace userId with real one)
        await fetch(`${BACKEND_URL}/api/update-user-kyc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'mockUser123', verified: true })
        });
        setPolling(false);
        setStatus('Verified! You can now tokenize commodities.');
      } else if (data.status === 'rejected') {
        setPolling(false);
        setStatus('Verification rejected—try again.');
      }
      return data.status !== 'in_progress';
    } catch (error) {
      console.error(error);
      setError('Polling failed—try restarting verification.');
      return true;  // Stop polling on error
    }
  };

  // Polling effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (polling && sessionId) {
      interval = setInterval(async () => {
        const done = await checkStatus(sessionId);
        if (done) {
          clearInterval(interval);
          setPolling(false);
        }
      }, 10000);  // Poll every 10s
    }
    return () => clearInterval(interval);
  }, [polling, sessionId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem('diditSessionId');
      setPolling(false);
    };
  }, []);

  const resetKYC = () => {
    setStatus('Not started');
    setSessionId(null);
    setPolling(false);
    setError(null);
    localStorage.removeItem('diditSessionId');
  };

  const isVerified = status.includes('Verified!');

  return (
    <div style={{ 
      minHeight: '50vh', 
      backgroundColor: '#000000', 
      color: '#ffffff', 
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ 
        width: '100%', 
        maxWidth: '800px', 
        textAlign: 'center', 
        marginBottom: '40px',
        borderBottom: '1px solid #2c2c2c',
        paddingBottom: '20px'
      }}>
        <h1 style={{ margin: 0, color: '#2e7d32', fontSize: '2.5em' }}>Commodity Tokenization</h1>
        <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>Securely tokenize real-world assets with KYC verification</p>
      </header>

      <main style={{ 
        width: '100%', 
        maxWidth: '800px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Status Section */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          borderRadius: '10px', 
          padding: '20px', 
          width: '100%', 
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>Verification Status</h2>
          <p style={{ 
            margin: '0 0 15px 0', 
            fontSize: '1.1em',
            color: status.includes('Error') || status.includes('rejected') ? '#616161' : status.includes('Verified') ? '#4caf50' : '#ffffff'
          }}>
            {status}
          </p>
          {error && (
            <p style={{ color: '#616161', fontSize: '0.9em', margin: '10px 0' }}>
              {error}
            </p>
          )}
          {polling && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <div style={{ width: '20px', height: '20px', border: '2px solid #2c2c2c', borderTop: '2px solid #2e7d32', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <span>Polling for results...</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {status === 'Not started' && !loading && (
            <button 
              onClick={startKYC} 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#4caf50', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '1em', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Start KYC Verification
            </button>
          )}
          {loading && (
            <button disabled style={{ padding: '12px 24px', backgroundColor: '#2c2c2c', color: '#ffffff', border: 'none', borderRadius: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', border: '2px solid #ffffff', borderTop: '2px solid #2e7d32', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                Starting...
              </div>
            </button>
          )}
          {(error || status.includes('rejected')) && (
            <button 
              onClick={startKYC} 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#616161', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '1em', 
                cursor: 'pointer'
              }}
            >
              Retry KYC
            </button>
          )}
          {polling && (
            <button 
              onClick={() => setPolling(false)} 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#2c2c2c', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '1em', 
                cursor: 'pointer'
              }}
            >
              Stop Polling
            </button>
          )}
          {(status.includes('Error') || status.includes('rejected')) && (
            <button 
              onClick={resetKYC} 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#66bb6a', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '1em', 
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Verified Section */}
        {isVerified && (
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            borderRadius: '10px', 
            padding: '20px', 
            width: '100%', 
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ margin: '0 0 15px 0', color: '#4caf50' }}>✅ KYC Complete!</h2>
            <p style={{ margin: '0 0 20px 0' }}>You are now verified. Select an asset to tokenize:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {assets.map((asset) => (
                <button 
                  key={asset} 
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#4caf50', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                  onClick={() => alert(`Tokenizing ${asset}... (Integrate your tokenization logic here)`)}  // Placeholder
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          h1 { font-size: 2em; }
          button { width: 100%; margin-bottom: 10px; }
        }
      `}</style>
    </div>
  );
}

export default App;