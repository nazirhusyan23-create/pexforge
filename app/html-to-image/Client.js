"use client";

import { useRef, useState } from "react";
import { downloadBlob } from "../../lib/downloadFile";

const DEFAULT_HTML = `<div style="padding:40px;background:linear-gradient(135deg,#3382ff,#173fb5);color:white;font-family:sans-serif;border-radius:16px;width:480px;">
  <h1 style="margin:0 0 8px;font-size:28px;">Hello, PixForge!</h1>
  <p style="margin:0;opacity:.85;">Edit this HTML on the left and export it as a PNG.</p>
</div>`;

export default function HtmlToImageClient() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef(null);

  const exportImage = async () => {
    if (!previewRef.current) return;
    setBusy(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(previewRef.current, { backgroundColor: null, scale: 2 });
      canvas.toBlob((blob) => downloadBlob(blob, "html-to-image.png"), "image/png");
    } catch (e) {
      alert("Could not render this HTML.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">HTML to Image</h1>
      <p className="mt-2 text-gray-600">Paste HTML, preview it live, and export a PNG snapshot.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <label className="mb-2 block text-sm font-semibold text-gray-800">HTML source</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={16}
            className="w-full rounded-xl border border-gray-300 p-3 font-mono text-sm"
          />
          <button className="btn-primary mt-4" onClick={exportImage} disabled={busy}>
            {busy ? "Rendering…" : "Export as PNG"}
          </button>
        </div>

        <div className="card overflow-auto">
          <p className="mb-2 text-sm font-semibold text-gray-800">Live preview</p>
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-gray-50 p-6">
            <div ref={previewRef} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </div>
  );
}
