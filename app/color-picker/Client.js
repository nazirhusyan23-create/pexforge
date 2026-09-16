"use client";

import { useRef, useState } from "react";
import Uploader from "../../components/Uploader";
import { loadImage } from "../../lib/downloadFile";

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export default function ColorPickerClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [picked, setPicked] = useState(null);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState("");
  const canvasRef = useRef(null);
  const imgElRef = useRef(null);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
    setPicked(null);
    setHistory([]);
  };

  const pick = (e) => {
    const imgEl = imgElRef.current;
    if (!imgEl || !img) return;
    const rect = imgEl.getBoundingClientRect();
    const scaleX = img.width / rect.width;
    const scaleY = img.height / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    if (!canvasRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      canvasRef.current = canvas;
    }
    const ctx = canvasRef.current.getContext("2d");
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(r, g, b);
    setPicked({ hex, rgb: `rgb(${r}, ${g}, ${b})` });
    setHistory((h) => [hex, ...h.filter((c) => c !== hex)].slice(0, 12));
  };

  const copy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Image Color Picker</h1>
      <p className="mt-2 text-gray-600">Click anywhere on a photo to grab its exact hex and RGB color.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <img
              ref={imgElRef}
              src={img.src}
              alt="preview"
              onClick={pick}
              className="mx-auto max-h-96 cursor-crosshair rounded-xl object-contain"
            />

            {picked && (
              <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 p-4">
                <div className="h-14 w-14 rounded-lg border border-gray-200" style={{ backgroundColor: picked.hex }} />
                <div className="flex flex-wrap gap-3 text-sm">
                  <button onClick={() => copy(picked.hex)} className="btn-secondary">
                    {copied === picked.hex ? "Copied!" : picked.hex}
                  </button>
                  <button onClick={() => copy(picked.rgb)} className="btn-secondary">
                    {copied === picked.rgb ? "Copied!" : picked.rgb}
                  </button>
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-800">Recently picked</p>
                <div className="flex flex-wrap gap-2">
                  {history.map((c) => (
                    <button
                      key={c}
                      onClick={() => copy(c)}
                      title={c}
                      className="h-9 w-9 rounded-lg border border-gray-200"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            <button className="btn-secondary" onClick={() => { setFile(null); setImg(null); canvasRef.current = null; }}>
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
