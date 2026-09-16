"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

const POSITIONS = {
  "top-left": (w, h, tw, th) => [20, th + 10],
  "top-right": (w, h, tw, th) => [w - tw - 20, th + 10],
  "bottom-left": (w, h, tw, th) => [20, h - 20],
  "bottom-right": (w, h, tw, th) => [w - tw - 20, h - 20],
  center: (w, h, tw, th) => [(w - tw) / 2, h / 2]
};

export default function WatermarkClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [text, setText] = useState("© PixForge");
  const [opacity, setOpacity] = useState(0.6);
  const [size, setSize] = useState(32);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState("bottom-right");

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
  };

  const buildCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    ctx.font = `bold ${size}px sans-serif`;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    const metrics = ctx.measureText(text);
    const [x, y] = POSITIONS[position](canvas.width, canvas.height, metrics.width, size);
    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;
    return canvas;
  };

  const download = () => {
    if (!img) return;
    const canvas = buildCanvas();
    canvas.toBlob((blob) => downloadBlob(blob, `watermarked-${file.name.replace(/\.\w+$/, "")}.png`), "image/png");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Watermark Image</h1>
      <p className="mt-2 text-gray-600">Stamp a text watermark onto your photo to protect your work.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-xl bg-gray-100">
              <img src={img.src} alt="preview" className="w-full" />
              <span
                className="pointer-events-none absolute font-bold"
                style={{
                  color,
                  opacity,
                  fontSize: size / 2,
                  ...(position.includes("top") ? { top: 8 } : {}),
                  ...(position.includes("bottom") ? { bottom: 8 } : {}),
                  ...(position.includes("left") ? { left: 8 } : {}),
                  ...(position.includes("right") ? { right: 8 } : {}),
                  ...(position === "center" ? { top: "50%", left: "50%", transform: "translate(-50%,-50%)" } : {})
                }}
              >
                {text}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Watermark text</label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Position</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2"
                >
                  {Object.keys(POSITIONS).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Font size: {size}px</label>
                <input type="range" min="12" max="120" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full accent-brand-600" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Opacity: {Math.round(opacity * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full accent-brand-600" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Color</label>
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

      <article className="prose prose-sm mt-12 max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-900">How to add a watermark to a photo</h2>
        <p>
          Type the text you want stamped onto your image, choose its position, size, color and opacity,
          and PixForge draws it directly onto a copy of your photo using the canvas API. Because
          everything renders locally, you can adjust the watermark and preview it live before saving.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Why watermark your images</h2>
        <p>
          A visible watermark helps protect photos you share online — on a portfolio, social media, or
          a marketplace listing — by making it clear who owns the work and discouraging unauthorized
          reuse. A low-opacity watermark in a corner is usually enough without distracting from the photo.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        <p>
          <strong>Can I control how visible the watermark is?</strong> Yes, the opacity slider lets you
          make it subtle or bold. <strong>Does the tool store my images?</strong> No, nothing is uploaded
          or saved anywhere outside your own device.
        </p>
      </article>
    </div>
  );
}
