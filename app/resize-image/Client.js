"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
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

      <article className="prose prose-sm mt-12 max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-900">How image resizing works</h2>
        <p>
          PixForge loads your image into memory and redraws it onto an HTML canvas at the exact
          width and height you choose, then re-encodes the canvas back into a JPG, PNG or WEBP file.
          Because the resize happens with the canvas API in your own browser, there is no upload step
          and no waiting on a server queue — you see the result the instant it is ready.
        </p>
        <h2 className="text-xl font-bold text-gray-900">When to resize an image</h2>
        <p>
          Resizing is useful before uploading a profile photo, preparing a product image for an online
          store, or shrinking a photo so it fits a specific banner or thumbnail size without cropping
          any content out. Locking the aspect ratio keeps your photo from looking stretched or squashed.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        <p>
          <strong>Will resizing reduce quality?</strong> Making an image smaller rarely causes visible
          quality loss; enlarging a small image can look soft, so for big upscales try the dedicated
          upscale tool instead. <strong>Is there a file size limit?</strong> You can resize images up to
          several thousand pixels wide, limited only by your device's memory. <strong>Is it private?</strong>
          Yes — the image is processed locally and never leaves your browser.
        </p>
      </article>
    </div>
  );
}
