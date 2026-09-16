"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

export default function AddBorderClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [thickness, setThickness] = useState(24);
  const [color, setColor] = useState("#ffffff");
  const [radius, setRadius] = useState(0);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
  };

  const buildCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width + thickness * 2;
    canvas.height = img.height + thickness * 2;
    const ctx = canvas.getContext("2d");

    const r = radius;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, r);
    ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, r);
    ctx.arcTo(0, canvas.height, 0, 0, r);
    ctx.arcTo(0, 0, canvas.width, 0, r);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.drawImage(img, thickness, thickness);
    return canvas;
  };

  const download = () => {
    if (!img) return;
    const canvas = buildCanvas();
    canvas.toBlob((blob) => downloadBlob(blob, `bordered-${file.name.replace(/\.\w+$/, "")}.png`), "image/png");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Add Border to Image</h1>
      <p className="mt-2 text-gray-600">Frame any photo with a colored border and optional rounded corners.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <div className="flex justify-center rounded-xl bg-gray-100 p-6">
              <div
                style={{
                  padding: thickness / 2,
                  backgroundColor: color,
                  borderRadius: radius / 2,
                  maxWidth: "100%"
                }}
              >
                <img src={img.src} alt="preview" className="max-h-56 rounded-sm object-contain" style={{ borderRadius: Math.max(0, radius / 2 - thickness / 2) }} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Thickness: {thickness}px</label>
                <input type="range" min="0" max="120" value={thickness} onChange={(e) => setThickness(parseInt(e.target.value))} className="w-full accent-brand-600" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Corner radius: {radius}px</label>
                <input type="range" min="0" max="200" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} className="w-full accent-brand-600" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Border color</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-20 rounded-lg border border-gray-300" />
              </div>
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
