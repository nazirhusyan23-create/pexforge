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
    </div>
  );
}
