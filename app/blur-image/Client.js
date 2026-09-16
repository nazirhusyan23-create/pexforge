"use client";

import { useRef, useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

const HANDLE_SIZE = 14;

export default function BlurClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [box, setBox] = useState({ x: 20, y: 20, w: 160, h: 120 });
  const [intensity, setIntensity] = useState(14);
  const [applyCount, setApplyCount] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const drag = useRef(null);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
    setApplyCount(0);
  };

  const startDrag = (mode) => (e) => {
    e.preventDefault();
    drag.current = { mode, startX: e.clientX, startY: e.clientY, box: { ...box } };
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    if (!drag.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    let { x, y, w, h } = drag.current.box;
    if (drag.current.mode === "move") {
      x = Math.min(Math.max(0, x + dx), rect.width - w);
      y = Math.min(Math.max(0, y + dy), rect.height - h);
    } else {
      w = Math.min(Math.max(30, w + dx), rect.width - x);
      h = Math.min(Math.max(30, h + dy), rect.height - y);
    }
    setBox({ x, y, w, h });
  };

  const stopDrag = () => {
    drag.current = null;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  const ensureCanvas = () => {
    if (!canvasRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvasRef.current = canvas;
    }
    return canvasRef.current;
  };

  const applyBlur = () => {
    if (!img || !containerRef.current) return;
    const canvas = ensureCanvas();
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = img.width / rect.width;
    const scaleY = img.height / rect.height;
    const sx = box.x * scaleX;
    const sy = box.y * scaleY;
    const sw = box.w * scaleX;
    const sh = box.h * scaleY;

    const region = document.createElement("canvas");
    region.width = sw;
    region.height = sh;
    const rctx = region.getContext("2d");
    rctx.filter = `blur(${intensity}px)`;
    rctx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);

    const mainCtx = canvas.getContext("2d");
    mainCtx.drawImage(region, sx, sy);
    setApplyCount((c) => c + 1);
  };

  const download = () => {
    const canvas = ensureCanvas();
    canvas.toBlob((blob) => downloadBlob(blob, `blurred-${file.name.replace(/\.\w+$/, "")}.png`), "image/png");
  };

  const reset = () => {
    setFile(null);
    setImg(null);
    canvasRef.current = null;
    setApplyCount(0);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Blur Image</h1>
      <p className="mt-2 text-gray-600">
        Drag a box over a face, license plate or any sensitive area, then blur it. Move the box and
        apply again to blur more than one spot.
      </p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <div ref={containerRef} className="relative mx-auto w-full max-w-2xl select-none">
              <img
                src={applyCount > 0 ? canvasRef.current.toDataURL() : img.src}
                alt="preview"
                className="w-full rounded-xl"
                draggable={false}
              />
              <div
                onMouseDown={startDrag("move")}
                className="absolute cursor-move border-2 border-brand-500 bg-brand-500/10"
                style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
              >
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    startDrag("resize")(e);
                  }}
                  className="absolute bottom-0 right-0 cursor-se-resize rounded-full border-2 border-white bg-brand-600"
                  style={{ width: HANDLE_SIZE, height: HANDLE_SIZE, transform: "translate(50%, 50%)" }}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Blur strength: {intensity}px</label>
              <input
                type="range"
                min="4"
                max="40"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={applyBlur}>Blur this area</button>
              {applyCount > 0 && (
                <button className="btn-secondary" onClick={download}>Download</button>
              )}
              <button className="btn-secondary" onClick={reset}>Start over</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
