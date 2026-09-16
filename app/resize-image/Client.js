"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import AdSlot from "../../components/AdSlot";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

export default function ResizeClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [busy, setBusy] = useState(false);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
    setWidth(image.width);
    setHeight(image.height);
  };

  const onWidthChange = (w) => {
    setWidth(w);
    if (lockRatio && img) setHeight(Math.round((w / img.width) * img.height));
  };

  const onHeightChange = (h) => {
    setHeight(h);
    if (lockRatio && img) setWidth(Math.round((h / img.height) * img.width));
  };

  const resize = () => {
    if (!img) return;
    setBusy(true);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob((blob) => {
      downloadBlob(blob, `resized-${file.name.replace(/\.\w+$/, "")}.png`);
      setBusy(false);
    }, "image/png");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Resize Image</h1>
      <p className="mt-2 text-gray-600">Set an exact width and height, then download instantly.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <img src={img.src} alt="preview" className="mx-auto max-h-64 rounded-xl object-contain" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => onWidthChange(parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => onHeightChange(parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} />
              Lock aspect ratio
            </label>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={resize} disabled={busy}>
                {busy ? "Resizing…" : "Resize & Download"}
              </button>
              <button className="btn-secondary" onClick={() => { setFile(null); setImg(null); }}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <AdSlot slot="3333333333" />
      </div>
    </div>
  );
}
