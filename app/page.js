import ToolCard from "../components/ToolCard";

const tools = [
  { href: "/compress-image", icon: "🗜️", title: "Compress Image", description: "Shrink JPG, PNG and WEBP file size while keeping great quality." },
  { href: "/resize-image", icon: "📐", title: "Resize Image", description: "Resize by exact pixels or percentage, perfect for web and social media." },
  { href: "/crop-image", icon: "✂️", title: "Crop Image", description: "Crop any image to the exact area you need with a simple drag." },
  { href: "/convert-image", icon: "🔄", title: "Convert Image", description: "Convert between JPG, PNG and WEBP in seconds, right in your browser." },
  { href: "/rotate-image", icon: "🔁", title: "Rotate Image", description: "Rotate or flip images to any angle before you download." },
  { href: "/watermark-image", icon: "💧", title: "Watermark Image", description: "Stamp a text or logo watermark onto your photos to protect your work." },
  { href: "/remove-background", icon: "🪄", title: "Remove Background", description: "Instantly erase the background from any photo using on-device AI.", badge: "AI" },
  { href: "/upscale-image", icon: "✨", title: "Upscale Image", description: "Enlarge small images and sharpen details using an on-device AI model.", badge: "AI" },
  { href: "/meme-generator", icon: "😂", title: "Meme Generator", description: "Add top and bottom captions to any picture and share your meme." },
  { href: "/html-to-image", icon: "🖼️", title: "HTML to Image", description: "Turn any block of HTML or a live webpage section into a downloadable image." }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <section className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-block rounded-full bg-brand-100 px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
          100% Free · No Signup · Runs In Your Browser
        </span>
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
          Every tool you need to edit images, <span className="text-brand-600">for free, forever</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
          Compress, resize, crop, convert, watermark and even remove backgrounds with AI, all
          processed locally on your device. Nothing is ever uploaded to a server.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <ToolCard key={t.href} {...t} />
        ))}
      </section>

      <section className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Private by design</h2>
          <p className="mt-2 text-sm text-gray-600">
            Every tool runs entirely in your browser using JavaScript and WebAssembly. Your images never
            leave your device, so there is nothing to leak and nothing to wait for.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Fast on any device</h2>
          <p className="mt-2 text-sm text-gray-600">
            No queues, no account, no watermark on your output. Drop an image and get your result in
            seconds, whether you are on desktop or mobile.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Always free</h2>
          <p className="mt-2 text-sm text-gray-600">
            PixForge is, and will always be, free to use for everyone: students, designers and
            developers alike.
          </p>
        </div>
      </section>
    </div>
  );
}
