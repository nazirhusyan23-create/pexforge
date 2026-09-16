"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { href: "/compress-image", label: "Compress" },
  { href: "/resize-image", label: "Resize" },
  { href: "/crop-image", label: "Crop" },
  { href: "/convert-image", label: "Convert" },
  { href: "/rotate-image", label: "Rotate" },
  { href: "/watermark-image", label: "Watermark" },
  { href: "/remove-background", label: "Remove BG" },
  { href: "/upscale-image", label: "Upscale" },
  { href: "/blur-image", label: "Blur" },
  { href: "/grayscale-image", label: "Grayscale" },
  { href: "/add-border", label: "Add Border" },
  { href: "/color-picker", label: "Color Picker" },
  { href: "/meme-generator", label: "Meme" },
  { href: "/html-to-image", label: "HTML to Image" },
  { href: "/image-to-base64", label: "Image to Base64" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-gray-900">
          <span className="text-brand-600">Pix</span>Forge
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {tools.slice(0, 6).map((t) => (
            <Link key={t.href} href={t.href} className="text-sm font-medium text-gray-600 hover:text-brand-600">
              {t.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="text-sm font-medium text-gray-600 hover:text-brand-600">More ▾</button>
            <div className="invisible absolute right-0 top-full w-48 rounded-xl border border-gray-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              {tools.slice(6).map((t) => (
                <Link key={t.href} href={t.href} className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-600">
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
