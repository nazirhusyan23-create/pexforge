"use client";

import { useState } from "react";
import Uploader from "../../components/Uploader";
import { downloadBlob, loadImage } from "../../lib/downloadFile";

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export default function MemeClient() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");

  const handleFile = async (f) => {
    const image = await loadImage(f);
    setFile(f);
    setImg(image);
  };

  const draw = (canvas) => {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const fontSize = Math.round(img.width / 12);
    ctx.font = `bold ${fontSize}px Impact, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = fontSize / 12;
    ctx.textBaseline = "top";

    const drawBlock = (text, fromTop) => {
      const lines = wrapText(ctx, text.toUpperCase(), img.width * 0.9);
      lines.forEach((line, i) => {
        const y = fromTop ? 10 + i * fontSize * 1.1 : img.height - 10 - (lines.length - i) * fontSize * 1.1;
        ctx.strokeText(line, img.width / 2, y);
        ctx.fillText(line, img.width / 2, y);
      });
    };

    drawBlock(topText, true);
    drawBlock(bottomText, false);
  };

  const download = () => {
    if (!img) return;
    const canvas = document.createElement("canvas");
    draw(canvas);
    canvas.toBlob((blob) => downloadBlob(blob, `meme-${file.name.replace(/\.\w+$/, "")}.png`), "image/png");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Meme Generator</h1>
      <p className="mt-2 text-gray-600">Add a classic top and bottom caption to any picture.</p>

      <div className="mt-8 card">
        {!file && <Uploader onFiles={handleFile} label="Click or drop an image here" />}

        {file && img && (
          <MemePreview img={img} topText={topText} bottomText={bottomText} draw={draw}>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Top text</label>
                <input value={topText} onChange={(e) => setTopText(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-800">Bottom text</label>
                <input value={bottomText} onChange={(e) => setBottomText(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary" onClick={download}>Download meme</button>
              <button className="btn-secondary" onClick={() => { setFile(null); setImg(null); }}>Start over</button>
            </div>
          </MemePreview>
        )}
      </div>

      <article className="prose prose-sm mt-12 max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-900">How to make a meme online</h2>
        <p>
          Upload any picture, type your top and bottom captions, and PixForge draws them onto the image
          using the classic bold white-with-black-outline meme font. Everything is rendered on an HTML
          canvas in your browser, so you can preview the result instantly and tweak the wording before
          you download the final PNG.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Tips for a better meme</h2>
        <p>
          Keep captions short — memes read fastest with five to eight words per line. Use a high-contrast
          photo so the white text stays legible, and try both a serious and a sarcastic caption before you
          settle on one; the best memes usually come from the second or third attempt, not the first.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        <p>
          <strong>Is it free?</strong> Yes, meme generation is completely free with no watermark added to
          your download. <strong>Does my image get uploaded anywhere?</strong> No — the caption is drawn
          locally in your browser, so the picture never leaves your device. <strong>Can I use it on
          mobile?</strong> Yes, the tool works on phone and tablet browsers as well as desktop.
        </p>
      </article>
    </div>
  );
}

function MemePreview({ img, topText, bottomText, draw, children }) {
  return (
    <div>
      <canvas
        ref={(node) => {
          if (node && img) {
            const maxW = 500;
            const scale = Math.min(1, maxW / img.width);
            node.style.width = `${img.width * scale}px`;
            draw(node);
          }
        }}
        className="mx-auto rounded-xl border border-gray-200"
      />
      {children}
    </div>
  );
}
