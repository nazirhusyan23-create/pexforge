"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob } from "../../lib/downloadFile";

export default function RemoveBgClient() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");

  const handleFile = (f) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResultUrl(null);
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setProgress("Loading AI model (first run downloads it, then it's cached)…");
    try {
      const { removeBackground } = await import(
        /* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/dist/index.mjs"
      );
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          setProgress(`Downloading model: ${key} (${Math.round((current / total) * 100)}%)`);
        }
      });
      setResultUrl(URL.createObjectURL(blob));
      window.__pixforgeLastBlob = blob;
    } catch (e) {
      alert("Background removal failed. Try a smaller image or a different browser.");
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Remove Background <span className="ml-2 rounded-full bg-brand-100 px-2 py-1 text-xs font-bold text-brand-700 align-middle">AI</span></h1>
      <p className="mt-2 text-gray-600">
        Automatically erase the background from any photo using an on-device AI model. The first run
        downloads the model (~80MB) which the browser then caches, so later uses are much faster.
      </p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop a photo here" />}

        {file && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-800">Original</p>
                <img src={previewUrl} alt="original" className="w-full rounded-xl border border-gray-200" />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-800">Result</p>
                <div className="flex min-h-[150px] items-center justify-center rounded-xl border border-gray-200 bg-[conic-gradient(#eee_25%,transparent_0_50%,#eee_0_75%,transparent_0)] bg-[length:16px_16px]">
                  {resultUrl ? (
                    <img src={resultUrl} alt="result" className="w-full rounded-xl" />
                  ) : (
                    <span className="p-6 text-sm text-gray-400">{busy ? progress || "Processing…" : "Run the tool to see the result"}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={run} disabled={busy}>
                {busy ? "Processing…" : "Remove Background"}
              </button>
              {resultUrl && (
                <button
                  className="btn-secondary"
                  onClick={() => downloadBlob(window.__pixforgeLastBlob, `no-bg-${file.name.replace(/\.\w+$/, "")}.png`)}
                >
                  Download PNG
                </button>
              )}
              <button className="btn-secondary" onClick={() => { setFile(null); setResultUrl(null); }}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
