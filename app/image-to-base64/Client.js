"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";

export default function Base64Client() {
  const [file, setFile] = useState(null);
  const [dataUrl, setDataUrl] = useState("");
  const [copied, setCopied] = useState("");

  const handleFile = (f) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setDataUrl(reader.result);
    reader.readAsDataURL(f);
  };

  const imgTag = `<img src="${dataUrl}" alt="" />`;

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Image to Base64 Converter</h1>
      <p className="mt-2 text-gray-600">Turn an image into a Base64-encoded data URL you can paste into code.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && dataUrl && (
          <div className="space-y-6">
            <img src={dataUrl} alt="preview" className="mx-auto max-h-48 rounded-xl border border-gray-200 object-contain" />

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">Base64 data URL</label>
                <button className="text-xs font-semibold text-brand-600" onClick={() => copy(dataUrl, "url")}>
                  {copied === "url" ? "Copied!" : "Copy"}
                </button>
              </div>
              <textarea readOnly value={dataUrl} rows={6} className="w-full rounded-xl border border-gray-300 p-3 font-mono text-xs" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">As an HTML &lt;img&gt; tag</label>
                <button className="text-xs font-semibold text-brand-600" onClick={() => copy(imgTag, "tag")}>
                  {copied === "tag" ? "Copied!" : "Copy"}
                </button>
              </div>
              <textarea readOnly value={imgTag} rows={3} className="w-full rounded-xl border border-gray-300 p-3 font-mono text-xs" />
            </div>

            <button className="btn-secondary" onClick={() => { setFile(null); setDataUrl(""); }}>
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
