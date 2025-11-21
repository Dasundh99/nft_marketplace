import { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('Not started');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<string[]>([]);
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}`);
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
      const res = await fetch(`${BACKEND_URL}/start-kyc`, { method: 'POST' });
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();
      const { verifyUrl, sessionId: id } = data;
      if (!verifyUrl || !id) throw new Error('Missing verifyUrl or sessionId');
      setSessionId(id);
      window.open(
        verifyUrl,
        'kycPopup',
        'width=450,height=650,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no'
      );
      setStatus('Verification started—check the popup window!');
      localStorage.setItem('diditSessionId', id);
      setPolling(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      setStatus('Not started');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/check-status/${id}`);
      if (!res.ok) throw new Error(`Poll error: ${res.status}`);
      const data = await res.json();
      setStatus(`Status: ${data.status || 'unknown'}`);
      if (data.status === 'approved') {
        await fetch(`${BACKEND_URL}/api/update-user-kyc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'mockUser123', verified: true }),
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
      return true;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (polling && sessionId) {
      interval = setInterval(async () => {
        const done = await checkStatus(sessionId);
        if (done) clearInterval(interval);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [polling, sessionId]);

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
    <div className=" bg-black text-white font-sans p-4 flex flex-col items-center">
      <header className="w-full max-w-2xl text-center mb-6 border-b border-gray-800 pb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">Commodity Tokenization</h1>
        <p className="mt-1 text-gray-400 text-sm">Securely tokenize real-world assets with KYC verification</p>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center gap-4">
        {/* Status Box */}
        <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-center shadow-md">
          <h2 className="text-green-600 font-semibold text-md mb-1">Verification Status</h2>
          <p
            className={`text-sm ${
              status.includes('Error') || status.includes('rejected')
                ? 'text-red-500'
                : status.includes('Verified')
                ? 'text-green-500'
                : 'text-white'
            }`}
          >
            {status}
          </p>
          {error && <p className="text-gray-500 text-xs mt-1">{error}</p>}

          {polling && (
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="w-4 h-4 border-2 border-gray-700 border-t-green-500 rounded-full animate-spin" />
              <span className="text-gray-400 text-xs">Polling for results...</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {status === 'Not started' && !loading && (
            <button
              onClick={startKYC}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all text-sm"
            >
              Start KYC Verification
            </button>
          )}
          {loading && (
            <button
              disabled
              className="px-4 py-1.5 bg-gray-800 text-gray-300 font-semibold rounded-md flex items-center gap-1 text-sm animate-pulse"
            >
              <div className="w-4 h-4 border-2 border-white border-t-green-500 rounded-full animate-spin" />
              Starting...
            </button>
          )}
          {(error || status.includes('rejected')) && (
            <button
              onClick={startKYC}
              className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition-all text-sm"
            >
              Retry KYC
            </button>
          )}
          {polling && (
            <button
              onClick={() => setPolling(false)}
              className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md transition-all text-sm"
            >
              Stop Polling
            </button>
          )}
          {(status.includes('Error') || status.includes('rejected')) && (
            <button
              onClick={resetKYC}
              className="px-4 py-1.5 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-all text-sm"
            >
              Reset
            </button>
          )}
        </div>

        {/* Verified Section */}
        {isVerified && (
          <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-center shadow-md">
            <h2 className="text-green-500 font-semibold text-md mb-1">✅ KYC Complete!</h2>
            <p className="text-gray-400 text-sm mb-2">You are now verified. Select an asset to tokenize:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {assets.map((asset) => (
                <button
                  key={asset}
                  onClick={() => alert(`Tokenizing ${asset}...`)}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all text-sm"
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 600px) {
          h1 { font-size: 1.5em; }
          button { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default App;
