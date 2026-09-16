"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

export default function RotateClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
  };

  const buildCanvas = () => {
    const rad = (angle * Math.PI) / 180;
    const swap = angle % 180 !== 0;
    const w = swap ? img.height : img.width;
    const h = swap ? img.width : img.height;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.translate(w / 2, h / 2);
    ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    return canvas;
  };

  const download = () => {
    if (!img) return;
    const canvas = buildCanvas();
    canvas.toBlob((blob) => downloadBlob(blob, `rotated-${file.name.replace(/\.\w+$/, "")}.png`), "image/png");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Rotate Image</h1>
      <p className="mt-2 text-gray-600">Rotate to any angle and flip horizontally or vertically.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <div className="flex justify-center overflow-hidden rounded-xl bg-gray-100 p-6">
              <img
                src={img.src}
                alt="preview"
                className="max-h-64 transition-transform"
                style={{
                  transform: `rotate(${angle}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="btn-secondary" onClick={() => setAngle((a) => (a - 90 + 360) % 360)}>⟲ Rotate left</button>
              <button className="btn-secondary" onClick={() => setAngle((a) => (a + 90) % 360)}>⟳ Rotate right</button>
              <button className="btn-secondary" onClick={() => setFlipH((v) => !v)}>⇋ Flip horizontal</button>
              <button className="btn-secondary" onClick={() => setFlipV((v) => !v)}>⇵ Flip vertical</button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Fine angle: {angle}°</label>
              <input
                type="range"
                min="0"
                max="359"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={download}>Download</button>
              <button className="btn-secondary" onClick={() => { setFile(null); setImg(null); setAngle(0); setFlipH(false); setFlipV(false); }}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      <article className="prose prose-sm mt-12 max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-900">How image rotation works</h2>
        <p>
          The slider rotates your photo by any angle from 0 to 359 degrees, and the flip buttons mirror
          it horizontally or vertically. PixForge applies these transforms directly on an HTML canvas,
          so you can preview the exact result before downloading — no guessing and no re-uploading.
        </p>
        <h2 className="text-xl font-bold text-gray-900">When you might need this</h2>
        <p>
          Phones sometimes save photos sideways or upside down depending on how the camera was held;
          a quick 90 or 180 degree rotation fixes that instantly. Flipping is useful for mirroring a
          logo, correcting a scanned document, or creating a reversed version of an image for design work.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        <p>
          <strong>Does rotating reduce image quality?</strong> No, rotation and flipping simply
          reposition pixels and do not resample or compress the image. <strong>Is it free to use?</strong>
          Yes, with no watermark and no signup required.
        </p>
      </article>
    </div>
  );
}
