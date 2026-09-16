"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

export default function UpscaleClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("");

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
    setResultUrl(null);
  };

  const fallbackUpscale = (image, factor) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width * factor;
    canvas.height = image.height * factor;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  };

  const run = async () => {
    if (!img) return;
    setBusy(true);
    try {
      // Try the AI (ESRGAN-style) model first, runs fully on-device via TensorFlow.js
      // Loaded straight from the CDN (webpackIgnore) so the AI model libraries
      // never have to be bundled by the build. This is what was breaking the
      // production build earlier, so this fix is load-bearing, not cosmetic.
      await import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js");
      const UpscalerModule = await import(
        /* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/upscaler@1.0.0/dist/browser/esm/upscalerjs/src/browser/esm/index.js"
      );
      const Upscaler = UpscalerModule.default;
      const upscaler = new Upscaler();
      setMode("Running AI upscaler model…");
      const resultSrc = await upscaler.upscale(img);
      setResultUrl(resultSrc);
      const resp = await fetch(resultSrc);
      window.__pixforgeUpscaleBlob = await resp.blob();
    } catch (e) {
      // Fall back to a high-quality canvas resize (2x) if the AI model can't load
      setMode("AI model unavailable, using high-quality resize instead.");
      const canvas = fallbackUpscale(img, 2);
      canvas.toBlob((blob) => {
        window.__pixforgeUpscaleBlob = blob;
        setResultUrl(URL.createObjectURL(blob));
      }, "image/png");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Upscale Image <span className="ml-2 rounded-full bg-brand-100 px-2 py-1 text-xs font-bold text-brand-700 align-middle">AI</span></h1>
      <p className="mt-2 text-gray-600">
        Enlarge a small image using an on-device AI super-resolution model. If the model can't load on your
        device, PixForge automatically falls back to a smooth high-quality resize.
      </p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-800">Original ({img.width}×{img.height})</p>
                <img src={img.src} alt="original" className="w-full rounded-xl border border-gray-200" />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-800">Upscaled result</p>
                <div className="flex min-h-[150px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                  {resultUrl ? (
                    <img src={resultUrl} alt="result" className="w-full rounded-xl" />
                  ) : (
                    <span className="p-6 text-sm text-gray-400">{busy ? mode || "Processing…" : "Run the tool to see the result"}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={run} disabled={busy}>
                {busy ? "Processing…" : "Upscale Image"}
              </button>
              {resultUrl && (
                <button
                  className="btn-secondary"
                  onClick={() => downloadBlob(window.__pixforgeUpscaleBlob, `upscaled-${file.name.replace(/\.\w+$/, "")}.png`)}
                >
                  Download
                </button>
              )}
              <button className="btn-secondary" onClick={() => { setFile(null); setImg(null); setResultUrl(null); }}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
