import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Optimize</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/compress-image" className="hover:text-brand-600">Compress Image</Link></li>
              <li><Link href="/resize-image" className="hover:text-brand-600">Resize Image</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Edit</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/crop-image" className="hover:text-brand-600">Crop Image</Link></li>
              <li><Link href="/rotate-image" className="hover:text-brand-600">Rotate Image</Link></li>
              <li><Link href="/watermark-image" className="hover:text-brand-600">Watermark Image</Link></li>
              <li><Link href="/meme-generator" className="hover:text-brand-600">Meme Generator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Convert & AI</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/convert-image" className="hover:text-brand-600">Convert Image</Link></li>
              <li><Link href="/html-to-image" className="hover:text-brand-600">HTML to Image</Link></li>
              <li><Link href="/remove-background" className="hover:text-brand-600">Remove Background</Link></li>
              <li><Link href="/upscale-image" className="hover:text-brand-600">Upscale Image</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">PixForge</h4>
            <p className="text-sm text-gray-600">
              Free, fast, browser-based image tools. Your files never leave your device, everything runs
              locally for full privacy.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row">
          <span>© {new Date().getFullYear()} PixForge. All processing happens in your browser.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-brand-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-600">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
