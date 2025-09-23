import React, { useState } from "react";

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

      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Server error");
      }

      const data = await response.json();
      console.log("Server response:", data);

      if (data.status === "success") {
        if (data.verified) {
          setSuccess("✅ KYC Verified! ID match the selfie.");
        } else {
          let msg = "⚠ KYC Verification Error:\n";
          // msg += data.match_front ? "Front ID matches selfie.\n" : "Front ID does NOT match selfie.\n";
          // msg += data.match_back ? "Back ID matches selfie.\n" : "Back ID does NOT match selfie.\n";
          setError(msg);
        }
      } else {
        setError("KYC verification failed: " + (data.message || "Unknown error"));
      }
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setSelfie, setSelfiePreview)}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {selfiePreview && (
            <img src={selfiePreview} alt="selfie-preview" className="mt-3 w-40 h-40 object-cover rounded-full shadow-md" />
          )}
        </div>

        {error && <p className="text-red-600 whitespace-pre-line text-sm">{error}</p>}
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
