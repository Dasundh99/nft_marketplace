import React, { useRef, useState } from "react";

type Props = {
  maxFileSizeMB?: number;
};

export default function KycUploadForm({ maxFileSizeMB = 5 }: Props) {
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const maxBytes = maxFileSizeMB * 1024 * 1024;

  function validateFile(f: File | null) {
    if (!f) return true;
    if (!f.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return false;
    }
    if (f.size > maxBytes) {
      setError(`File must be smaller than ${maxFileSizeMB} MB.`);
      return false;
    }
    setError(null);
    return true;
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    if (f && !validateFile(f)) return;
    setter(f);
    previewSetter(f ? URL.createObjectURL(f) : null);
  }

  async function startCamera() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCapturing(true);
    } catch (err) {
      console.error(err);
      setError("Unable to access camera. Please allow camera permissions or use file upload.");
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCapturing(false);
  }

  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `selfie_${Date.now()}.jpg`, { type: "image/jpeg" });
      if (!validateFile(file)) return;
      setSelfie(file);
      setSelfiePreview(URL.createObjectURL(file));
      stopCamera();
    }, "image/jpeg");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idFront || !idBack || !selfie) {
      setError("Please provide all three images: ID front, ID back, and a selfie.");
      return;
    }
    if (!validateFile(idFront) || !validateFile(idBack) || !validateFile(selfie)) return;

    const form = new FormData();
    form.append("id_front", idFront);
    form.append("id_back", idBack);
    form.append("selfie", selfie);

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("http://localhost:3003/verify", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Server error");
      }

      const data = await response.json();
      console.log("Server response:", data);
      setSuccess("KYC verification submitted successfully!");
    } catch (err: any) {
      console.error(err);
      setError("Failed to submit KYC. " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setIdFront(null);
    setIdBack(null);
    setSelfie(null);
    setIdFrontPreview(null);
    setIdBackPreview(null);
    setSelfiePreview(null);
    setError(null);
    setSuccess(null);
    stopCamera();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">KYC Verification</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ID Front */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID — Front*</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setIdFront, setIdFrontPreview)}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {idFrontPreview && (
            <img src={idFrontPreview} alt="id-front" className="mt-2 w-48 h-28 object-cover rounded-md shadow-sm" />
          )}
        </div>

        {/* ID Back */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID — Back*</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setIdBack, setIdBackPreview)}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {idBackPreview && (
            <img src={idBackPreview} alt="id-back" className="mt-2 w-48 h-28 object-cover rounded-md shadow-sm" />
          )}
        </div>

        {/* Selfie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selfie*</label>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setSelfie, setSelfiePreview)}
              className="text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => (capturing ? stopCamera() : startCamera())}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {capturing ? "Stop Camera" : "Use Camera"}
              </button>

              {capturing && (
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Capture
                </button>
              )}
            </div>
          </div>

          {capturing && (
            <div className="mt-3">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {selfiePreview && (
            <img src={selfiePreview} alt="selfie-preview" className="mt-3 w-40 h-40 object-cover rounded-full shadow-md" />
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <div className="flex justify-end gap-3 mt-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2 text-white rounded-md transition ${loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"}`}
          >
            {loading ? "Submitting..." : "Verify Wallet"}
          </button>
        </div>
      </form>
    </div>
  );
}
