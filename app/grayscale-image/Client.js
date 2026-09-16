"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

export default function GrayscaleClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [amount, setAmount] = useState(100);
  const [sepia, setSepia] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
    render(image, 100, false);
  };

  const render = (image, amt, sep) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = sep ? `sepia(${amt}%)` : `grayscale(${amt}%)`;
    ctx.drawImage(image, 0, 0);
    setPreviewUrl(canvas.toDataURL());
    return canvas;
  };

  const onChange = (amt, sep) => {
    setAmount(amt);
    setSepia(sep);
    if (img) render(img, amt, sep);
  };

  const download = () => {
    if (!img) return;
    const canvas = render(img, amount, sepia);
    canvas.toBlob((blob) => downloadBlob(blob, `bw-${file.name.replace(/\.\w+$/, "")}.png`), "image/png");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Grayscale / Black &amp; White Converter</h1>
      <p className="mt-2 text-gray-600">Turn any photo black and white, or give it a warm sepia tone.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <img src={previewUrl} alt="preview" className="mx-auto max-h-72 rounded-xl object-contain" />

            <div className="flex gap-3">
              <button
                onClick={() => onChange(amount, false)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${!sepia ? "border-brand-600 bg-brand-600 text-white" : "border-gray-300 bg-white text-gray-700"}`}
              >
                Black &amp; White
              </button>
              <button
                onClick={() => onChange(amount, true)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${sepia ? "border-brand-600 bg-brand-600 text-white" : "border-gray-300 bg-white text-gray-700"}`}
              >
                Sepia
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Intensity: {amount}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={amount}
                onChange={(e) => onChange(parseInt(e.target.value), sepia)}
                className="w-full accent-brand-600"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={download}>Download</button>
              <button className="btn-secondary" onClick={() => { setFile(null); setImg(null); }}>Start over</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
