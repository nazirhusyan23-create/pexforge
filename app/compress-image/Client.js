"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage, formatBytes } from "../../lib/downloadFile";

export default function CompressClient() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFile = (f) => {
    setFile(f);
    setResult(null);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const type = file.type === "image/png" ? "image/png" : "image/jpeg";
      canvas.toBlob(
        (blob) => {
          setResult(blob);
          setBusy(false);
        },
        type,
        quality
      );
    } catch (e) {
      setBusy(false);
      alert("Could not process this image.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Compress Image</h1>
      <p className="mt-2 text-gray-600">
        Reduce your image file size without losing visible quality. Everything happens locally in your
        browser, your photo is never uploaded anywhere.
      </p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop a JPG / PNG here" />}

        {file && (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <img src={previewUrl} alt="preview" className="h-40 w-40 rounded-xl object-cover" />
              <div className="flex-1 text-sm text-gray-600">
                <p><span className="font-semibold text-gray-900">{file.name}</span></p>
                <p>Original size: {formatBytes(file.size)}</p>
                {result && <p>New size: {formatBytes(result.size)} ({Math.round((1 - result.size / file.size) * 100)}% smaller)</p>}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={compress} disabled={busy}>
                {busy ? "Compressing…" : "Compress Image"}
              </button>
              {result && (
                <button
                  className="btn-secondary"
                  onClick={() => downloadBlob(result, `compressed-${file.name.replace(/\.\w+$/, "")}.jpg`)}
                >
                  Download
                </button>
              )}
              <button className="btn-secondary" onClick={() => { setFile(null); setResult(null); }}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
