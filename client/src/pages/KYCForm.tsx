import React, { useState, useEffect, useRef } from "react";

type VerifyResponse = {
  verified: boolean;
  reason?: string;
  similarity?: {
    id_front_vs_id_back?: number | null;
    selfie_vs_id_front?: number | null;
    selfie_vs_id_back?: number | null;
  };
  thresholds?: {
    similarity_threshold?: number;
    id_to_id_threshold?: number;
  };
  error?: string;
  ocrResults?: any;
};

export default function KycVerify() {
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // keep refs to object URLs so we can revoke them
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current = [];
    };
  }, []);

  function handleFileChange(
    fileSetter: React.Dispatch<React.SetStateAction<File | null>>,
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files && e.target.files[0];
      if (!f) {
        fileSetter(null);
        previewSetter(null);
        return;
      }
      if (!f.type.startsWith("image/")) {
        setError("Please select an image file.");
        fileSetter(null);
        previewSetter(null);
        return;
      }
      const url = URL.createObjectURL(f);
      urlsRef.current.push(url);
      fileSetter(f);
      previewSetter(url);
      setError(null);
    };
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setResult(null);
    setError(null);
    setStatusMessage(null);

    if (!idFrontFile || !idBackFile || !selfieFile) {
      setError("Please choose ID front, ID back, and a selfie.");
      return;
    }

    setLoading(true);
    setStatusMessage("Uploading images...");

    const fd = new FormData();
    fd.append("id_front", idFrontFile);
    fd.append("id_back", idBackFile);
    fd.append("selfie", selfieFile);

    let ocrData: any = null;

    // ---------- 1️⃣ Call OCR API ----------
    try {
      console.log("Sending OCR request...");
      const ocrRes = await fetch("http://localhost:5003/read_id", {
        method: "POST",
        body: fd,
      });

      console.log("OCR response status:", ocrRes.status);
      ocrData = await ocrRes.json();

      if (!ocrRes.ok) {
        console.warn("OCR returned error:", ocrData);
      } else {
        console.log("OCR Results:", ocrData);
      }
    } catch (err) {
      console.warn("OCR request failed, continuing anyway:", err);
    }

    // ---------- 2️⃣ Always Call Verify API ----------
    try {
      setStatusMessage("Verifying face with ID...");
      console.log("Sending VERIFY request...");

      const verifyRes = await fetch("http://localhost:5000/verify", {
        method: "POST",
        body: fd,
      });

      console.log("VERIFY response status:", verifyRes.status);

      const verifyData: VerifyResponse = await verifyRes.json();

      if (!verifyRes.ok) {
        setResult({ ...verifyData, ocrResults: ocrData });
        setError(verifyData.error ?? verifyData.reason ?? `Verification failed`);
      } else {
        setResult({ ...verifyData, ocrResults: ocrData });
        setStatusMessage(
          verifyData.verified ? "User VERIFIED" : "Not verified"
        );
      }
    } catch (err: any) {
      console.error("Verify request failed:", err);
      setError(err.message || "Verify request failed");
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setIdFrontFile(null);
    setIdBackFile(null);
    setSelfieFile(null);

    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current = [];

    setIdFrontPreview(null);
    setIdBackPreview(null);
    setSelfiePreview(null);
    setResult(null);
    setError(null);
    setStatusMessage(null);
  }

  return (
    <div
      style={{
        maxWidth: 820,
        margin: "1.5rem auto",
        fontFamily: "Inter, Arial, sans-serif",
        backgroundColor: "black",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>KYC Face Verify</h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <label>
            <div style={{ fontWeight: 600 }}>ID Front</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setIdFrontFile, setIdFrontPreview)}
              disabled={loading}
            />
          </label>

          <label>
            <div style={{ fontWeight: 600 }}>ID Back</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setIdBackFile, setIdBackPreview)}
              disabled={loading}
            />
          </label>

          <label style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontWeight: 600 }}>Selfie</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setSelfieFile, setSelfiePreview)}
              disabled={loading}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <button
            type="button"
            onClick={resetAll}
            disabled={loading}
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              background: "#e5e7eb",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {idFrontPreview && (
          <div style={{ width: 220 }}>
            <div style={{ fontSize: 12, color: "#374151" }}>Preview — ID Front</div>
            <img
              src={idFrontPreview}
              alt="ID Front preview"
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />
            {idFrontFile && (
              <div style={{ fontSize: 12, marginTop: 6 }}>{idFrontFile.name}</div>
            )}
          </div>
        )}

        {idBackPreview && (
          <div style={{ width: 220 }}>
            <div style={{ fontSize: 12, color: "#374151" }}>Preview — ID Back</div>
            <img
              src={idBackPreview}
              alt="ID Back preview"
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />
            {idBackFile && (
              <div style={{ fontSize: 12, marginTop: 6 }}>{idBackFile.name}</div>
            )}
          </div>
        )}

        {selfiePreview && (
          <div style={{ width: 220 }}>
            <div style={{ fontSize: 12, color: "#374151" }}>Preview — Selfie</div>
            <img
              src={selfiePreview}
              alt="Selfie preview"
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />
            {selfieFile && (
              <div style={{ fontSize: 12, marginTop: 6 }}>{selfieFile.name}</div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        {statusMessage && (
          <div
            style={{
              padding: 10,
              background: "gray",
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            {statusMessage}
          </div>
        )}

        {error && (
          <div
            style={{
              color: "white",
              background: "#ef4444",
              padding: 10,
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            {error}
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: 8,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #e6edf9",
              background: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>Result</h3>
              <div
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: result.verified ? "#ecfdf5" : "#fff1f2",
                  color: result.verified ? "#065f46" : "#991b1b",
                  fontWeight: 700,
                }}
              >
                {result.verified ? "VERIFIED ✅" : "NOT VERIFIED ❌"}
              </div>
            </div>

            {result.reason && (
              <div style={{ marginTop: 8, color: "#374151" }}>{result.reason}</div>
            )}

            <pre
              style={{
                marginTop: 12,
                maxHeight: 260,
                overflow: "auto",
                background: "#11182710",
                padding: 12,
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>

            {result?.ocrResults && (
              <pre
                style={{
                  marginTop: 12,
                  maxHeight: 200,
                  overflow: "auto",
                  background: "#11182710",
                  padding: 12,
                }}
              >
                {JSON.stringify(result.ocrResults, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
