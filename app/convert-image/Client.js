"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

const FORMATS = [
  { value: "image/jpeg", ext: "jpg", label: "JPG" },
  { value: "image/png", ext: "png", label: "PNG" },
  { value: "image/webp", ext: "webp", label: "WEBP" }
];

export default function ConvertClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [format, setFormat] = useState(FORMATS[0]);
  const [busy, setBusy] = useState(false);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
  };

  const convert = () => {
    if (!img) return;
    setBusy(true);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (format.value === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(
      (blob) => {
        downloadBlob(blob, `converted-${file.name.replace(/\.\w+$/, "")}.${format.ext}`);
        setBusy(false);
      },
      format.value,
      0.92
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Convert Image</h1>
      <p className="mt-2 text-gray-600">Switch your image between JPG, PNG and WEBP formats instantly.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <img src={img.src} alt="preview" className="mx-auto max-h-64 rounded-xl object-contain" />

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Convert to</label>
              <div className="flex gap-3">
                {FORMATS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFormat(f)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                      format.value === f.value
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={convert} disabled={busy}>
                {busy ? "Converting…" : `Convert to ${format.label} & Download`}
              </button>
              <button className="btn-secondary" onClick={() => { setFile(null); setImg(null); }}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
