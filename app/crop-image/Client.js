"use client";

import { useRef, useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

const HANDLE_SIZE = 14;

export default function CropClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [box, setBox] = useState({ x: 20, y: 20, w: 200, h: 150 });
  const containerRef = useRef(null);
  const drag = useRef(null);

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
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
    } else if (drag.current.mode === "resize") {
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

  const crop = () => {
    if (!img || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = img.width / rect.width;
    const scaleY = img.height / rect.height;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(box.w * scaleX);
    canvas.height = Math.round(box.h * scaleY);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      box.x * scaleX,
      box.y * scaleY,
      box.w * scaleX,
      box.h * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    canvas.toBlob((blob) => downloadBlob(blob, `cropped-${file.name.replace(/\.\w+$/, "")}.png`), "image/png");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Crop Image</h1>
      <p className="mt-2 text-gray-600">Drag the box to move it, drag the bottom-right handle to resize.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <div ref={containerRef} className="relative mx-auto w-full max-w-2xl select-none">
              <img src={img.src} alt="preview" className="w-full rounded-xl" draggable={false} />
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

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={crop}>Crop & Download</button>
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
